import {BaseController} from "../controller/base-controller";
import {Context, Hono} from "hono";
import {ServerEnv} from "../types/server";

export type RouteMetadata = [
  path: string,
  handler: (context: Context<ServerEnv, RouteMetadata[0]>) => Promise<any>
]

export type RouterMetadata = {
  get: RouteMetadata[];
  post: RouteMetadata[];
  patch: RouteMetadata[];
  delete: RouteMetadata[];
}

const routeCallback = (handler: RouteMetadata[1]) => {
  return async (context: Context<ServerEnv, RouteMetadata[0]>) => {
    return context.json(await handler(context));
  }
}
const router = (): RouterMetadata => ({get: [], post: [], patch: [], delete: []});

const initMetadata = <Controller extends BaseController>(target: Controller) => {
  if (!Reflect.hasMetadata("router", target)) {
    Reflect.defineMetadata("router", router(), target);
  }
}

export const GET = (path: string): MethodDecorator => {
  return (<Controller extends BaseController>(target: Controller, key: keyof Controller) => {
    initMetadata(target);
    const router = Reflect.getMetadata("router", target) as RouterMetadata;
    router.get.push([path, routeCallback(target[key] as RouteMetadata[1])]);
    Reflect.defineMetadata("router", router, target.constructor);
  }) as MethodDecorator
}

export const POST = (path: string): MethodDecorator => {
  return (<Controller extends BaseController>(target: Controller, key: keyof Controller) => {
    initMetadata(target);
    const router = Reflect.getMetadata("router", target) as RouterMetadata;
    router.post.push([path, routeCallback(target[key] as RouteMetadata[1])]);
    Reflect.defineMetadata("router", router, target.constructor);
  }) as MethodDecorator
}

export const PATCH = (path: string): MethodDecorator => {
  return (<Controller extends BaseController>(target: Controller, key: keyof Controller) => {
    initMetadata(target);
    const router = Reflect.getMetadata("router", target) as RouterMetadata;
    router.patch.push([path, routeCallback(target[key] as RouteMetadata[1])]);
    Reflect.defineMetadata("router", router, target.constructor);
  }) as MethodDecorator
}

export const DELETE = (path: string): MethodDecorator => {
  return (<Controller extends BaseController>(target: Controller, key: keyof Controller) => {
    initMetadata(target);
    const router = Reflect.getMetadata("router", target) as RouterMetadata;
    router.delete.push([path, routeCallback(target[key] as RouteMetadata[1])]);
    Reflect.defineMetadata("router", router, target.constructor);
  }) as MethodDecorator
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
