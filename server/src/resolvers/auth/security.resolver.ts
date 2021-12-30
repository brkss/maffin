import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AuthDefaultResponse } from "../../utils/responses";
import { User } from "../../entity/User";
import {
  createResetPasswordToken,
  verifyPasswordToken,
} from "../../utils/token";
import { ResetPasswordInput } from "../../utils/inputs/auth/resetpassword.input";

@Resolver()
export class SecurityResolver {
  @Query(() => String)
  work() {
    return "yes !";
  }

  @Mutation(() => AuthDefaultResponse)
  async requestResetPassword(
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

  @Mutation(() => AuthDefaultResponse)
  async resetPassword(
    @Arg("data") data: ResetPasswordInput
  ): Promise<AuthDefaultResponse> {
    if (!data.oldPassword || !data.newPassword || !data.token) {
      return {
        status: false,
        message: "Invalid Data !",
      };
    }

    try {
    } catch (e) {
      console.log(
        "Something went wrong trying to reset this user password !",
        e
      );
      return {
        status: false,
        message: "Something went wrong !",
      };
    }
  }
}
