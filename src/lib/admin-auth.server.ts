import process from "node:process";
import { useSession as getStartSession } from "@tanstack/react-start/server";

type AdminSessionData = {
  isAdmin?: boolean;
  email?: string;
};

function sessionConfig() {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error("SESSION_SECRET minimal 32 karakter belum dikonfigurasi.");
  }
  return {
    name: "suruhin_admin",
    password,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 8,
    },
  };
}

export async function getAdminSession() {
  const session = await getStartSession<AdminSessionData>(sessionConfig());
  return {
    isAdmin: session.data.isAdmin === true,
    email: session.data.email ?? null,
  };
}

export async function requireAdmin() {
  const admin = await getAdminSession();
  if (!admin.isAdmin) throw new Error("UNAUTHORIZED");
  return admin;
}

export async function authenticateAdmin(email: string, password: string): Promise<boolean> {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword) {
    throw new Error("ADMIN_EMAIL dan ADMIN_PASSWORD belum dikonfigurasi.");
  }
  if (email !== expectedEmail || password !== expectedPassword) return false;

  const session = await getStartSession<AdminSessionData>(sessionConfig());
  await session.update({ isAdmin: true, email });
  return true;
}

export async function clearAdminSession(): Promise<void> {
  const session = await getStartSession<AdminSessionData>(sessionConfig());
  await session.clear();
}
