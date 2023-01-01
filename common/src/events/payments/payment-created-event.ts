import { Subject } from "../subjects";

export interface PaymentCreatedEvent {
  subject: Subject.PaymentCreated;
  data: {
    paymentId: string;
    orderId: string;
    stripeId: string;
  };
}
