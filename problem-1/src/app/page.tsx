"use client";

import { useState } from "react";

import { trpc } from "@/lib/trpc/client";

export default function Home() {
  const [title, setTitle] = useState("");
  const utils = trpc.useUtils();
  const posts = trpc.post.list.useQuery();
  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      setTitle("");
      utils.post.list.invalidate();
    },
  });

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <a className="text-sm underline" href="/dashboard">
          대시보드 →
        </a>
      </header>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) createPost.mutate({ title });
        }}
      >
        <input
          className="flex-1 rounded border border-gray-300 px-3 py-2"
          placeholder="New post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={createPost.isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {createPost.isPending ? "Adding…" : "Add"}
        </button>
      </form>

      {posts.isLoading && <p>Loading…</p>}
      {posts.error && <p className="text-red-500">{posts.error.message}</p>}

      <ul className="flex flex-col gap-2">
        {posts.data?.map((post) => (
          <li key={post.id} className="rounded border border-gray-300 p-3">
            <p className="font-medium">{post.title}</p>
            <p className="text-sm text-gray-500">
              {post.author?.name ?? "anonymous"} ·{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
        {posts.data?.length === 0 && (
          <li className="text-gray-500">No posts yet.</li>
        )}
      </ul>
    </main>
  );
}
