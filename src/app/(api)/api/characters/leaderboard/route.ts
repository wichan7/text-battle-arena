import { success } from "../../response";
import characterService from "../service";

export async function GET() {
  const leaderboard = await characterService.getLeaderboard(5);

  return success(leaderboard);
}

