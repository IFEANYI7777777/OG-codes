# Portfolio Builder — Complete Project Documentation

---

## 1. Project Overview

**Name:** Portfolio Builder  
**Type:** Single Page Application (SPA)  
**Purpose:** A professional, futuristic portfolio generator that allows users to create, customize, preview, and export their personal portfolio websites.  

**Core Value Proposition:** Users can build a polished, animated portfolio in minutes through a guided form-based editor with live preview, theme customization, and standalone HTML export — no coding required.

---

## 2. Features

### 2.1 Authentication
- User registration with name, email, and password
- Secure login/logout flow
- Session persistence via browser localStorage
- Protected routes — unauthenticated users are redirected to login

### 2.2 Portfolio Sections (6 Pages)
Each section is a separate routed page:

| Page | Route | Description |
|------|------|-------------|
| Personal Info | `/personal` | Name, title, email, phone, location, website, avatar URL, resume URL, bio |
| Experience | `/experience` | Work history with company, role, dates, description, technology tags |
| Projects | `/projects` | Project showcase with title, description, URL, technology stack, featured flag |
| Skills | `/skills` | Categorized skill groups (e.g., Frontend, Backend, DevOps) |
| Education | `/education` | Academic background with institution, degree, field, years |
| Theme & Settings | `/theme` | Template selection, font family, color customization, spacing, data management |

### 2.3 Live Preview
- Real-time portfolio preview updates as users fill in forms
- Renders all sections: personal header, experience timeline, projects grid, skills cards, education list
- Applies user-selected theme colors, fonts, and spacing

### 2.4 Theme & Customization
- 3 templates: Modern, Classic, Minimal
- 4 font families: Inter, Poppins, Roboto, Open Sans
- Customizable colors: Primary, Secondary, Background, Text
- 3 spacing modes: Compact, Normal, Relaxed

### 2.5 Data Management
- **Export HTML:** Downloads a standalone, self-contained `my-portfolio.html` file with embedded CSS
- **Export JSON:** Saves all portfolio data as `portfolio-data.json` for backup/editing
- **Import JSON:** Restores portfolio data from a JSON file
- **Reset:** Clears all data and returns to default empty state

### 2.6 UI/UX Design
- Dark, futuristic theme with glassmorphism cards
- Facebook-style horizontal top navigation bar
- Responsive design (desktop + mobile hamburger menu)
- 3D perspective hover effects on cards
- Animated gradient backgrounds and floating orbs
- Smooth page transitions using Framer Motion
- Color-coded sections with gradient accents
- Neon glow borders and backdrop blur effects

---

## 3. Tech Stack

### 3.1 Core Technologies
| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.0.0 | UI framework |
| Vite | 5.4.11 | Build tool & dev server |
| JavaScript (ES6+) | — | Primary language (JSX) |
| CSS | — | Styling (Tailwind CSS + custom CSS) |
| HTML | — | Entry point (`index.html`) |

### 3.2 Key Libraries & Dependencies

**UI & Styling:**
- Tailwind CSS 3.4.17 — utility-first CSS framework
- Framer Motion 12.4.7 — animations and page transitions
- Lucide React 0.475.0 — icon library
- clsx 2.1.1 — conditional class names
- tailwind-merge 3.0.1 — merging Tailwind classes

**Forms & Validation:**
- React Hook Form 7.54.2 — form state management
- Zod 3.24.2 — schema validation
- @hookform/resolvers 3.10.0 — Zod resolver for React Hook Form

**Routing:**
- React Router DOM 7.17.0 — client-side routing

**Code Quality:**
- ESLint 10.3.0 — linting
- eslint-plugin-react-hooks 7.1.1 — React hooks rules
- eslint-plugin-react-refresh 0.5.2 — fast refresh safety

---

## 4. Project Structure

```
portfolio-builder/
├── .git/                          # Git repository (auto-created)
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry point with CDN scripts
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── postcss.config.js              # PostCSS config (Tailwind)
├── tailwind.config.js             # Tailwind custom theme config
├── vite.config.js                 # Vite build configuration
├── dist/                          # Production build output
│   ├── index.html
│   └── assets/
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx                   # App entry point
    ├── App.jsx                    # Root component with routing & auth
    ├── App.css                    # Global app styles
    ├── index.css                  # Tailwind directives + custom animations
    ├── assets/                    # Static assets
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   ├── PersonalInfoForm.jsx   # Personal info form fields
    │   ├── ExperienceForm.jsx     # Work experience entries
    │   ├── ProjectsForm.jsx       # Project showcase entries
    │   ├── SkillsForm.jsx         # Skill categories and tags
    │   ├── EducationForm.jsx      # Education entries
    │   ├── ThemeControls.jsx      # Theme customization + export/import
    │   ├── PortfolioPreview.jsx   # Live portfolio preview renderer
    │   └── EditorLayout.jsx       # Editor layout (legacy)
    ├── pages/
    │   ├── PersonalPage.jsx       # Personal info page wrapper
    │   ├── ExperiencePage.jsx     # Experience page wrapper
    │   ├── ProjectsPage.jsx       # Projects page wrapper
    │   ├── SkillsPage.jsx         # Skills page wrapper
    │   ├── EducationPage.jsx      # Education page wrapper
    │   ├── ThemePage.jsx          # Theme & settings page wrapper
    │   ├── LoginPage.jsx          # User login form
    │   ├── RegisterPage.jsx       # User registration form
    │   └── BuilderPage.jsx        # Legacy builder wrapper
    ├── context/
    │   ├── AuthContext.jsx        # Authentication state management
    │   └── PortfolioContext.jsx   # Portfolio data state management
    └── lib/
        ├── schema.js              # Zod validation schemas
        ├── defaultData.js         # Default portfolio template data
        └── utils.js               # Utility functions (cn helper)
```

---

## 5. Data Flow

1. **Auth State:** Managed by `AuthProvider` — stores user session in `localStorage`
2. **Portfolio Data:** Managed by `PortfolioProvider` — stores portfolio data in `localStorage` as `portfolio-data`
3. **Form Updates:** Each form component calls `updatePersonal`, `updateItem`, etc. from context
4. **Live Preview:** `PortfolioPreview` component reads from portfolio context and renders in real-time
5. **Export:** `ThemeControls` generates HTML/JSON files using portfolio data

---

## 6. Theme & Design System

### 6.1 Color Palette (Dark Futuristic)
- **Background:** `#030308` (near black) to `#0f0f1a` (dark blue-gray)
- **Cards:** `rgba(15, 15, 26, 0.6)` with `backdrop-blur-2xl`
- **Borders:** `rgba(255, 255, 255, 0.1)`
- **Primary Accent:** Indigo (`#6366f1`)
- **Secondary Accents:** Purple, Pink, Violet (section-specific)
- **Text:** White and gray-200/300/400 for hierarchy

### 6.2 Typography
- **Primary Font:** Inter (system fallback)
- **Headings:** Gradient text with `bg-clip-text`
- **Monospace:** Not used in final UI

### 6.3 Animations
- Page transitions: Fade in/out + vertical slide
- Card hover: 3D perspective rotation (`rotateX`, `rotateY`)
- Background: Floating blur orbs with `animate-blob`
- Gradients: `animate-gradient-xy` for shifting backgrounds
- Inputs: Focus ring with `focus:ring-2 focus:ring-[color]-400`

---

## 7. How to Use the Application

### 7.1 Local Development
```bash
cd portfolio-builder
npm install
npm run dev
# Open http://localhost:5174
```

### 7.2 Production Build
```bash
npm run build
npm run preview
# Open http://localhost:4173
```

### 7.3 User Flow
1. Open app → redirected to `/login`
2. Click **Create account** → fill name, email, password → submit
3. Auto-redirected to home (`/personal`)
4. Fill in personal details → live preview updates on right
5. Navigate using top bar: Experience, Projects, Skills, Education, Theme
6. On Theme page: customize colors, fonts, spacing
7. Click **Export HTML** to download standalone portfolio file
8. Click **Export JSON** to save data
9. Click **Reset** to clear all data

---

## 8. Deployment Guide

### 8.1 Netlify (Drag & Drop — Fastest)
1. Run `npm run build` in `portfolio-builder`
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the entire `dist/` folder onto the page
4. Netlify gives you a live URL instantly

### 8.2 GitHub Pages
1. Push code to GitHub repository
2. Go to repo → Settings → Pages
3. Under **Build and deployment**, select **GitHub Actions**
4. Use this workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./portfolio-builder/dist
```

### 8.3 Vercel
```bash
npm install -g vercel
cd portfolio-builder
vercel
```

---

## 9. Known Limitations & Future Improvements

### Current Limitations
- Auth is localStorage-based (not secure for production)
- No backend database — data does not sync across devices
- No multi-user portfolio sharing
- No real-time collaboration

### Recommended Next Steps for Production
1. **Replace localStorage auth with Supabase Auth or Firebase Auth**
2. **Add PostgreSQL/MongoDB** for persistent portfolio storage per user
3. **Add image upload** for avatars and project images (cloud storage via Supabase Storage or Cloudinary)
4. **Add PDF export** (using `@react-pdf/renderer` or Puppeteer)
5. **Add custom domain support** and analytics
6. **Add email notifications** for password reset
7. **Add portfolio analytics** (views, clicks)

---

## 10. Presentation Notes

### Key Talking Points
- **Fully client-side** — no backend required for the core builder
- **Live preview** as you type
- **Professional UI** with dark futuristic theme, glassmorphism, and 3D effects
- **Export to standalone HTML** — users get a real deployable website
- **Separate routed pages** for each portfolio section
- **Zero-config local auth** for demo/prototype use

### Technologies Highlighted
- React 19 with hooks and context
- Vite for fast HMR and optimized builds
- Tailwind CSS for rapid styling
- Framer Motion for professional animations
- localStorage for instant data persistence

### Demo Flow for Presentation
1. Show login/register flow (30 seconds)
2. Fill personal info → preview updates live (1 minute)
3. Navigate through Experience, Projects, Skills, Education (1 minute)
4. Change theme colors and font in Theme settings (30 seconds)
5. Click **Export HTML** → show the downloaded file opening in browser (1 minute)
6. Quick look at the responsive mobile design (30 seconds)

---

## 11. Quick Reference

### Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

### Environment Variables
The app currently runs without environment variables (localStorage-based auth).
If you integrate Firebase/Supabase later, add these to a `.env` file:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

*Documentation generated on 2026-06-23*  
*Project built with React + Vite + Tailwind CSS*
