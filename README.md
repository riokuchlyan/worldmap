# WOR(L)D MAP

**News redefined.** A modern interactive web application that visualizes world news through an immersive map-based interface with smooth scroll animations and dynamic word clouds.

## Purpose

WOR(L)D MAP reimagines how we consume global news by presenting information through:
- **Interactive world map visualization** - Navigate news geographically 
- **Dynamic word clouds** - See trending topics and keywords from global news
- **Immersive scroll experiences** - Modern parallax and zoom effects that bring data to life
- **Responsive design** - Optimized for all devices with beautiful typography

## Technologies Used

### Frontend Framework
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development

### Styling & Design
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **Custom monospace typography** - Nothing OS inspired font stack

### Animations & Interactions
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
  - Scroll-triggered animations
  - Linear zoom effects
  - Smooth opacity transitions
  - Advanced scroll progress tracking

### Data Visualization
- **[D3.js](https://d3js.org)** - Powerful data visualization library
- **[d3-cloud](https://github.com/jasondavies/d3-cloud)** - Word cloud layouts
- **SVG rendering** - Scalable vector graphics for crisp visuals

### Development Tools
- **[ESLint](https://eslint.org)** - Code linting and formatting
- **[PostCSS](https://postcss.org)** - CSS processing
- **SCSS Modules** - Component-scoped styling

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
worldmap/
├── src/app/
│   ├── components/     # Reusable UI components
│   ├── globals.css     # Global styles and typography
│   ├── layout.tsx      # Root layout with font setup
│   └── page.tsx        # Main page with scroll animations
├── public/             # Static assets (images, icons)
└── package.json        # Dependencies and scripts
```

## Features

- **Scroll-based zoom animations** - Word clouds that scale with scroll position
- **Content fade transitions** - Text disappears elegantly during scroll
- **Responsive word cloud generation** - Dynamic sizing based on word frequency
- **Modern UI/UX** - Clean design with smooth interactions
- **Type-safe development** - Full TypeScript support

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

```bash
npm run build
npm start
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more deployment options.

---

Built using modern web technologies to create immersive news experiences.
