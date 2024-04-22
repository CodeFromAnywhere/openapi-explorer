"use server";

import { revalidatePath } from "next/cache";

export default async function action(openapiUrl: string) {
  revalidatePath(openapiUrl);
}
