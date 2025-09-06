import {BaseController} from "../controller/base-controller";
import {Context, Hono, MiddlewareHandler, Next} from "hono";
import {ServerEnv} from "../types/server";

export type RouteHandler = (context: Context, next: Next) => Promise<any>;

export type RouteMetadata = [
  path: string,
  ...handlers: RouteHandler[],
]

export type RouterMetadata = {
  get: RouteMetadata[];
  post: RouteMetadata[];
  patch: RouteMetadata[];
  delete: RouteMetadata[];
}

const routeCallback = (handler: RouteMetadata[1]) => {
  return async (context: Context, next: Next) => {
    return context.json(await handler(context, next));
  }
}
const router = (): RouterMetadata => ({get: [], post: [], patch: [], delete: []});

const initMetadata = <Controller extends BaseController>(target: Controller) => {
  if (!Reflect.hasMetadata("router", target)) {
    Reflect.defineMetadata("router", router(), target);
  }
}

const decoratorBuilder = (path: string, method: keyof RouterMetadata): MethodDecorator => {
  return (<Controller extends BaseController>(target: Controller, key: keyof Controller, descriptor: TypedPropertyDescriptor<any>) => {
    const handler = descriptor.value as RouteMetadata[1];
    initMetadata(target);
    const router = Reflect.getMetadata("router", target) as RouterMetadata;
    const middleware = Reflect.getMetadata("middleware", target.constructor, key as string) as RouteHandler[] || [];
    router[method].push([path, ...middleware, routeCallback(handler)]);
    Reflect.defineMetadata("router", router, target.constructor);
  }) as MethodDecorator
}

export const GET = (path: string) => decoratorBuilder(path, "get");

export const POST = (path: string) => decoratorBuilder(path, "post")

export const PATCH = (path: string) => decoratorBuilder(path, "patch")

export const DELETE = (path: string) => decoratorBuilder(path, "delete");

export const USE = (...middlewares: RouteHandler[])=> {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata("middleware", middlewares, target.constructor, propertyKey);
  }
}

export const registerRouter = <Controller extends BaseController>(target: { new(): Controller }): [string, Hono] => {
  const routerMetadata = Reflect.getMetadata("router", target) as RouterMetadata;
  const controller = new target();
  const router = controller.routerInstance;
  routerMetadata.get.map((route) => router.get(...route));
  routerMetadata.post.map((route) => router.post(...route));
  routerMetadata.patch.map((route) => router.patch(...route));
  routerMetadata.delete.map((route) => router.delete(...route));
  return [controller.path, router];
}
