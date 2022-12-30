import { Request, Response } from "express";

async function getAllOrders(req: Request, res: Response) {
  res.json("hello");
}

async function createOrder(req: Request, res: Response) {}

export { getAllOrders, createOrder };
