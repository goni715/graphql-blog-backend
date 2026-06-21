import { prisma } from "../../lib/prisma";

export const postQuery = {
  posts: async (parent: any, args: any, context: any) => {
    const result = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return result;
  },
};
