import { queueGroupName } from "./queue-group-name";
import { Subject, TicketUpdatedEvent } from "@jogeshgupta-microservices/common";
import { Listener } from "@jogeshgupta-microservices/common";
import { Message } from "node-nats-streaming";
import Ticket from "../../../models/Ticket";
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subject.TicketUpdated;
  queueGroupName = queueGroupName.ticketUpdated;

  async onMessage(eventData: TicketUpdatedEvent["data"], msg: Message) {
    const { title, price } = eventData;

    const ticket = await Ticket.findById(eventData.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
