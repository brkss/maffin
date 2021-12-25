import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { refreshToken } from "./utils/token";

(async () => {
  await createConnection();
  const app = express();

  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("hello from express !");
  });

  app.post("/refresh_token", async (req, res) => await refreshToken(res, req));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT!, () => {
    console.log(`🚀 server runing http://localhost:${process.env.PORT}`);
  });
})();
