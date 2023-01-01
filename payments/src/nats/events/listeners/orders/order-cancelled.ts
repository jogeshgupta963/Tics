import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subject,
} from "@jogeshgupta-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Order } from "../../../../models/Order";
export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subject.OrderCancelled;
  queueGroupName = queueGroupName.orderCancelled;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { orderId, version } = data;

    const order = await Order.findOne({ _id: orderId, version: version - 1 });

    if (!order) {
      throw new Error("Order Not Found");
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    msg.ack();
  }
}
