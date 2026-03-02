

# Omarchy Linux Desktop Portfolio — Implementation Plan

## Overview
A developer portfolio that looks and behaves like a Linux desktop environment in the browser. Dark matte aesthetic with neon accents, draggable windows, an interactive dock, a fake terminal, and all content driven by JSON config files.

## Design System
- **Background:** Deep matte dark (#0b0f10)
- **Panels:** Matte black with glassmorphism (#111617)
- **Accents:** Terminal green (#00ff9c), neon blue (#00c8ff), subtle purple (#8b5cf6)
- **Typography:** JetBrains Mono for headings/code, Inter for body text
- **Effects:** Glass blur panels, thin white/10 borders, soft glow on hover, smooth Framer Motion animations throughout

## JSON Config Files (in /src/config/)
All site content is loaded from these JSON files — edit JSON, site updates:
- **profile.json** — Name, role, tagline, avatar, bio, stats, resume link
- **projects.json** — Project cards with title, description, tech stack, links, thumbnail
- **skills.json** — Categorized skills (languages, frameworks, tools, DevOps) with proficiency levels
- **experience.json** — Work history with company, role, duration, achievements
- **socials.json** — Social links (GitHub, LinkedIn, email, etc.)
- **theme.json** — Accent color, background, fonts, glow intensity, window opacity

## Desktop Environment

### 1. Top System Bar
- Left: `$ whoami` logo text + nav shortcuts
- Center: Live clock + active window title
- Right: WiFi icon, battery icon, theme toggle, power button (opens contact)

### 2. Bottom Dock
- MacOS/Linux hybrid dock with icons: About, Projects, Skills, Experience, Blog, Terminal, Contact
- Hover: icons scale up with glow + tooltip
- Click: opens the corresponding draggable window

### 3. Hero / Desktop Wallpaper
- Animated gradient mesh background with floating particles
- Typing animation: "Booting portfolio…" → "Loading developer profile…" → name & role
- Avatar display + resume download button
- Blinking cursor effect

## Window System (Draggable, Reusable)
Each "app" opens as a draggable, resizable window with:
- Title bar with minimize/maximize/close buttons (red/yellow/green dots)
- Glassmorphism styling
- Open/close animations via Framer Motion

### Window Apps:
1. **About** — Bio, tech stack icon grid, stats cards (years experience, projects, commits)
2. **Projects** — Grid of project cards from JSON with thumbnails, tech badges, links, hover glow effects
3. **Skills** — Categorized skill sections with animated progress bars and skill badge cloud
4. **Experience** — Vertical glowing timeline with company, role, duration, and achievements
5. **Terminal** — Interactive fake terminal supporting commands: `help`, `about`, `skills`, `projects`, `experience`, `contact`, `clear`, `theme`. Typing animation + blinking cursor
6. **Contact** — Terminal-styled form with name/email/message fields, send button, copy email, social links

## Animations (Framer Motion)
- Window open/close (scale + fade)
- Dock icon magnification on hover
- Typing text animations in hero and terminal
- Card hover elevation + glow
- Page/section transitions
- Particle effects on wallpaper

## Responsive Design
- Desktop: full desktop OS experience with dock + draggable windows
- Tablet/Mobile: windows become full-screen modals, dock becomes a bottom nav bar, system bar simplifies

## Key Technical Decisions
- **Framer Motion** will be added for all animations
- **No backend** — purely static, all content from JSON imports
- **Theme engine** reads theme.json and applies CSS variables dynamically
- **Window manager** hook tracks open/closed/minimized/focused state for all windows

