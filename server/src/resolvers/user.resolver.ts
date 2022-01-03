import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { AuthDefaultResponse } from "../utils/responses";
import { RegisterInput, LoginInput } from "../utils/inputs";
import { User } from "../entity/User";
import { hash, compare } from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "../utils/token";
import { IContext } from "../utils/types/Context";
import { isUserAuth } from "../utils/middlewares";

@Resolver()
export class UserResolver {
  @UseMiddleware(isUserAuth)
  @Query(() => String)
  ping() {
    return "pong";
  }

  @Mutation(() => AuthDefaultResponse)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() { res }: IContext
  ): Promise<AuthDefaultResponse> {
    if (!data.email || !data.password)
      return {
        status: false,
        message: "Invalid Data !",
      };

    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return {
        status: false,
        message: "User not found !",
      };
    }
    const valid = await compare(data.password, user.password);
    if (!valid) {
      return {
        status: false,
        message: "Wrong password !",
      };
    }

    // send refresh token as cookie
    sendRefreshToken(res, generateRefreshToken(user));
    return {
      status: true,
      message: "Login successfuly",
      token: generateAccessToken(user),
    };
  }

  @Mutation(() => AuthDefaultResponse)
  async register(
    @Arg("data") data: RegisterInput,
    @Ctx() { res }: IContext
  ): Promise<AuthDefaultResponse> {
    if (!data.name || !data.email || !data.password) {
      return {
        status: false,
        message: "Invalid Data !",
      };
    }

    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      user.password = await hash(data.password, 5);
      await user.save();
      // send refresh token as cookie
      sendRefreshToken(res, generateRefreshToken(user));
      return {
        status: true,
        message: "User created successfuly !",
        token: generateAccessToken(user),
      };
    } catch (e) {
      console.log("something went wrong ! ", e);
      if (e.code == "ER_DUP_ENTRY") {
        return {
          status: false,
          message: "This email already exist !",
        };
      }
      return {
        status: false,
        message: "Sonrthing went wrong !",
      };
    }
  }

  @UseMiddleware(isUserAuth)
  @Mutation(() => AuthDefaultResponse)
  async logout(@Ctx() ctx: IContext) {
    ctx.res.clearCookie("uid");
    return {
      status: true,
    };
  }
}
