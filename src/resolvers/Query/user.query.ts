export const userQuery = {
  users: async (parent: any, args: any, { prisma }: any) => {
    const result = await prisma.user.findMany({
      include: {
        profile: true,
        // posts: true,
      },
    });
    return result;
  },
  singleUser: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(args.userId),
      },
      include: {
        profile: true,
      },
    });

    return user;
  },
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "You are not authorized",
        user: null,
      };
    }

    //check user
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userInfo?.userId),
      },
    });

    if (!user) {
      return {
        userError: "User not found",
        user: null,
      };
    }
    const result = await prisma.user.findUnique({
      where: {
        id: Number(userInfo.userId),
      },
      include: {
        profile: true,
        posts: true,
      },
    });

    return {
      userError: null,
      user: result,
    };
  },
};

//Handle Relationship
export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    //console.log(parent.id); // authorId
    const isMyProfile = parent.id === userInfo.userId;
    if (isMyProfile) {
      return await prisma.post.findMany({
        where: {
          authorId: Number(parent.id),
        },
      });
    }

    return await prisma.post.findMany({
      where: {
        authorId: Number(parent.id),
        published: true,
      },
    });
  },
};
