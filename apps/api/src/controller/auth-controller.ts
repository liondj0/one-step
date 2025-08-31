import {GET, POST} from "../util/router-util";
import {BaseController} from "./base-controller";
import {type Context} from "hono";
import {signup} from "../service/auth/auth-service";
import {type EndpointContext} from "../types/server";
import {Transactional} from "../util/transaction-util";

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
  @Transactional()
  async signup(context: Context) {
    return await signup(await context.req.json())
  }

}
