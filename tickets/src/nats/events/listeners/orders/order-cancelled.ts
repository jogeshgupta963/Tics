import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import {
  Listener,
  OrderCancelledEvent,
  Subject,
} from "@jogeshgupta-microservices/common";
import Ticket from "../../../../models/Ticket";
import { TicketUpdatedPublisher } from "../../publishers/ticket-updated";
import { ticketRouter } from "../../../../routes/tickets";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subject.OrderCancelled;
  queueGroupName = queueGroupName.OrderCancelled;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const {
      orderId,
      ticket: { id },
    } = data;
    // data
    //     orderId: string;
    //     version: number;
    //     ticket: {
    //         id: string;
    //     };
    // };

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ orderId: undefined });

    const ticketUpdated = new TicketUpdatedPublisher(this.client);

    ticketUpdated.publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });
  }
}
