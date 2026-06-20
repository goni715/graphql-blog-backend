export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    const result = await prisma.user.findMany();
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
};
