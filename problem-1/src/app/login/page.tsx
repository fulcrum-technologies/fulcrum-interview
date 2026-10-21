import { prisma } from "@/server/db";

import { login } from "./actions";

export default async function LoginPage() {
  const users = await prisma.user.findMany({ orderBy: { email: "asc" } });

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">로그인</h1>
      <p className="text-sm text-gray-500">
        데모 계정을 선택해 로그인하세요.
      </p>
      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <li key={user.id}>
            <form action={login}>
              <input type="hidden" name="email" value={user.email} />
              <button
                type="submit"
                className="w-full rounded border border-gray-300 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <span className="font-medium">{user.name}</span>{" "}
                <span className="text-sm text-gray-500">
                  ({user.email} · {user.role})
                </span>
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
