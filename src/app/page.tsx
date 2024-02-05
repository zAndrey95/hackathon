"use client";
import { List } from "@/app/components/ui/List/List";
import { Profile } from "@/app/components/ui/Profile/Profile";
import { LiteflowProvider } from "@liteflow/react";

export default function Page() {
  return (
    <main className="flex flex-col">
      <LiteflowProvider apiKey="0927b2a5-131e-419d-9a6a-2cdb36200fbe">

        <div className="grid m-8 md:mb-12 md:grid-cols-2 place-items-center">
          <Profile />
          <List />
        </div>
      </LiteflowProvider>
    </main>
  );
}
