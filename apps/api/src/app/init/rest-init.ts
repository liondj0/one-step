import {Init} from "./init";
import {Hono} from "hono";


export class RestInit extends Init {

  constructor(private readonly __app: Hono) {
    super('Rest');
  }


  protected async __destroyImplementation(): Promise<void> {
    // Nothing to do
  }

  protected async __initImplementation(): Promise<void> {
    this.__addRoutes();
  }

  private __addRoutes() {
    this.__app.get('/', (c) => c.text('Hello from One Step API 🚀'))
    this.__app.get('/groups', (c) => c.json([{ id: 1, name: 'Demo Group' }]))
  }



}
