import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";

export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio: string;
}

export const Mutation = {
  signup: async (parent: any, args: IUserInfo, contect: any) => {
    //check email is already exist
    const isExist = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });
    if (isExist) {
      return {
        userError: "Email is already registered",
        name: null,
        email: null,
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const user = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: user.id,
        },
      });
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return user;
  },
  signin: async (parent: any, args: IUserInfo, contect: any) => {
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const user = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        userError: "User Not Found",
        token: null,
      };
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    //check password
    const isMatchPassword = await bcrypt.compare(args.password, user.password);
    if (!isMatchPassword) {
      return {
        userError: "Wrong Password",
        token: null,
      };
    }

    const token = jwt.sign(payload, config.jwt_secret as Secret, {
      expiresIn: "1d",
    });
    return {
      userError: null,
      token,
    };
  },
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
        content: args.content
      }
    })

    return {
      userError: null,
      post: newPost
    }

  },
};
