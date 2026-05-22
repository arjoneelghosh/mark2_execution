# Arjoneel Ghosh — Portfolio Website

A portfolio website built to present my work, experience, projects, research direction, and technical identity in a structured and interactive format.



## Live Website

[Portfolio](https://arjoneelghoshportfolio.vercel.app/)

## Overview

This project is my personal portfolio system, built to showcase:

- project case studies
- internship experience
- research and lab-style work
- certifications and achievements
- technical stack and development focus
- an interactive chatbot for portfolio-grounded queries


## Features

- Ring-based navigation system for a more distinctive browsing experience
- Dedicated pages for Work, Profile, Experience, Lab, Ask, and Connect
- Project cards with media previews and deeper case-study style content
- Transparent surface styling with particle-field background system
- Dark/light theme support
- Grounded portfolio chatbot for project, skills, and experience queries
- Resume integration
- Responsive portfolio layout with mobile-specific adaptations in progress through branch-based development
- Vercel-ready deployment with SPA route refresh support


## Tech Stack

**Frontend**
- React
- TypeScript
- Vite

**Styling / UI**
- Tailwind CSS
- Custom CSS surface system
- Responsive layout tuning
- Animated particle background

**Content / Structure**
- Local data-driven portfolio content
- Project/media asset pipeline
- Experience and profile data integration

**Assistant Layer**
- Local-first portfolio knowledge routing
- Structured portfolio query handling
- Grounded response design

## Project Structure

```bash
.
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── chat/
│   │   ├── navigation/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json
