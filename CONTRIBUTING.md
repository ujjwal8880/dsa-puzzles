# Contributing to DSA Puzzles

**Repo:** https://github.com/ujjwal8880/dsa-puzzles

Thank you for helping grow this project! This guide covers everything you need to submit a high-quality PR.

---

## Quick start

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/dsa-puzzles.git
cd dsa-puzzles

# 2. Install dependencies
npm install

# 3. Create your .env.local (get a free key at console.groq.com)
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# 4. Start the dev server
npm run dev
```

---

## Branch naming

```
type/short-description
```

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `question` | New DSA question |
| `refactor` | Code cleanup, no behavior change |
| `docs` | Documentation only |
| `chore` | Config, tooling, dependencies |

Examples: `feat/ai-difficulty-filter`, `question/merge-intervals`, `fix/hint-not-animating`

---

## PR title format

```
type: short description (≥5 words)
```

The CI will **reject** PRs that don't follow this. Examples:

```
feat: add AI-powered difficulty filter to learn page
fix: hint card collapses incorrectly on mobile
question: add merge intervals with dry-run steps
```

---

## Adding a new question

1. Create a file in `src/data/questions/` — copy an existing question as a template.
2. Your question **must** include all required fields:
   - `title`, `slug`, `difficulty`, `category`, `patternName`
   - `descriptions` (`explorer`, `engineer`, `interviewer`)
   - `hints` (2–4 hints, progressive)
   - `dryRunSteps` (at least 3 steps)
   - `complexity` (time + space with explanation)
   - `codeSolutions` (JavaScript + Python minimum)
   - `xpRewards` (`puzzle`, `hints`, `dryRun`, `code`)
   - `interviewInsights`
3. Export from the appropriate index file.
4. The slug must be unique and use kebab-case.

---

## PR checklist (automated)

The following checks run on every PR and **must pass** before merge:

| Check | What it does |
|-------|-------------|
| PR title format | Enforces `type: description` convention |
| PR description | Rejects empty or one-line descriptions |
| Lint | `npm run lint` — zero warnings |
| Type check | `npx tsc --noEmit` |
| Build | `npm run build` must succeed |
| Secret scan | TruffleHog scans for leaked API keys |

---

## Local checks before pushing

```bash
npm run lint        # must be clean
npx tsc --noEmit    # must pass
npm run build       # must succeed
```

---

## Code style

- No comments unless the WHY is non-obvious
- No new `console.log` statements
- Tailwind utility classes only (no inline `style=` unless strictly necessary)
- Follow existing file structure and naming conventions

---

## Questions?

Open an issue before starting large work — it saves effort if the direction doesn't align.
