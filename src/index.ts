import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { prisma } from "./lib/prisma";
import { PrismaClient } from "./generated/prisma/client";
import { GlobalOmitConfig } from "./generated/prisma/internal/prismaNamespace";
import { DefaultArgs } from "@prisma/client/runtime/client";
import { jwtHelper } from "./utils/jwtHelper";

interface IContext {
  prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>;
  userInfo:
    | {
        userId: number;
        email: string;
      }
    | null
    | undefined;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<IContext> => {
      let userData;
      if (req.headers.authorization) {
        userData = await jwtHelper.getUserInfoFromToken(
          req.headers.authorization as string,
        );
      }

      return {
        prisma,
        userInfo: userData,
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

main();
