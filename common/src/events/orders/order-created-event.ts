import { OrderStatus } from "../../utils/types/order-status";
import { Publisher } from "../publishers/base-publisher";
import { Subject } from "../subjects";

export interface OrderCreatedEvent {
  subject: Subject.OrderCreated;
  data: {
    orderId: string;
    userId: string;
    orderStatus: OrderStatus;
    ticket: {
      id: string;
      price: number;
    };
  };
}
