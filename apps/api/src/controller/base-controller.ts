import { Hono } from "hono";

export abstract class BaseController {
  private router!: Hono;

  protected constructor(private basePath: string) {
    this.createRouterIfNotExists();
  }

  createRouterIfNotExists() {
    if (!this.router) this.router = new Hono();
  }

  get routerInstance() {
    return this.router;
  }

  get path() {
    return this.basePath;
  }
}
