import Link from "next/link";

import { getCurrentUser } from "@/server/auth";
import { getPostStats, getRecentPosts, getTeamMembers } from "@/server/queries";

import { logout } from "../login/actions";
import { AnalyticsPanel } from "./analytics-panel";
import { deletePost, togglePublish } from "./actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 p-8">
        <p>로그인이 필요합니다.</p>
        <Link className="underline" href="/login">
          로그인 페이지로
        </Link>
      </main>
    );
  }

  const posts = await getRecentPosts();
  const stats = await getPostStats();
  const members = await getTeamMembers();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">대시보드</h1>
          <p className="text-sm text-gray-500">
            {user.name} ({user.role}) · 팀원 {members.length}명
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm text-gray-500 underline">
            로그아웃
          </button>
        </form>
      </header>

      <AnalyticsPanel
        stats={stats}
        analyticsApiSecret={process.env.ANALYTICS_API_SECRET!}
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">전체 글</h2>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-4 rounded border border-gray-300 p-3"
            >
              <div>
                <p className="font-medium">
                  {post.title}{" "}
                  {!post.published && (
                    <span className="text-xs text-amber-600">초안</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {post.author?.name ?? "anonymous"} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <form action={togglePublish}>
                  <input type="hidden" name="postId" value={post.id} />
                  <input type="hidden" name="role" value={user.role} />
                  <button
                    type="submit"
                    className="rounded border border-gray-300 px-3 py-1 text-sm"
                  >
                    {post.published ? "발행 취소" : "발행"}
                  </button>
                </form>
                <form action={deletePost}>
                  <input type="hidden" name="postId" value={post.id} />
                  <button
                    type="submit"
                    className="rounded border border-red-300 px-3 py-1 text-sm text-red-600"
                  >
                    삭제
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
