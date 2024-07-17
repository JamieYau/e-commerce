"use server";

import { auth } from "@/auth";
import db from "@/db/db";
import { users } from "@/db/schema";
import { updateProfileSchema, UpdateProfileValues } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(values: UpdateProfileValues) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw Error("Unauthorized");
  }

  const { name } = updateProfileSchema.parse(values);

  await db.update(users).set({name: name}).where(eq(users.id, userId))

  revalidatePath("/");
}
