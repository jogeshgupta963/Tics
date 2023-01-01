import {
  ExpirationCompleteEvent,
  Listener,
  Subject,
} from "@jogeshgupta-microservices/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Order, OrderStatus } from "../../../../models/Order";
import { OrderCancelledPublisher } from "../../publishers/order-cancelled";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subject.ExpirationComplete;
  queueGroupName = queueGroupName.expirationComplete;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();

    const orderCancelPublisher = new OrderCancelledPublisher(this.client);
    await orderCancelPublisher.publish({
      orderId: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
