import {
  Publisher,
  Subject,
  TicketUpdatedEvent,
} from "@jogeshgupta-microservices/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subject.TicketUpdated;
}
