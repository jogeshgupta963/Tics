import { Subject } from "../subjects";

export interface OrderCancelledEvent {
  subject: Subject.OrderCancelled;
  data: {
    orderId: string;
    ticket: {
      id: string;
    };
  };
}
