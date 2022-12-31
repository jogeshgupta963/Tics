import {
  OrderCancelledEvent,
  Publisher,
  Subject,
} from "@jogeshgupta-microservices/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subject.OrderCancelled;
}
