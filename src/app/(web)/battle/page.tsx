"use client";

import { useSearchParams } from "next/navigation";
import battleQuery from "@/queries/battleQuery";

export default function Page() {
  const searchParams = useSearchParams();
  const characterId = searchParams.get("characterId");

  const { mutate } = battleQuery.useStartBattle();

  return <></>;
}
