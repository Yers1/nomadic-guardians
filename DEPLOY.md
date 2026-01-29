# Инструкция по деплою сайта

## Вариант 1: Vercel (Рекомендуется) - БЕСПЛАТНО

Vercel создан командой Next.js и идеально подходит для деплоя.

### Шаги:

1. **Создайте аккаунт на Vercel:**
   - Перейдите на https://vercel.com
   - Зарегистрируйтесь через GitHub (рекомендуется)

2. **Подготовьте проект для GitHub:**
   ```bash
   # Инициализируйте git (если еще не сделано)
   git init
   
   # Добавьте все файлы
   git add .
   
   # Создайте первый коммит
   git commit -m "Initial commit"
   ```

3. **Создайте репозиторий на GitHub:**
   - Перейдите на https://github.com
   - Создайте новый репозиторий (например, `nomadic-guardians`)
   - НЕ добавляйте README, .gitignore или лицензию
   - Скопируйте URL репозитория

4. **Загрузите код на GitHub:**
   ```bash
   # Добавьте remote репозиторий
   git remote add origin https://github.com/ВАШ_USERNAME/nomadic-guardians.git
   
   # Загрузите код
   git branch -M main
   git push -u origin main
   ```

5. **Деплой на Vercel:**
   - Перейдите на https://vercel.com/new
   - Нажмите "Import Git Repository"
   - Выберите ваш репозиторий
   - Vercel автоматически определит Next.js
   - Нажмите "Deploy"
   - Готово! Сайт будет доступен по адресу типа `nomadic-guardians.vercel.app`

### Важные настройки для Vercel:

- **Environment Variables** (если нужны): Settings → Environment Variables
- **Custom Domain** (опционально): Settings → Domains

---

## Вариант 2: Netlify - БЕСПЛАТНО

### Шаги:

1. **Создайте аккаунт на Netlify:**
   - https://www.netlify.com
   - Зарегистрируйтесь через GitHub

2. **Подготовьте проект:**
   - Убедитесь, что код на GitHub (см. шаги выше)

3. **Деплой:**
   - Перейдите в Netlify Dashboard
   - Нажмите "Add new site" → "Import an existing project"
   - Выберите GitHub и ваш репозиторий
   - Настройки:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Нажмите "Deploy site"

---

## Вариант 3: Railway - БЕСПЛАТНО (с ограничениями)

1. Зарегистрируйтесь на https://railway.app
2. Создайте новый проект
3. Подключите GitHub репозиторий
4. Railway автоматически определит Next.js
5. Деплой произойдет автоматически

---

## Вариант 4: Render - БЕСПЛАТНО

1. Зарегистрируйтесь на https://render.com
2. Создайте новый Web Service
3. Подключите GitHub репозиторий
4. Настройки:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Нажмите "Create Web Service"

---

## Важно перед деплоем:

### 1. Обновите next.config.js для production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Для Vercel это не нужно, но для других платформ может понадобиться
  output: 'standalone', // опционально
}

module.exports = nextConfig
```

### 2. Проверьте .gitignore:

Убедитесь, что в `.gitignore` есть:
- `/node_modules`
- `/.next`
- `/data` (ваши данные спонсоров и файлов)
- `/public/uploads` (загруженные файлы)

### 3. Для production:

- **Данные спонсоров и файлы** будут храниться локально на сервере
- Для production рекомендуется использовать базу данных (например, MongoDB, PostgreSQL) или облачное хранилище (AWS S3, Cloudinary)
- Текущая реализация с файлами работает, но данные не будут сохраняться между деплоями на serverless платформах

### 4. Environment Variables (если нужны):

Если вы добавите переменные окружения, настройте их в панели вашего хостинга:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables

---

## Рекомендация:

**Используйте Vercel** - это самый простой и надежный вариант для Next.js:
- ✅ Бесплатный план с хорошими лимитами
- ✅ Автоматический деплой при push в GitHub
- ✅ SSL сертификаты включены
- ✅ CDN по всему миру
- ✅ Идеальная поддержка Next.js

---

## После деплоя:

1. Сайт будет доступен по адресу типа `ваш-проект.vercel.app`
2. Вы можете добавить свой домен в настройках
3. Каждый push в GitHub автоматически обновит сайт

