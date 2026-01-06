import { success } from "../../response";
import characterService from "../service";

export async function GET() {
  const leaderboard = await characterService.getLeaderboard(10);

  return success(leaderboard);
}
