# fulcrum-interview

기술 면접은 두 문제로 진행합니다. 문제별 안내와 자료는 루트의 각 폴더에 있습니다.

| 폴더 | 내용 | 진행 |
| --- | --- | --- |
| [problem-1/](problem-1/PROBLEM.md) | 기존 Next.js 대시보드 코드 리뷰와 수정 | 약 20분, 코딩 |
| [problem-2/](problem-2/README.md) | 상세페이지 편집기의 AI 채팅 처리 구조 설계 | 약 30분, 그림과 설명 |

면접에서는 AI 채팅·코드 생성·AI 자동완성을 사용하지 않습니다. 1번에서는 일반 IDE 기능과 공식 문서를 사용할 수 있습니다. 판단의 근거와 문제를 해결하는 과정을 함께 설명해 주세요.

## 면접 전 준비

1번만 로컬 실행 환경이 필요합니다. [실행 안내](problem-1/README.md)를 따라 설치와 데모 계정 로그인을 확인해 주세요. 문제 해결은 면접 중 진행합니다.

필요한 도구는 **Bun 1.2 이상**, **Node.js 24 권장**입니다. Node.js 20.x는 20.19 이상, 22.x는 22.12 이상이어야 합니다. 명령은 Bun으로 실행하지만 Next.js와 Prisma CLI는 Node.js 런타임을 사용합니다.

```bash
cd problem-1
cp .env.example .env
bun install
bun run db:migrate
bun run db:seed
bun run dev
```

2번은 [문제 설명](problem-2/README.md)을 바탕으로 설계도를 그리며 대화합니다. 코드 구현이나 외부 AI API 연결은 필요하지 않습니다.
