import Queue from "bull";
import { expireOrder } from "../jobs/expiration";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(expireOrder);

export { expirationQueue };
