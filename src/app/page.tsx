"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>ELN</h1>
        <Button
          onClick={() => {
            push("/notebook/");
          }}
        >
          New notebook
        </Button>
      </main>
      <footer></footer>
    </div>
  );
}
