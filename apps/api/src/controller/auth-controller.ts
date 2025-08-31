import {GET, POST} from "../util/router-util";
import {BaseController} from "./base-controller";
import {type Context} from "hono";
import {login, signup} from "../service/auth/auth-service";
import {type EndpointContext} from "../types/server";
import {Transactional} from "../util/transaction-util";
import {refreshAccessToken} from "../service/auth/token-service";

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

  @POST('/login')
  async login(context: Context) {
    const {email, password} = await context.req.json()
    return await login(email, password);
  }

  @POST('/refresh-token')
  async refreshToken(context: Context) {
    const {refreshToken} = await context.req.json();
    return await refreshAccessToken(refreshToken);
  }

}
