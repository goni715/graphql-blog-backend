import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt_secret as Secret) as {
      userId: number;
      email: string;
    };
    return userData;
  } catch (err: any) {
    throw new err();
  }
};

export const jwtHelper = {
  getUserInfoFromToken,
};
