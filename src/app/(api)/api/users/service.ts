import tokenHelper from "@/core/server/auth/tokenHelper";

const createUser = async () => {
  const userId = crypto.randomUUID();
  const accessToken = await tokenHelper.generateAccessToken(userId);
  return accessToken;
};

const userService = { createUser };
export default userService;
