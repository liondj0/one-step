import { AsyncLocalStorage } from 'node:async_hooks';
import {Context, Next} from "hono";
import {ServerEnv} from "../types/server";
import {UserEntity} from "../entity/user-entity";
import {UnauthorizedError} from "./error";

export type SessionContext = {
  user: UserEntity;
}

const asyncLocalStorage = new AsyncLocalStorage<Partial<SessionContext>>();

export const startSessionContext = (partial: Partial<SessionContext>) => {
  return (_: Context<ServerEnv>, next: Next) => asyncLocalStorage.run({...partial}, async () => await next());
}

export const getSessionContext = () => {
  return asyncLocalStorage.getStore();
}

export const getUserInSession = () => {
  const user = getSessionContext()?.user;
  if(!user) throw new UnauthorizedError('No user in session');
  return user;
}
