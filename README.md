# 🚀 GraphQL Blog Backend Server

A high-performance, robust, and type-safe GraphQL backend server for a blogging application. Built using modern technologies including **Apollo Server**, **PostgreSQL**, **Prisma ORM**, and hosted/managed via **Supabase**.

🔗 **Live Server Link:** [https://graphql-blog-backend.vercel.app](https://graphql-blog-backend.vercel.app)

---

## 🛠️ Tech Stack & Key Technologies

- **GraphQL API Runtime:** [Apollo Server](https://www.apollographql.com/docs/apollo-server/) & [GraphQL](https://graphql.org/)
- **Database ORM:** [Prisma ORM](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Compatible with [Supabase](https://supabase.com/))
- **Language & Runtime:** [TypeScript](https://www.typescriptlang.org/) & [Node.js](https://nodejs.org/)
- **Execution & Development:** [tsx](https://github.com/privatenumber/tsx) (TypeScript Execute)
- **Security & Utilities:** `bcryptjs` (Password hashing) & `jsonwebtoken` (Authentication)
- **Optimization:** [DataLoader](https://github.com/graphql/dataloader) (Solving the N+1 database queries problem)

---

## 📂 Project Folder Structure

Below is the directory structure of the project. Click the links to view the implementation of each key file:

```text
graphql-blog-backend/
├── prisma/
│   ├── migrations/              # Auto-generated database schema migrations
│   └── schema.prisma            # Prisma schema (models, relations & DB config)
├── src/
│   ├── config/
│   │   └── index.ts             # Server configuration & environment variables
│   ├── dataLoaders/
│   │   └── userLoader.ts        # DataLoader implementation for batching user queries
│   ├── generated/               # Generated Prisma Client code
│   ├── lib/
│   │   └── prisma.ts            # Global Prisma Client instance definition
│   ├── resolvers/
│   │   ├── Mutation/
│   │   │   ├── Mutation.ts      # Main mutation resolver configuration
│   │   │   ├── auth.mutation.ts # Mutations for authentication (signup, signin)
│   │   │   └── post.mutation.ts # Mutations for posts (add, update, delete, publish)
│   │   ├── Query/
│   │   │   ├── Query.ts         # Main query resolver configuration
│   │   │   ├── post.query.ts    # Resolvers for post-related queries
│   │   │   └── user.query.ts    # Resolvers for user/profile queries
│   │   └── index.ts             # Aggregated export of all resolvers
│   ├── utils/
│   │   └── jwtHelper.ts         # Authentication helper for token signing & verification
│   ├── index.ts                 # Main entry point (initiates Apollo Server & context)
│   └── schema.ts                # GraphQL Schema (TypeDefs using Schema Definition Language)
├── .env                         # Local environment variables configuration file
├── .gitignore
├── package.json                 # Dependency configuration & scripts
├── tsconfig.json                # TypeScript compiler rules configuration
└── vercel.json                  # Vercel hosting configuration
```

### 🔗 Key Files Reference
- 🗄️ Database: [schema.prisma](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/prisma/schema.prisma) | [prisma.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/lib/prisma.ts)
- 📡 GraphQL Schema: [schema.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/schema.ts)
- 🚀 Server Setup: [index.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/index.ts)
- ⚡ Optimization: [userLoader.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/dataLoaders/userLoader.ts)
- 🔐 Auth Helpers: [jwtHelper.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/utils/jwtHelper.ts)
- 🧬 Resolvers:
  - Mutations: [auth.mutation.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/resolvers/Mutation/auth.mutation.ts) | [post.mutation.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/resolvers/Mutation/post.mutation.ts)
  - Queries: [user.query.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/resolvers/Query/user.query.ts) | [post.query.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/resolvers/Query/post.query.ts)

---

## 📋 Requirements & System Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v24.11.1`
- **Package Manager**: `npm` (v9+) or `yarn` (v1.22+)
- **Database**: PostgreSQL (e.g., hosted on **Supabase** or running locally)

---

## 🗄️ Database Schema & Models

The PostgreSQL schema is structured into three primary tables mapping users, profiles, and blog posts with appropriate constraints.

```mermaid
erDiagram
    users {
        Int id PK
        String name
        String email UK
        String password
        DateTime created_at
        DateTime updated_at
    }
    profiles {
        Int id PK
        String bio
        Int user_id FK,UK
        DateTime created_at
        DateTime updated_at
    }
    posts {
        Int id PK
        String title
        String content
        Int author_id FK
        Boolean published
        DateTime created_at
        DateTime updated_at
    }

    users ||--o| profiles : "has one"
    users ||--o{ posts : "writes many"
```

### Table Structure Details

#### 1. `User` Table (`users`)
| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | Primary Key, Autoincrement | Unique identifier of the user |
| `name` | `String` | Not Null | Display name of the user |
| `email` | `String` | Unique, Not Null | Email address (used for signin) |
| `password` | `String` | Not Null | Hashed password |
| `createdAt` | `DateTime` | Default `now()` | Timestamp of signup |
| `updatedAt` | `DateTime` | Updated Automatically | Timestamp of last modification |

#### 2. `Profile` Table (`profiles`)
| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | Primary Key, Autoincrement | Unique identifier of the profile |
| `bio` | `String` | Not Null | Biography description |
| `userId` | `Int` | Foreign Key (User), Unique | Maps 1-to-1 with a User |
| `createdAt` | `DateTime` | Default `now()` | Timestamp of creation |
| `updatedAt` | `DateTime` | Updated Automatically | Timestamp of last modification |

#### 3. `Post` Table (`posts`)
| Column | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | Primary Key, Autoincrement | Unique identifier of the post |
| `title` | `String` | Not Null | Title of the blog post |
| `content` | `String` | Not Null | Body content of the post |
| `published` | `Boolean` | Default `false` | Status indicating if the post is live |
| `authorId` | `Int` | Foreign Key (User) | Maps to the User who created the post |
| `createdAt` | `DateTime` | Default `now()` | Timestamp of creation |
| `updatedAt` | `DateTime` | Updated Automatically | Timestamp of last modification |

---

## 📡 GraphQL Schema Specification

### 🔍 Queries
| Field | Arguments | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `me` | *None* | `UserPayload!` | Returns current logged-in user profile, posts, or auth errors |
| `posts` | *None* | `[Post]` | Retrieves a list of all **published** posts (sorted newest first) |
| `users` | *None* | `[User]` | Retrieves all registered users and their profiles |
| `singleUser` | `userId: ID!` | `User` | Retrieves details for a specific user |

### 🧪 Mutations
| Field | Arguments | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `signup` | `name: String!`, `email: String!`, `password: String!`, `bio: String` | `SignUpRes` | Register a new user account with optional bio profile |
| `signin` | `email: String!`, `password: String!` | `AuthResult` | Authenticate credentials and return a signed JWT Token |
| `addPost` | `post: PostInput!` | `PostPayload` | Create a new draft post (Requires authorization) |
| `updatePost`| `postId: ID!`, `post: PostInput` | `PostPayload` | Update title/content of an existing post (Authorized author only) |
| `deletePost`| `postId: ID!` | `PostPayload` | Delete a post (Authorized author only) |
| `publishPost`| `postId: ID!` | `PostPayload` | Change post status to published (Authorized author only) |

---

## 🚀 Setup & Installation

Follow these steps to run the server locally:

### 1. Clone the repository and install dependencies
```bash
git clone https://github.com/goni715/graphql-blog-backend.git
cd graphql-blog-backend
yarn install
# or
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and define the following variables:
```env
# PostgreSQL connection string with pooling (e.g. Supabase connection pooler)
DATABASE_URL="postgresql://postgres.your_project_id:your_password@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database (used for migrations)
DIRECT_URL="postgresql://postgres.your_project_id:your_password@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"

# Secret key for signing JSON Web Tokens
JWT_SECRET="your_jwt_signing_secret_here"
```

### 3. Setup Database with Prisma
Run migrations and generate the Prisma Client:
```bash
# Push migrations and sync with your Database
npx prisma migrate dev --name init

# Generate the type-safe client
npx prisma generate
```

### 4. Start the Application
Run the local standalone Apollo development server:
```bash
yarn dev
# or
npm run dev
```

The server will boot up and print its playground URL:
```text
🚀  Server ready at: http://localhost:4000/
```

---

## 🔐 Authentication & Operations Flow

1. **Sign Up / Sign In**: Call `signup` or `signin` mutation to retrieve a `token`.
2. **Authorize Requests**: In your GraphQL client (like Apollo Sandbox / Postman), add the token to the `Authorization` header:
   ```json
   {
     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```
3. **Context Injection**: The [index.ts](file:///f:/my-projects/GraphQL-Project/graphql-blog-backend/src/index.ts) context function verifies the token via `jwtHelper` and attaches the user information to the query context.
4. **Operations**: Authorized mutations (`addPost`, `updatePost`, `deletePost`, `publishPost`) verify ownership of resources before making database updates.
5. **DataLoader Performance**: The relation resolver for `Post.author` uses `DataLoader` to batch multiple user database calls. This avoids N+1 queries during bulk post retrievals.

---

## ⚡ Example GraphQL Operations

You can run the following operations in the Apollo Sandbox or client of your choice (`http://localhost:4000/`):

### 1. Signup Mutation
Register a new user account.

**Mutation:**
```graphql
mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
        userError
        name
        email
    }
}
```

**Variables:**
```json
{
    "name": "Siddik Khan",
    "email": "siddik@gmail.com",
    "password": "123456"
}
```

**Expected Response:**
```json
{
    "data": {
        "signup": {
            "userError": null,
            "name": "Siddik Khan",
            "email": "siddik@gmail.com"
        }
    }
}
```

### 2. Signin Mutation
Authenticate user credentials and fetch the JWT token.

**Mutation:**
```graphql
mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
        userError
        token
    }
}
```

**Variables:**
```json
{
    "email": "siddik@gmail.com",
    "password": "123456"
}
```

**Expected Response:**
```json
{
    "data": {
        "signin": {
            "userError": null,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6InNpZGRpa0BnbWFpbC5jb20iLCJpYXQiOjE3ODIyMjc0MjQsImV4cCI6MTc4MjMxMzgyNH0.qrwnRo9tV7VZEvTvJbjWVzw808wV9-Dtgzahjwvl7RE"
        }
    }
}
```

### 3. Get All Users Query
Fetch all registered users.

**Query:**
```graphql
query GetAllUsers {
    users {
        id
        name
        email
        createdAt
    }
}
```

**Expected Response:**
```json
{
    "data": {
        "users": [
            {
                "id": "1",
                "name": "Osman Goni",
                "email": "gonidev715@gmail.com",
                "createdAt": "1781626995634"
            },
            {
                "id": "2",
                "name": "Evan Ahmed",
                "email": "evan@gmail.com",
                "createdAt": "1781627075455"
            },
            {
                "id": "4",
                "name": "Fatema Akter",
                "email": "fatema@gmail.com",
                "createdAt": "1781711261953"
            },
            {
                "id": "5",
                "name": "Jaman Islam",
                "email": "jaman@gmail.com",
                "createdAt": "1781713596254"
            },
            {
                "id": "7",
                "name": "Jaman Islam",
                "email": "jam@gmail.com",
                "createdAt": "1781713677489"
            },
            {
                "id": "8",
                "name": "Jaman Islam",
                "email": "jam9@gmail.com",
                "createdAt": "1781799952731"
            },
            {
                "id": "9",
                "name": "Jaman Islam",
                "email": "jam22@gmail.com",
                "createdAt": "1781800033035"
            },
            {
                "id": "10",
                "name": "Jaman Islam",
                "email": "jam882@gmail.com",
                "createdAt": "1781800046959"
            },
            {
                "id": "11",
                "name": "Ismail Hossain",
                "email": "ismail@gmail.com",
                "createdAt": "1781802380241"
            },
            {
                "id": "12",
                "name": "Manik Islam",
                "email": "manik@gmail.com",
                "createdAt": "1782013199336"
            }
        ]
    }
}
```

### 4. Get All Published Posts Query
Fetch published blog posts and load relationship data (utilizes DataLoader to batch query authors).

**Query:**
```graphql
query GetAllPosts {
    posts {
        id
        title
        content
        published
        createdAt
        author {
            id
            name
            email
        }
    }
}
```

**Expected Response:**
```json
{
    "data": {
        "posts": [
            {
                "id": "8",
                "title": "Title 04",
                "content": "content 04",
                "published": true,
                "createdAt": "1782025288094",
                "author": {
                    "id": "12",
                    "name": "Manik Islam",
                    "email": "manik@gmail.com"
                }
            },
            {
                "id": "5",
                "title": "Updated Title",
                "content": "Updated content",
                "published": true,
                "createdAt": "1782014608087",
                "author": {
                    "id": "12",
                    "name": "Manik Islam",
                    "email": "manik@gmail.com"
                }
            }
        ]
    }
}
```

### 5. Get Single User Query
Retrieve profile information for a specific user ID.

**Query:**
```graphql
query SingleUser {
    singleUser(userId: "1") {
        id
        name
        email
        createdAt
        profile {
            bio
        }
    }
}
```

**Expected Response:**
```json
{
    "data": {
        "singleUser": {
            "id": "1",
            "name": "Osman Goni",
            "email": "gonidev715@gmail.com",
            "createdAt": "1781626995634",
            "profile": null
        }
    }
}
```

### 6. Add Post Mutation (Authorized)
Create a new draft post by providing the required authentication header.

**Input Schema Definition:**
```graphql
input PostInput {
    title: String
    content: String
}
```

**Mutation:**
```graphql
mutation AddPost($post: PostInput!) {
    addPost(post: $post) {
        userError
        post {
            title
            content
        }
    }
}
```

**Variables:**
```json
{
    "post": {
        "title": "Travel Vlog",
        "content": "This is my first blog ever"
    }
}
```

**HTTP Headers:**
```json
{
    "Authorization": "YOUR_JWT_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
    "data": {
        "addPost": {
            "userError": null,
            "post": {
                "title": "Travel Vlog",
                "content": "This is my first blog ever"
            }
        }
    }
}
```

### 7. Add Post Mutation (Unauthorized Error)
Attempting to create a post without providing the `Authorization` HTTP header.

**Expected Response:**
```json
{
    "data": {
        "addPost": {
            "userError": "You are not authorized",
            "post": null
        }
    }
}
```

### 8. Update Post Mutation (Authorized)
Update the title or content of an existing post.

**Mutation:**
```graphql
mutation UpdatePost($postId: ID!, $post: PostInput) {
    updatePost(postId: $postId, post: $post) {
        userError
        post {
            title
            content
        }
    }
}
```

**Variables:**
```json
{
    "postId": "10",
    "post": {
        "title": "New Travel Vlog",
        "content": "This is my second vlog"
    }
}
```

**HTTP Headers:**
```json
{
    "Authorization": "YOUR_JWT_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
    "data": {
        "updatePost": {
            "userError": null,
            "post": {
                "title": "New Travel Vlog",
                "content": "This is my second vlog"
            }
        }
    }
}
```

### 9. Publish Post Mutation (Authorized)
Publish a drafted post (marks `published` as `true`).

**Mutation:**
```graphql
mutation PublishPost($postId: ID!) {
    publishPost(postId: $postId) {
        userError
        post {
            id
            title
            content
            published
        }
    }
}
```

**Variables:**
```json
{
    "postId": "10"
}
```

**HTTP Headers:**
```json
{
    "Authorization": "YOUR_JWT_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
    "data": {
        "publishPost": {
            "userError": null,
            "post": {
                "id": "10",
                "title": "New Travel Vlog",
                "content": "This is my second vlog",
                "published": true
            }
        }
    }
}
```

### 10. Delete Post Mutation (Authorized)
Delete an existing post.

**Mutation:**
```graphql
mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
        userError
        post {
            id
            title
            content
        }
    }
}
```

**Variables:**
```json
{
    "postId": "10"
}
```

**HTTP Headers:**
```json
{
    "Authorization": "YOUR_JWT_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
    "data": {
        "deletePost": {
            "userError": null,
            "post": {
                "id": "10",
                "title": "New Travel Vlog",
                "content": "This is my second vlog"
            }
        }
    }
}
```


