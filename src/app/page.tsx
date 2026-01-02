"use client";

import { useRouter } from "next/navigation";
import userQuery from "@/queries/userQuery";

export default function Home() {
  const { mutate } = userQuery.useJoin();
  const router = useRouter();

  const onClickJoin = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push("/character");
      },
    });
  };

  return (
    <main>
      <button onClick={onClickJoin}>join!</button>
    </main>
  );
}
