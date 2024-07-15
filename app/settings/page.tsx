import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }
  return (
    <main>
      <section>
        <h1>Settings Page</h1>
        <SettingsForm user={user} />
      </section>
    </main>
  );
}
