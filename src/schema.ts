export const typeDefs = `#graphql
  type Query {
    me: UserPayload
    posts: [Post]
    users: [User]
    singleUser (userId: ID!) : User,
  }
  
  type Mutation {
    signup(name: String!, email: String!, password: String!, bio: String): SignUpRes
    signin(
      email: String!, 
      password: String!
    ): AuthResult
    addPost(post: PostInput!): PostPayload
    updatePost(postId: ID!, post: PostInput): PostPayload
    deletePost(postId: ID!): PostPayload
    publishPost(postId: ID!): PostPayload
  }


  type SignUpRes {
    userError: String
    name: String
    email: String
  }

  type AuthResult {
    userError: String
    token: String
  }

  type PostPayload {
    userError: String
    post: Post
  }

  type Post{
    id: ID!
    title: String!
    content: String!
    author: User
    published: Boolean
    createdAt: String
  }

  type User{
    id: ID!
    name: String!
    email: String!
    createdAt: String
    posts: [Post]
    profile: Profile
  }

  type UserPayload{
    userError: String
    user: User
  }

  type Profile {
    id: ID!
    bio: String
    createdAt: String
    user: User!
  }

  input PostInput {
    title: String
    content: String
  }

`;
