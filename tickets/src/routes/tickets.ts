import { authenticated, validateRequest } from '@jogeshgupta-microservices/common'
import express from 'express'
import { createTicket, getTicketById, getTickets,updateTicket } from '../controllers/tickets'
import { ticketValidation } from '../utils/validation/ticket'
const router = express.Router()

router
.get('/',getTickets)
.post('/',authenticated,ticketValidation,validateRequest,createTicket)

router
.route('/:id')
.get(getTicketById)
.put(authenticated,ticketValidation,validateRequest,updateTicket)

export { router as ticketRouter}