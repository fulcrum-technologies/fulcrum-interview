"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/server/auth";
import { prisma } from "@/server/db";

export async function deletePost(formData: FormData) {
  const postId = String(formData.get("postId"));

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/dashboard");
}

export async function togglePublish(formData: FormData) {
  const postId = String(formData.get("postId"));
  const role = String(formData.get("role"));

  if (role !== "admin") {
    throw new Error("관리자만 발행 상태를 변경할 수 있습니다.");
  }

  const post = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
  await prisma.post.update({
    where: { id: postId },
    data: { published: !post.published },
  });
  revalidatePath("/dashboard");
}
