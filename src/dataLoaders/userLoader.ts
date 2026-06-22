import DataLoader from "dataloader";
import { User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

const batchUsers = async (ids: number[]): Promise<User[]> => {
  //const ids=[9, 10, 11, 12, 13, 14, 15];
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  /* we need
    const arr = {
        "1" : { id:1, name: "Goni"},
        "2" : { id:2, name: "Shakib"},
        "3" : { id:3, name: "Shishir"},
        "4" : { id:3, name: "Raj"}
    }
    */

  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids
    .map((id) => userData[id])
    .filter((user): user is User => user !== undefined);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers)
