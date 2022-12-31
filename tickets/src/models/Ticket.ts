import mongoose, { mongo } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ticketAttr {
  title: string;
  price: number;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  buildTicket(attr: ticketAttr): TicketDoc;
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
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

TicketSchema.set("versionKey", "version");
TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.statics.buildTicket = (attr: ticketAttr) => {
  return new Ticket(attr);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", TicketSchema);

export default Ticket;
