import {
  ExpirationCompleteEvent,
  Publisher,
  Subject,
} from "@jogeshgupta-microservices/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subject.ExpirationComplete;
}
