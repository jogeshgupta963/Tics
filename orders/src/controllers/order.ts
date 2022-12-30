import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import {
  BadRequestError,
  NotAuthorisedError,
  OrderStatus,
  Page404,
} from "@jogeshgupta-microservices/common";
import Order from "../models/Order";

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
      // $in: [
      //   OrderStatus.Pending,
      //   OrderStatus.AwaitingPayment,
      //   OrderStatus.Complete,
      // ],
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
  });

  if (!order) {
    throw new BadRequestError("Order not found");
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  return res.status(200).json(order);
}

export { getAllOrders, createOrder, getOrderById, cancelOrder };
