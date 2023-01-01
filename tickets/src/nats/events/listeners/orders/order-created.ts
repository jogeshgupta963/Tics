import {
  Listener,
  OrderCreatedEvent,
  Subject,
} from "@jogeshgupta-microservices/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import Ticket from "../../../../models/Ticket";
import { TicketUpdatedPublisher } from "../../publishers/ticket-updated";
import { natsWrapper } from "../../../connection/natsWrapper";

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

    const ticketUpdated = new TicketUpdatedPublisher(natsWrapper.client);
    ticketUpdated.publish({
      id,
      title: ticket.title,
      price: ticket.price,
      userId,
      version: ticket.version,
      orderId,
    });
    msg.ack();
  }
}
