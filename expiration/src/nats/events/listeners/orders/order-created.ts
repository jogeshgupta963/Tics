import {
  Listener,
  OrderCreatedEvent,
  Subject,
} from "@jogeshgupta-microservices/common";
import { queueGroupName } from "../queueGroupName";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subject.OrderCreated;
  queueGroupName = queueGroupName.OrderCreated;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { orderId, expiresAt } = data;
    const delay = new Date(expiresAt).getTime() - new Date().getTime();

    console.log(`waiting ${delay} millisecs `);
    await expirationQueue.add(
      { orderId: orderId },
      {
        delay,
      }
    );

    msg.ack();
  }
}
