import { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";
import getSession from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }
  return (
    <section className="mx-auto">
      <h1>Settings Page</h1>
      <SettingsForm user={user} />
    </section>
  );
}
