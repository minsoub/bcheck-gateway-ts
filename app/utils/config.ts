import { env } from "../env";

export const routingControllerOptions = {
  cors: true,
  routePrefix: env.app.apiPrefix,
  controllers: [`${__dirname}/../controller/*{.ts,.js}`],
  middlewares: [`${__dirname}/../middleware/*{.ts,.js}`],
};
