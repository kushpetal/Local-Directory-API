import express from "express";
import { ApolloServer} from "apollo-server-express";
import http from "http";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const app = express();
const port = 8080;
const host = '0.0.0.0';

import resolvers from "./tree-path.js";
import typeDefs from "./blueprint.js";

const myPlugin = { //graphql request lifecycle logic
  async requestDidStart(requestContext) {
    console.log('Request started!');

    return {
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      async validationDidStart(requestContext) {
        console.log('Validation started!');
      }
    }
  },
};

const server = new ApolloServer({ //initialize graphql playground server with schema and directory tree information
	typeDefs,
  resolvers,
  playground: true,
  plugins: [
      myPlugin,
      ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});


await server.start();
server.applyMiddleware({app});

const environment = http.createServer(app);
environment.listen({ port, host }, () => console.log(`🚀 GraphQL playground is running on ${process.env.NODE_ENV} at http://${host}:${port}${server.graphqlPath}\``));
