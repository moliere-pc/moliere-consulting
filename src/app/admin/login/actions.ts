"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, getCurrentUser } from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Adresse e-mail invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
    return { error: "Identifiants incorrects." };
  }

  await createSession(user.id);
  redirect("/admin");
}

export async function redirectIfConnected() {
  const user = await getCurrentUser();
  if (user) redirect("/admin");
}
