# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - The site will automatically redirect to `/en` (English)
   - Access other languages: `/ru` (Russian) or `/kz` (Kazakh)

## Project Structure

- **Pages**: All pages are in `app/[locale]/` directory
- **Translations**: Edit JSON files in `messages/` directory
- **Components**: Reusable components in `components/` directory
- **Styles**: Global styles in `app/globals.css`, Tailwind config in `tailwind.config.js`

## Customization

### Adding Content

1. **Articles**: 
   - Currently using mock data in `app/[locale]/articles/page.tsx`
   - To add real articles, connect to a database or CMS
   - Or modify the `mockArticles` array

2. **Resources**:
   - Edit `app/[locale]/resources/page.tsx` to add actual resource links

3. **Files**:
   - Update file upload/download functionality in `app/[locale]/files/page.tsx`
   - Add actual file handling logic

### Telegram Bot Integration

- Update the Telegram bot link in `app/[locale]/telegram-bot/page.tsx`
- Replace `https://t.me/your_bot_username` with your actual bot URL

### Sponsor Section

- Add sponsor logo to `public/` directory
- Update sponsor section in `app/[locale]/page.tsx` to display actual logo

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting** that supports Next.js

Make sure to set up environment variables if needed for production.

