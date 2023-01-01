import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
}

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
TicketSchema.set("versionKey", "version");
TicketSchema.plugin(updateIfCurrentPlugin);
// TicketSchema.pre("save", function () {
//   // @ts-ignore
//   this.$where = {
//     version: this.get("version") - 1,
//   };
// });

const Ticket = mongoose.model<TicketDoc>("Tickets", TicketSchema);

export default Ticket;
