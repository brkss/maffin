import { sign } from "jsonwebtoken";
import { User } from "../../entity/User";

export const generateAccessToken = (user: User) => {
  if (!user) {
    return "";
  }

  const payload = {
    userID: user.id,
  };
  const _token = sign(payload, process.env.ACCESS_SECRET!, {
    expiresIn: "15m",
  });

  return _token;
};
