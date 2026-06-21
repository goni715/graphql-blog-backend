import { prisma } from "../../lib/prisma";

export const postMutations = {
  addPost: async (
    parent: any,
    args: { title: string; content: string },
    context: any,
  ) => {
    if (!context.userInfo) {
      return {
        userError: "You are not authorized",
        post: null,
      };
    }

    if (!args.title || !args.content) {
      return {
        userError: "Title & Content must be required",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        authorId: context?.userInfo?.userId,
        title: args.title,
        content: args.content,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
};
