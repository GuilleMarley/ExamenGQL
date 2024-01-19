import mongoose from "mongoose"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./gql/schema.ts";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";

export const NINJA_API = Deno.env.get("NINJA_KEY")

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL){
  throw new Error("Please give me url for mongo")
}

await mongoose.connect(MONGO_URL)
console.info("Connected to MongoDB")

const server = new ApolloServer ({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  }
})

const { url } = await startStandaloneServer(server)
console.info(`Server ready at ${url}`)