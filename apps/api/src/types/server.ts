import { type Context, Hono } from "hono";
import { EntityManager } from "@mikro-orm/core";

export type ServerEnv = {
  Variables: {
    entityManager: EntityManager;
    requestId: string;
  };
};

export type EndpointContext<Endpoint extends string = any> = Context<
  ServerEnv,
  Endpoint
>;

export type Server = Hono<ServerEnv>;
