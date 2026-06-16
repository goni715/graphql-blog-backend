import { prisma } from "../lib/prisma";

export const resolvers = {
  Query: {},
  Mutation: {
    signup: async (parent: any, args: any, contect: any) => {
      console.log(args);
      const user = await prisma.user.create({
        data: args
      });
      return user
    },
  },
};
