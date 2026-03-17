# jadiha.dev

> a cozy little corner of the internet ✿

A personal website built as a scroll-driven experience — pixel art sky, photo gallery, and an interactive terminal. Fully responsive with a separate mobile experience.

---

## features

- **pixel art sky** — hand-drawn canvas background with parallax cloud layers that animate as you scroll
- **scroll-driven transitions** — welcome screen → horizontal photo gallery → terminal zoom-in, all driven by a lerp RAF loop
- **interactive terminal** — type (or tap) commands to explore: `about`, `experience`, `projects`, `skills`, `socials`, `download`
- **frosted glass UI** — pastel pink & peach palette with `backdrop-filter` blur effects
- **mobile experience** — dedicated `/m` route with swipeable photo carousel and tappable command buttons, auto-detected via middleware

---

## stack

| | |
|---|---|
| **framework** | Next.js 15 (App Router) |
| **styling** | Tailwind CSS + custom CSS |
| **fonts** | Press Start 2P, Geist Mono |
| **animations** | HTML Canvas, scroll lerp, RAF loop |
| **deployment** | Vercel |

---

## getting started

```bash
npm install
npm run dev
```

open [http://localhost:3000](http://localhost:3000)

---

## terminal commands

```
about        who i am
experience   where i've worked
projects     things i've built
skills       what i work with
socials      find me online
download     grab my resume
clear        clear the terminal
help         list all commands
```

---

## project structure

```
src/
├── app/
│   ├── page.tsx        # desktop experience
│   ├── m/page.tsx      # mobile experience
│   ├── globals.css     # shared styles
│   └── layout.tsx
├── middleware.ts        # mobile redirect logic
public/
├── gallery/            # photo gallery images
└── avatars/            # avatar assets
```

---

*made with ♡ by jadiha*
