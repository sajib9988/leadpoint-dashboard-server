import config from '../../config';
import { jwtHelpers } from '../../helper/jwt.helper';
import { prisma } from '../../middleware/prisma';
import bcrypt from 'bcrypt';
import { Request } from 'express';

const registerUser = async (req: Request) => {
  const { name, email, password } = req.body;

  // ✅ Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is saltRounds

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return result;
};

const logInUser = async (
  payload: { email: string; password: string },
  req: Request
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email
    }
  });

  if (!userData.password) {
    throw new Error("Password not found");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  // ✅ Token Generate
  const accessToken = jwtHelpers.createToken(
    {
      userId: userData.id,
      email: userData.email,
      name: userData.name,
    },
    config.jwt.secret as string,
    config.jwt.expiresIn as string
  );

  const newRefreshToken = jwtHelpers.createToken(
    {
      userId: userData.id,
      email: userData.email,
      name: userData.name,
    },
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  console.log("accessToken", accessToken);

  return {
    accessToken,
    refreshToken: newRefreshToken
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as string);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: decodedData.email }
  });

  const accessToken = jwtHelpers.createToken(
    {
      userId: userData.id,
      email: userData.email,
      name: userData.name,
    },
    config.jwt.secret as string,
    config.jwt.expiresIn as string
  );

  return {
    accessToken
  };
};

export const authService = {
  registerUser,
  logInUser,
  refreshToken
};
