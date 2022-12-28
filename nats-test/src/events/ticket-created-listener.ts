import { TicketCreatedEvent } from "./ticket-created-event";
import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subject } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(parsedData: TicketCreatedEvent["data"], msg: Message) {
    console.log(parsedData);
    msg.ack();
  }
}
