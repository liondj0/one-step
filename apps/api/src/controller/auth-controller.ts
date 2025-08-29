import {GET, POST} from "../util/router-util";
import {BaseController} from "./base-controller";
import {type Context} from "hono";
import {signup} from "../service/auth/signup-service";
import {type EndpointContext} from "../types/server";

export class AuthController extends BaseController {

  constructor() {
    super('/auth');
  }

  @GET('/')
  async auth(context: EndpointContext) {
    context.req.param()
    return {success: true}
  }

  @POST('/signup')
  async signup(context: Context) {
    return await signup(await context.req.parseBody())
  }

}
