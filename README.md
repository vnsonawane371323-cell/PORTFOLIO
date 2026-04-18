# Vedant Sonawane — Portfolio v2

A high-end dark portfolio built with React + Vite, Framer Motion, GSAP, Three.js, and Lenis.

---

## 🚀 Setup (5 steps)

### 1. Install dependencies
```bash
npm install
```

### 2. Add your photo
Replace `src/assets/photo.svg` with your actual photo file.
Make sure the filename matches exactly: `photo.svg`

### 3. Update your links
Open `src/components/sections/Contact.jsx` and update the socials array with your real LinkedIn, GitHub, and email links.

### 4. Run dev server
```bash
npm run dev
```
Open http://localhost:5173

### 5. Build for production
```bash
npm run build
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── Cursor.jsx / .css       — Custom cursor
│   ├── Navbar.jsx / .css       — Fixed navbar
│   ├── Loader.jsx / .css       — Animated preloader
│   ├── Footer.jsx / .css       — Footer
│   └── sections/
│       ├── Hero.jsx / .css     — Hero with photo card
│       ├── About.jsx / .css    — About me
│       ├── Skills.jsx / .css   — Bento skills grid
│       ├── Projects.jsx / .css — Project cards
│       ├── Experience.jsx / .css — Timeline
│       ├── Achievements.jsx / .css — Achievements + confetti
│       ├── Certifications.jsx / .css — 3D tilt cards
│       └── Contact.jsx / .css  — Contact form
├── canvas/
│   └── ParticleField.jsx      — Animated particle background
├── hooks/
│   ├── useCursor.js
│   ├── useScrollReveal.js
│   └── useMagnet.js           — Magnetic button effect
├── data/
│   └── index.js               — All your portfolio content
├── assets/
│   └── photo.svg              — YOUR PHOTO GOES HERE
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🎨 Customization

All your data lives in **`src/data/index.js`** — edit projects, skills, experience, achievements, certifications there.

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

---

## ✨ Features

- 🌌 Animated particle network background
- 🖱️ Custom magnetic cursor with hover states
- 🎬 Cinematic preloader with VS animation
- 📱 Fully responsive
- 🏆 Confetti burst on Achievements section scroll
- 🃏 3D tilt certification cards
- ⚡ Smooth Lenis scroll
- 🎭 Framer Motion page & scroll animations
