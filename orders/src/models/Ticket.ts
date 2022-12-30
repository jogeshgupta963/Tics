import mongoose from "mongoose";
import Order from "./Order";
import { OrderStatus } from "@jogeshgupta-microservices/common";

// interface TicketDoc extends mongoose.Document {
//   title: string;
//   price: string;
//   isReserved(): Promise<Boolean>;
// }

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
// TicketSchema.methods.isReserved = async function (): Promise<Boolean> {
//   const orderExists = await Order.findOne({
//     ticket: this,
//     status: {
//       $in: [
//         OrderStatus.Pending,
//         OrderStatus.AwaitingPayment,
//         OrderStatus.Complete,
//       ],
//     },
//   });
//   return !!orderExists;
// };

const Ticket = mongoose.model("Tickets", TicketSchema);

export default Ticket;
