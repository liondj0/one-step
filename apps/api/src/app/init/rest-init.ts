import {Init} from "./init";
import {AuthController} from "../../controller/auth-controller";
import {Server} from "../../types/server";
import {registerRouter} from "../../util/middleware/router-util";
import {AppError} from "../../util/error";
import {GroupController} from "../../controller/group-controller";
import {BaseController} from "../../controller/base-controller";

export class RestInit extends Init {

  constructor(private readonly __app: Server) {
    super('Rest');
  }


  protected async __destroyImplementation(): Promise<void> {
    // Nothing here
  }

  protected async __initImplementation(): Promise<void> {
    this.initErrorHandling();
    this.initLogging();
    this.__addRoutes();
  }

  initLogging() {
    this.__app.use(async (context, next) => {
      console.log(context.req.method, context.req.path)
      return await next();
    })
  }

  initErrorHandling() {
    this.__app.use(async (context, next) => {
      try {
        return await next();
      } catch (e) {
        console.error(e)
        if(e instanceof AppError) {
          context.status(e.statusCode)
        } else {
          context.status(500)
        }
        return context.json({message: (e as any).message ?? `Ugh, something went wrong. 👀`});
      }
    })
  }

  private __addRoutes() {
    this.__app.get('/', (c) => c.text('Hello from One Step API 🚀'))
    this.registerRouters();
  }


  private registerRouters() {
    [AuthController, GroupController].forEach(controller => {
      this.__app.route(...registerRouter(controller as { new(): BaseController }))
    });
  }



}
