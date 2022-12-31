import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import {
  BadRequestError,
  NotAuthorisedError,
  Page404,
} from "@jogeshgupta-microservices/common";
import { Order, OrderStatus } from "../models/Order";
import { OrderCreatedPublisher } from "../nats/events/publishers/order-created";
import { natsWrapper } from "../nats/connection/natsWrapper";
import { OrderCancelledPublisher } from "../nats/events/publishers/order-cancelled";

async function getAllOrders(req: Request, res: Response) {
  const orders = await Order.find({ userId: req.user!.id }).populate("ticket");

  return res.status(200).json(orders);
}
async function createOrder(req: Request, res: Response) {
  const { ticketId } = req.body;

  //find the ticket user is ordering

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new Page404();
  }

  // make sure that ticket is not already reserved

  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.Pending,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  if (existingOrder) {
    throw new BadRequestError("Ticket is already reserved");
  }

  //calculate an expiration date for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + 60 * 5);

  //build order

  const order = new Order({
    userId: req.user!.id,
    status: OrderStatus.Pending,
    expiresAt: expiration,
    ticket,
  });
  await order.save();
  //publish event

  const orderCreatedEvent = new OrderCreatedPublisher(natsWrapper.client);

  orderCreatedEvent.publish({
    orderId: order.id,
    userId: order.userId,
    orderStatus: order?.status,
    expiresAt: order.expiresAt!.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  });

  return res.status(200).json(order);
}

async function getOrderById(req: Request, res: Response) {
  const { id } = req.params;
  const order = await Order.findOne({
    _id: id,
    userId: req.user!.id,
  }).populate("ticket");

  if (!order) {
    throw new Page404();
  }

  if (order.userId !== req.user!.id) {
    throw new NotAuthorisedError();
  }
  return res.status(200).json(order);
}

async function cancelOrder(req: Request, res: Response) {
  const { id } = req.params;

  const order = await Order.findOne({
    _id: id,
    userId: req.user!.id,
  }).populate("ticket");

  if (!order) {
    throw new BadRequestError("Order not found");
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  const orderCancelEvent = new OrderCancelledPublisher(natsWrapper.client);

  orderCancelEvent.publish({
    orderId: order.id,
    ticket: {
      id: order.ticket!.id.toString(),
    },
  });

  return res.status(200).json(order);
}

export { getAllOrders, createOrder, getOrderById, cancelOrder };
