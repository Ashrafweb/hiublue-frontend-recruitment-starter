"use server";

import { revalidateTag } from "next/cache";

export const revalidateDashboard = async () => {
  revalidateTag("dashboard");
};
