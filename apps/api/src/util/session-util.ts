import { AsyncLocalStorage } from 'node:async_hooks';
import {Context, Next} from "hono";
import {ServerEnv} from "../types/server";
import {User} from "../../../../packages/common/types/models/user";

export type SessionContext = {
  user: User;
}

const asyncLocalStorage = new AsyncLocalStorage<Partial<SessionContext>>();

export const startSessionContext = (partial: Partial<SessionContext>) => {
  return (_: Context<ServerEnv>, next: Next) => asyncLocalStorage.run({...partial}, async () => await next());
}

export const getSessionContext = () => {
  return asyncLocalStorage.getStore();
}

