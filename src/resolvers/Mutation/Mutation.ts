import { authMutations } from "./auth.mutation";
import { postMutations } from "./post.mutation";


export const Mutation = {
  ...authMutations,
  ...postMutations
};
