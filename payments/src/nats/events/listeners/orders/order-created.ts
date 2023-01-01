import {
  Listener,
  OrderCreatedEvent,
  Subject,
} from "@jogeshgupta-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Order } from "../../../../models/Order";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subject.OrderCreated;
  queueGroupName = queueGroupName.orderCreated;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const {
      orderId,
      userId,
      orderStatus,
      version,
      ticket: { price },
    } = data;

    const order = new Order({
      _id: orderId,
      price,
      userId,
      version,
      status: orderStatus,
    });
    await order.save();
    msg.ack();
  }
}
