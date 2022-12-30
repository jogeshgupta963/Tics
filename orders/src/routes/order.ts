import { createOrderArgs } from "./../utils/validators/createOrder";
import express from "express";
import { getAllOrders, createOrder } from "../controllers/order";
import { authenticated } from "@jogeshgupta-microservices/common";
const router = express.Router();

router.route("/").get(authenticated, createOrderArgs, createOrder);

export { router as OrderRouter };
