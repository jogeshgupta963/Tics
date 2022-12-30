import { createOrderArgs } from "./../utils/validators/createOrder";
import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  cancelOrder,
} from "../controllers/order";
import {
  authenticated,
  validateRequest,
} from "@jogeshgupta-microservices/common";
const router = express.Router();

router
  .route("/")
  .post(authenticated, createOrderArgs, validateRequest, createOrder)
  .get(authenticated, getAllOrders);

router
  .route("/:id")
  .get(authenticated, getOrderById)
  .patch(authenticated, cancelOrder);

export { router as OrderRouter };
