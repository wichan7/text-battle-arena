import type { NextRequest } from "next/server";
import { success } from "../../response";
import userService from "../service";

export async function POST(_request: NextRequest) {
  const accessToken = await userService.createUser();
  return success(accessToken);
}
