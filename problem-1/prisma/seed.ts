import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      role: "admin",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      role: "user",
    },
  });

  const posts = [
    { title: "Q3 로드맵 초안", content: "3분기 주요 마일스톤 정리", authorId: alice.id, published: true },
    { title: "결제 모듈 리팩토링 노트", content: "PG 어댑터 계층 분리 검토", authorId: alice.id, published: false },
    { title: "온보딩 개선 아이디어", content: "가입 퍼널 단계 축소안", authorId: bob.id, published: true },
    { title: "장애 회고: 7/12 배포", content: "롤백 절차 개선 필요", authorId: bob.id, published: false },
    { title: "사내 위키 마이그레이션", content: "노션 → 자체 위키 이전 계획", authorId: bob.id, published: true },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log("Seeded 2 users, %d posts", posts.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
