import { Request, Response } from "express";

export const refreshToken = async (res: Response, req: Request) => {
  console.log("cookies >>", req.cookies);

  return res.send("nope");
};
