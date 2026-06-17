import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async () => {
      const result = await prisma.user.findMany();
      return result;
    },
  },
  Mutation: {
    signup: async (parent: any, args: IUserInfo, contect: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const user = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

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
      const isMatchPassword = await bcrypt.compare(
        args.password,
        user.password,
      );
      if (!isMatchPassword) {
        return {
          userError: "Wrong Password",
          token: null,
        };
      }

      const token = jwt.sign(payload, "signature", { expiresIn: "1d" });
      return {
        userError:null,
        token,
      };
    },
  },
};
