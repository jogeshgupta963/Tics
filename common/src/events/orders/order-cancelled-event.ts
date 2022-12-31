import { Subject } from "../subjects";

export interface OrderCancelledEvent {
  subject: Subject.OrderCancelled;
  data: {
    orderId: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
