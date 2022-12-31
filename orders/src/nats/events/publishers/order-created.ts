import {
  Publisher,
  Subject,
  OrderCreatedEvent,
} from "@jogeshgupta-microservices/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subject.OrderCreated;
}
