import {
  Publisher,
  Subject,
  TicketCreatedEvent,
} from "@jogeshgupta-microservices/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
}
