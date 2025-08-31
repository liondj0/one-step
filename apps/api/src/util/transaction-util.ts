import {BaseController} from "../controller/base-controller";
import {RequestContext} from "@mikro-orm/core";
import {Context, Next} from "hono";
import {ServerEnv} from "../types/server";


export const Transactional = (): MethodDecorator => {
  return (<Controller extends BaseController>(target: {new (): Controller}, property: keyof Controller, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (context: Context<ServerEnv>, next: Next) {
      const entityManager = RequestContext.getEntityManager();
      if(!entityManager) throw new Error('No entity manager found');
      return entityManager.transactional(async (transactionEntityManager) => {
        return await RequestContext.create(transactionEntityManager, async () => {
          const result = await originalMethod.apply(this, [context, next]);
          await transactionEntityManager.flush();
          return result;
        })
      })
    }
    return descriptor;
  }) as MethodDecorator
}
