import { natsWrapper } from "./nats/connection/natsWrapper";
import { OrderCreatedListener } from "./nats/events/listeners/orders/order-created";

(async function () {
  if (!process.env.NATS_URL) {
    throw new Error("Nats URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("nats cluster id must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("nats client id must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("Nats connection closed!!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    const orderCreated = new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }
})();
