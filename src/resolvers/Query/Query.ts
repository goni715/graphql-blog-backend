import { postQuery } from "./post.query";
import { userQuery } from "./user.query";

export const Query = {
  ...userQuery,
  ...postQuery
};
