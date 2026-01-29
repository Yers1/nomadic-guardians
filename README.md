# Nomadic Guardians - SeaPerch Team Website

A modern, trilingual (Russian/English/Kazakh) website for the Nomadic Guardians STEM team participating in SeaPerch West Asia 2026 competitions.

## Features

- 🌍 **Trilingual Support**: Russian, English, and Kazakh languages
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional STEM-themed design
- 📝 **Articles System**: Admin functionality for publishing team articles
- 🤖 **Telegram Bot Integration**: Information about the SeaPerch assistant bot
- 📚 **Resources Section**: Categorized educational materials
- 📁 **Files Management**: Required and optional competition documents
- 🔍 **SEO Friendly**: Optimized structure for search engines

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **next-intl** - Internationalization
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── [locale]/          # Localized pages
│   │   ├── page.tsx       # Home page
│   │   ├── articles/      # Articles page
│   │   ├── telegram-bot/  # Telegram bot page
│   │   ├── resources/     # Resources page
│   │   ├── files/         # Files page
│   │   └── layout.tsx     # Layout with navigation
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Footer component
│   └── ArticleCard.tsx    # Article card component
├── messages/              # Translation files
│   ├── en.json           # English translations
│   ├── ru.json           # Russian translations
│   └── kz.json           # Kazakh translations
├── i18n.ts               # i18n configuration
└── middleware.ts         # Next.js middleware for routing
```

## Language Support

The website supports three languages:
- **English** (`/en`) - Default
- **Russian** (`/ru`)
- **Kazakh** (`/kz`)

Language switching is available in the navigation bar.

## Pages

1. **Home** - Team introduction, mission, goals, plans, and sponsor information
2. **Articles** - Team-authored articles about engineering solutions and competition preparation
3. **Telegram Bot** - Information about the SeaPerch assistant bot
4. **Resources** - Educational materials categorized by topic
5. **Files** - Competition documents (Required and Optional sections)

## Customization

### Adding Translations

Edit the JSON files in the `messages/` directory to add or modify translations.

### Styling

The project uses Tailwind CSS. Customize colors and themes in `tailwind.config.js`.

### Adding Content

- **Articles**: Add articles in the `app/[locale]/articles/page.tsx` file (or connect to a CMS)
- **Resources**: Update the resources section in `app/[locale]/resources/page.tsx`
- **Files**: Modify the files section in `app/[locale]/files/page.tsx`

## Contact

- **Email**: nomadic.guardiansbtcs@gmail.com
- **Instagram**: [@nomadic.guardians](https://www.instagram.com/nomadic.guardians/)
- **Location**: Astana, Kazakhstan

## License

This project is created for the Nomadic Guardians team.

