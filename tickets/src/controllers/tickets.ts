import { NotAuthorisedError, Page404 } from "@jogeshgupta-microservices/common";
import { Request, Response, Router } from "express";
import Ticket from "../models/Ticket";

async function createTicket(req:Request,res:Response){
    const {title,price} = req.body

    const ticket = Ticket.buildTicket({
        title,
        price,
        userId:req.user!.id 
    })
    await ticket.save()

    res.status(201).json(ticket)
}

async function getTicketById(req:Request,res:Response){
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        throw new Page404();
    }
    res.json(ticket)
}

async function getTickets(req:Request,res:Response){
    const tickets = await Ticket.find({})

    res.json(tickets||[])
}
async function updateTicket(req:Request,res:Response){
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        throw new Page404()
    }
    if(ticket.userId !== req.user!.id){
        throw new NotAuthorisedError();
    }
    ticket.set({
        title:req.body.title,
        price:req.body.price
    })
    await ticket.save()
    res.json(ticket)
}
export {createTicket,getTicketById,getTickets,updateTicket}