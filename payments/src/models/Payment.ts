import mongoose from "mongoose";

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
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

export const Payment = mongoose.model<PaymentDoc>("Payment", PaymentSchema);
