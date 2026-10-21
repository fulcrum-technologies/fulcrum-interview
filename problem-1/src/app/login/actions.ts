"use server";

import { redirect } from "next/navigation";

import { createSession, destroySession } from "@/server/auth";
import { prisma } from "@/server/db";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    redirect("/login?error=unknown-user");
  }
  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
