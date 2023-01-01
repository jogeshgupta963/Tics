import mongoose, { ObjectId } from "mongoose";
import { OrderStatus } from "@jogeshgupta-microservices/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { TicketDoc } from "./Ticket";
interface OrderDoc extends mongoose.Document {
  status: string;
  expiresAt: Date;
  userId: string;
  ticket: TicketDoc;
  version: number;
}
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: OrderStatus,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tickets",
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

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

const Order = mongoose.model<OrderDoc>("Orders", OrderSchema);
export { Order, OrderStatus };
