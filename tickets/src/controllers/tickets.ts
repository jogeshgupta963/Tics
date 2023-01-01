import { NotAuthorisedError, Page404 } from "@jogeshgupta-microservices/common";
import { Request, Response, Router } from "express";
import Ticket from "../models/Ticket";
import { TicketCreatedPublisher } from "../nats/events/publishers/ticket-created";
import { natsWrapper } from "../nats/connection/natsWrapper";
import { TicketUpdatedPublisher } from "../nats/events/publishers/ticket-updated";

async function createTicket(req: Request, res: Response) {
  const { title, price } = req.body;

  const ticket = Ticket.buildTicket({
    title,
    price,
    userId: req.user!.id,
  });
  await ticket.save();

  const ticketCreated = new TicketCreatedPublisher(natsWrapper.client);
  await ticketCreated.publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version,
  });

  res.status(201).json(ticket);
}

async function getTicketById(req: Request, res: Response) {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new Page404();
  }
  res.json(ticket);
}

async function getTickets(req: Request, res: Response) {
  const tickets = await Ticket.find({});

  res.json(tickets || []);
}
async function updateTicket(req: Request, res: Response) {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new Page404();
  }
  if (ticket.userId !== req.user!.id) {
    throw new NotAuthorisedError();
  }
  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });
  await ticket.save();

  const ticketUpdated = new TicketUpdatedPublisher(natsWrapper.client);
  ticketUpdated.publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version,
  });

  res.json(ticket);
}
export { createTicket, getTicketById, getTickets, updateTicket };
