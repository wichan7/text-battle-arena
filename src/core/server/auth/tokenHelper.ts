import { jwtVerify, SignJWT } from "jose";

export type TokenPayload = {
  userId: string;
};

const verify = async (accessToken: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify<TokenPayload>(accessToken, secret);

  return payload;
};

const generateAccessToken = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload: TokenPayload = { userId };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(secret);

  return token;
};
const tokenHelper = { verify, generateAccessToken };
export default tokenHelper;
