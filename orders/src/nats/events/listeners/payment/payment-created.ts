import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subject,
} from "@jogeshgupta-microservices/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../../../models/Order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subject.PaymentCreated;
  queueGroupName = queueGroupName.paymentCreated;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    order.status = OrderStatus.Complete;
    await order.save();

    msg.ack();
  }
}
