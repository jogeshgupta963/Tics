import mongoose from "mongoose";
import { OrderStatus } from "@jogeshgupta-microservices/common";
// export enum OrderStatus {
//   Pending = "pending",
//   Cancelled = "cancelled",
//   Complete = "complete",
//   AwaitingPayment = "awaiting:payment",
// }

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

const Order = mongoose.model("Orders", OrderSchema);
export { Order, OrderStatus };
