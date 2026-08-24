import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticateAdmin, clearAdminSession, getAdminSession } from "@/lib/admin-auth.server";

export const getAdminStatus = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await getAdminSession();
  } catch {
    return { isAdmin: false, email: null };
  }
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email().max(160),
      password: z.string().min(8).max(200),
    }),
  )
  .handler(async ({ data }) => ({ ok: await authenticateAdmin(data.email, data.password) }));

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  await clearAdminSession();
  return { ok: true as const };
});
