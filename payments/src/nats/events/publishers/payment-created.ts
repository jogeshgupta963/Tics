import {
  PaymentCreatedEvent,
  Publisher,
  Subject,
} from "@jogeshgupta-microservices/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subject.PaymentCreated;
}
