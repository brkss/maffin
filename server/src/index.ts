import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";
import { createConnection } from "typeorm";

(async () => {
  await createConnection();
  const app = express();

  app.get("/", (_, res) => {
    res.send("hello from express !");
  });

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
