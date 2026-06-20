import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";

export const resolvers = {
  Query,
  Mutation,
};
