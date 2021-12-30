import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AuthDefaultResponse } from "../../utils/responses";
import { User } from "../../entity/User";
import {
  createResetPasswordToken,
  verifyPasswordToken,
} from "../../utils/token";

@Resolver()
export class SecurityResolver {
  @Query(() => String)
  work() {
    return "yes !";
  }

  @Mutation(() => AuthDefaultResponse)
  async resetPassword(
    @Arg("email") email: string
  ): Promise<AuthDefaultResponse> {
    if (!email) {
      return {
        status: false,
        message: "Invalid Data !",
      };
    }

    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return {
          status: false,
          message: "Invalid Email !",
        };
      }
      const _token = createResetPasswordToken(user);
      // you must not send token as response the token should be sent in email !
      // this is only for test reasons
      return {
        status: true,
        message: "Token created successfuly",
        token: _token,
      };
    } catch (e) {
      console.log("Something went wrong ! => ", e);
      return {
        status: false,
        message: "Something went wrong !",
      };
    }
  }
}
