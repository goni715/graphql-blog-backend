import { prisma } from "../../lib/prisma";

interface IPostData {
  title: string;
  content: string;
}

export const postMutations = {
  addPost: async (parent: any, { post }: { post: IPostData }, context: any) => {
    if (!context.userInfo) {
      return {
        userError: "You are not authorized",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title & Content must be required",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        authorId: context?.userInfo?.userId,
        title: post.title,
        content: post.content,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
  updatePost: async (
    parent: any,
    { postId, post }: { postId: string; post: IPostData },
    context: any,
  ) => {
    if (!context.userInfo) {
      return {
        userError: "You are not authorized",
        post: null,
      };
    }

    //check user
    const user = await prisma.user.findUnique({
      where: {
        id: Number(context?.userInfo?.userId),
      },
    });

    if(!user){
      return {
        userError: "User not found",
        post: null
      }
    }

    if (!post.title && !post.content) {
      return {
        userError: "Title or Content must be required",
        post: null,
      };
    }

    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(postId),
        authorId: context?.userInfo?.userId,
      },
    });

    if (!postExist) {
      return {
        userError: "Post not found",
        post: null,
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
        authorId: context?.userInfo?.userId,
      },
      data: {
        title: post.title,
        content: post.content,
      },
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
};
