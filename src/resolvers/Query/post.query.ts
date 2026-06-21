import { prisma } from "../../lib/prisma";

export const postQuery = {
  posts: async (parent: any, args: any, context: any) => {
    const result = await prisma.post.findMany({
      where: {
        published: true,
      },
      // include: {
      //   author: true,
      // },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return result;
  },
};

export const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
  },
};
