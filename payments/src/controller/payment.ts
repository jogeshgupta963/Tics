import { stripe } from "./../stripe/stripe";
import { Request, Response } from "express";
import { Order } from "../models/Order";
import {
  BadRequestError,
  OrderStatus,
} from "@jogeshgupta-microservices/common";
import { Payment } from "../models/Payment";

async function payments(req: Request, res: Response) {
  const { token, orderId } = req.body;

  //find order

  const order = await Order.findOne({
    _id: orderId,
    userId: req.user!.id,
  });

  if (!order) {
    throw new BadRequestError("Order not found");
  }
  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError("Your Order has been cancelled");
  }

  //stripe

  const charge = await stripe.charges.create({
    currency: "usd",
    amount: order.price * 100,
    source: token,
  });
  const payment = new Payment({
    orderId,
    stripeId: charge.id,
  });
  await payment.save();
  res.send({ sucess: true });
}

export { payments };
