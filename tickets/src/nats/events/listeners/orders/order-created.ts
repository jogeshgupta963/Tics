import {
  Listener,
  OrderCreatedEvent,
  Subject,
} from "@jogeshgupta-microservices/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import Ticket from "../../../../models/Ticket";
import { TicketUpdatedPublisher } from "../../publishers/ticket-updated";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subject.OrderCreated;
  queueGroupName = queueGroupName.OrderCreated;

  async onMessage(eventData: OrderCreatedEvent["data"], msg: Message) {
    const {
      orderId,
      userId,
      ticket: { id },
    } = eventData;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: orderId });
    await ticket.save();

    const ticketUpdated = new TicketUpdatedPublisher(this.client);
    await ticketUpdated.publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });
    msg.ack();
  }
}
