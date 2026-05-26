# DSA Puzzles

**https://github.com/ujjwal8880/dsa-puzzles**

An interactive DSA learning platform with puzzle-based learning, AI hints, step-by-step dry runs, and a built-in coding editor. Built with Next.js, AI SDK, and Groq.

---

## Features

- 160+ DSA questions across 6 categories
- Blind 75 and Top Interview 150 question sets
- 6-step learning flow: Puzzle → Hints → Dry Run → Complexity → Code It → Interview
- AI-powered nudges via Groq (free, no login needed)
- XP / gamification system
- Vercel Analytics with custom events

---

## Local setup

```bash
git clone https://github.com/ujjwal8880/dsa-puzzles.git
cd dsa-puzzles
npm install
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local — get one free at console.groq.com
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Contributing

Full guide: [CONTRIBUTING.md](CONTRIBUTING.md)

### Quick steps

```bash
# 1. Fork the repo on GitHub
# 2. Clone your fork
git clone https://github.com/<your-username>/dsa-puzzles.git
cd dsa-puzzles

# 3. Create a branch (follow naming convention)
git checkout -b feat/your-feature-name
# or: fix/bug-description | question/question-name | docs/what-changed

# 4. Make your changes
# 5. Run checks locally before pushing
npm run lint
npx tsc --noEmit
npm run build

# 6. Commit with a clear message
git commit -m "feat: add merge intervals question with dry-run steps"

# 7. Push and open a PR
git push origin feat/your-feature-name
```

Then open a PR at **https://github.com/ujjwal8880/dsa-puzzles/compare**.

---

### PR rules (enforced by CI)

All PRs must pass these automated checks or they cannot be merged:

| Check | Rule |
|-------|------|
| **PR title** | Must follow `type: description` — e.g. `feat: add binary search question` |
| **PR description** | Cannot be empty or one-liners — explain what and why |
| **Lint** | `npm run lint` must be clean |
| **Type check** | `npx tsc --noEmit` must pass |
| **Build** | `npm run build` must succeed |
| **Secret scan** | No leaked API keys allowed |

Valid PR title types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `question`, `style`, `perf`, `ci`

---

### Merge policy

Only [@ujjwal8880](https://github.com/ujjwal8880) can merge PRs. Every PR requires an approval from the repo owner before it can be merged.

---

## Stack

- [Next.js](https://nextjs.org) — App Router
- [AI SDK](https://sdk.vercel.ai) + [Groq](https://groq.com) — streaming AI hints
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Zustand](https://zustand-demo.pmnd.rs/) — state / progress persistence
- [Vercel Analytics](https://vercel.com/analytics) — custom event tracking
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — in-browser code editor

---

## License

MIT
