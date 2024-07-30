"use server";

import { auth } from "@/auth";
import db from "@/db/db";
import { addresses } from "@/db/schema";
import { AddressFormData } from "@/types/db";
import { eq, and } from "drizzle-orm";

export async function saveAddress(address: AddressFormData) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Check if the address already exists
  const existingAddress = await db.query.addresses.findFirst({
    where: and(
      eq(addresses.userId, userId),
      eq(addresses.line1, address.line1),
      eq(addresses.city, address.city),
      eq(addresses.postal_code, address.postal_code),
      eq(addresses.country, address.country),
      eq(addresses.state, address.state)
    ),
  });

  if (existingAddress) {
    // If the address exists, update it (in case some details changed)
    const [updatedAddress] = await db
      .update(addresses)
      .set({ ...address, updatedAt: new Date() })
      .where(eq(addresses.id, existingAddress.id))
      .returning();
    return updatedAddress;
  } else {
    // If the address doesn't exist, create a new one
    const [newAddress] = await db
      .insert(addresses)
      .values({ ...address, userId })
      .returning();
    return newAddress;
  }
}
