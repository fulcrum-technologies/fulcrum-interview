import { prisma } from "./db";

// Simulates upstream latency (analytics warehouse / external APIs).
const simulateLatency = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getRecentPosts() {
  await simulateLatency(400);
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
    take: 20,
  });
}

export async function getPostStats() {
  await simulateLatency(3000);
  const total = await prisma.post.count();
  const published = await prisma.post.count({ where: { published: true } });
  return { total, published, drafts: total - published };
}

export async function getTeamMembers() {
  await simulateLatency(400);
  return prisma.user.findMany({ orderBy: { createdAt: "asc" } });
}
