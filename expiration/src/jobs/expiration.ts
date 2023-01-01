import { Job } from "bull";
import { ExpirationCompletePublisher } from "../nats/events/publishers/expiration-complete";
import { natsWrapper } from "../nats/connection/natsWrapper";

async function expireOrder(job: Job) {
  const expired = new ExpirationCompletePublisher(natsWrapper.client);
  expired.publish({
    orderId: job.data.orderId,
  });
}

export { expireOrder };
