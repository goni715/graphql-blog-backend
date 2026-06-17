export const typeDefs = `#graphql
  type Query {
    me: User
    posts: [Post]
    users: [User]
  }
  
  type Mutation {
    signup(name: String!, email: String!, password: String!): User
    signin(
      email: String!, 
      password: String!
    ): AuthResult
  }

  type AuthResult {
    userError: String
    token: String
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

  type Profile {
    id: ID!
    bio: String
    createdAt: String
    user: User!
  }

`;
