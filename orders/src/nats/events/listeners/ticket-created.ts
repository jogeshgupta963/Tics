import {
  Listener,
  Subject,
  TicketCreatedEvent,
} from "@jogeshgupta-microservices/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import Ticket from "../../../models/Ticket";
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
  queueGroupName = queueGroupName.ticketCreated;

  async onMessage(eventData: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = eventData;
    console.log("Event Recieved");
    const ticket = new Ticket({
      _id: id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
