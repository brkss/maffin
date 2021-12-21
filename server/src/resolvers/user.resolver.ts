import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AuthDefaultResponse } from "../utils/responses";
import { RegisterInput } from "../utils/inputs";
import { User } from "../entity/User";
import { hash } from "bcrypt";
import { generateAccessToken } from "../utils/token";

@Resolver()
export class UserResolver {
  @Query(() => String)
  ping() {
    return "pong";
  }

  @Mutation(() => AuthDefaultResponse)
  async register(
    @Arg("data") data: RegisterInput
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
}
