import {Init} from "./init";
import {AuthController} from "../../controller/auth-controller";
import {Server} from "../../types/server";
import {registerRouter} from "../../util/middleware/router-util";

export class RestInit extends Init {

  constructor(private readonly __app: Server) {
    super('Rest');
  }


  protected async __destroyImplementation(): Promise<void> {
    // Nothing here
  }

  protected async __initImplementation(): Promise<void> {
    this.__addRoutes();
  }

  private __addRoutes() {
    this.__app.get('/', (c) => c.text('Hello from One Step API 🚀'))
    this.registerRouters();
  }


  private registerRouters() {
    [AuthController].forEach(controller => {
      this.__app.route(...registerRouter(controller))
    });
  }



}
