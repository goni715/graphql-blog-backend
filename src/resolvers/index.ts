import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";
import { Post } from "./Query/post.query";
import { User } from "./Query/user.query";

export const resolvers = {
  Query,
  Post,
  User,
  Mutation,
};
