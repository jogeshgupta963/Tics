import { Job } from "bull";

async function expireOrder(job: Job) {
  console.log(
    "I want to publish an expiration:complete event for order id : ",
    job.data.orderId
  );
}

export { expireOrder };
