import config from "../../config";
import { AppError } from "../../utils/appError";
import { signJwt } from "../../utils/signJwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { hashPassword } from "../user/user.utils";
import { IAuth } from "./auth.interface";

const loginUser = async (payload: IAuth) => {
  const isUserExists = await User.isUserExists({
    identification: payload.identification,
  });
  if (!isUserExists) {
    throw new AppError(404, "User not found");
  }
  const isPasswordCorrect = await User.isPasswordCorrect(
    payload.password,
    isUserExists.user.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(400, "Wrong password");
  }
  const jwtPayload = {
    email: isUserExists.user.email,
    role: isUserExists.user.role,
  };
  const accessToken = signJwt(jwtPayload, config.access_secret as string);
  return { accessToken, data: isUserExists.user };
};

const socialLogin = async (payload: {
  email: string;
  name: string;
  image: string;
}) => {
  const isUserExists = await User.isUserExists({
    identification: payload.email,
  });
  if (!isUserExists) {
    let username = payload.email.split("@")[0];
    while (true) {
      const existingUser = await User.findOne({ username });
      if (!existingUser) break;
      username = username + Math.floor(Math.random() * 1000);
    }
    const userData: IUser = {
      email: payload.email,
      name: payload.name,
      password: config.default_password as string,
      username,
      profileImage: payload.image,
      role: "PLAYER",
    };
    const newUser = await User.create(userData);
    const jwtPayload = {
      email: newUser.email,
      role: newUser.role,
    };
    const accessToken = signJwt(jwtPayload, config.access_secret as string);
    return { accessToken, data: newUser };
  } else {
    const jwtPayload = {
      email: isUserExists.user.email,
      role: isUserExists.user.role,
    };
    const accessToken = signJwt(jwtPayload, config.access_secret as string);

    return { accessToken, data: isUserExists.user };
  }
};

export const AuthServices = {
  loginUser,
  socialLogin,
};
