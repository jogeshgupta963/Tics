import { Subject } from "../subjects";

export interface OrderCreatedEvent {
  subject: Subject.OrderCreated;
  data: {
    orderId: string;
    userId: string;
    orderStatus: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
