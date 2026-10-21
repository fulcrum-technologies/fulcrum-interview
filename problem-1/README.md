# 문제 1 — 실행 안내

과제 내용과 권한 정책은 [PROBLEM.md](PROBLEM.md)를 확인하세요. 아래 명령은 저장소 루트의 `problem-1/` 폴더에서 실행합니다.

Next.js 16 (App Router) + tRPC v11 + Prisma 7 (SQLite) 프로젝트입니다.

## 기술 스택

- **Next.js 16** — App Router, Turbopack, React 19
- **tRPC 11** — end-to-end 타입세이프 API (`superjson` transformer)
- **Prisma 7** — SQLite (`@prisma/adapter-better-sqlite3` 드라이버 어댑터)
- **Tailwind CSS 4**, TypeScript, ESLint

## 요구사항

- Bun 1.2 이상
- Node.js 24 권장. Node.js 20.x는 20.19 이상, 22.x는 22.12 이상이어야 합니다. Prisma 7의 요구 버전이며, 명령은 Bun으로 실행해도 Next.js·Prisma CLI에는 Node.js가 필요합니다.

## 시작하기

```bash
cp .env.example .env   # 로컬 SQLite 경로 등 (별도 수정 불필요)
bun install            # postinstall 에서 prisma generate 자동 실행
bun run db:migrate     # 마이그레이션 적용 (prisma/dev.db 생성)
bun run db:seed        # 데모 계정/게시글 시드
bun run dev
```

http://localhost:3000 에서 확인하세요.

- `/` — tRPC 기반 Posts 데모
- `/login` — 데모 계정 로그인 (버튼 클릭만 하면 됩니다)
  - `alice@example.com` (admin)
  - `bob@example.com` (user)
- `/dashboard` — 로그인 후 글 관리 (발행/삭제)

## 스크립트

| 스크립트 | 설명 |
| --- | --- |
| `bun run dev` | 개발 서버 실행 |
| `bun run build` / `bun run start` | 프로덕션 빌드 / 실행 |
| `bun run lint` | ESLint |
| `bun run db:migrate` | 로컬 SQLite 파일 준비 후 기존 마이그레이션 적용 (`prisma migrate deploy`) |
| `bun run db:seed` | 데모 데이터 시드 |
| `bun run db:generate` | Prisma 클라이언트 재생성 |
| `bun run db:studio` | Prisma Studio (DB GUI) |

## 프로젝트 구조

```
prisma/
  schema.prisma            # User / Post 모델 (SQLite)
  seed.ts                  # 데모 데이터 시드
prisma.config.ts           # Prisma 7 CLI 설정 (.env 로드)
src/
  app/
    api/trpc/[trpc]/route.ts   # tRPC fetch 어댑터 (route handler)
    login/                     # 데모 로그인 (쿠키 세션)
    dashboard/                 # 대시보드 + 글 관리 (서버 액션)
    layout.tsx                 # TRPCProvider 래핑
    page.tsx                   # Posts 데모 (클라이언트 컴포넌트)
  server/
    db.ts                  # PrismaClient 싱글턴
    auth.ts                # 쿠키 기반 데모 세션
    queries.ts             # 대시보드 데이터 조회
    trpc.ts                # initTRPC, 컨텍스트, 프로시저 헬퍼
    routers/               # appRouter (post.list / byId / create)
  lib/trpc/                # tRPC React 클라이언트 + 프로바이더
  generated/prisma/        # 생성된 Prisma 클라이언트 (gitignore)
```

## 면접 전 확인

- 설치와 데모 계정 로그인은 면접 전에 확인해 주세요.
- `db:seed`를 반복 실행하면 글이 5개씩 추가됩니다. 처음 준비할 때 한 번 실행하고, 초기 상태가 필요하면 아래 DB 초기화 절차를 따르세요.
- 개발 서버의 첫 접속에는 컴파일 시간이 포함됩니다. 로딩 시간을 비교할 때는 페이지를 한 번 연 뒤 같은 조건으로 다시 확인해 주세요.

## 문제가 생기면

- `bun install` 후 `@/generated/prisma/client` 를 찾지 못하면: `bun run db:generate`
- DB 를 초기화하고 싶으면: `prisma/dev.db` 삭제 후 `bun run db:migrate && bun run db:seed`
