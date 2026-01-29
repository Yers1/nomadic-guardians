# Исправление проблемы с npm

## Проблема
npm не работает из-за отсутствующих файлов в установке Node.js.

## Решение 1: Переустановка Node.js (Рекомендуется)

1. **Скачайте Node.js:**
   - Перейдите на https://nodejs.org/
   - Скачайте LTS версию (рекомендуется)
   - Выберите установщик для Windows (.msi)

2. **Установите Node.js:**
   - Запустите установщик
   - Следуйте инструкциям
   - Убедитесь, что опция "npm package manager" включена

3. **Проверьте установку:**
   ```powershell
   node --version
   npm --version
   ```

4. **Перезапустите терминал** после установки

## Решение 2: Использование nvm-windows (Альтернатива)

Если хотите управлять несколькими версиями Node.js:

1. **Скачайте nvm-windows:**
   - https://github.com/coreybutler/nvm-windows/releases
   - Скачайте `nvm-setup.exe`

2. **Установите nvm-windows**

3. **Установите Node.js через nvm:**
   ```powershell
   nvm install lts
   nvm use lts
   ```

## Решение 3: Временное решение - использование pnpm

Если нужно срочно установить зависимости:

1. **Установите pnpm глобально:**
   ```powershell
   # Через PowerShell (если есть curl)
   iwr https://get.pnpm.io/install.ps1 -useb | iex
   ```

2. **Используйте pnpm вместо npm:**
   ```powershell
   pnpm install
   pnpm dev
   ```

## После исправления

После переустановки Node.js выполните:

```powershell
cd C:\Users\ersul\Desktop\Coursor_sea
npm install
npm run dev
```

## Проверка

Убедитесь, что оба команды работают:
```powershell
node --version  # Должно показать версию (например, v20.x.x)
npm --version   # Должно показать версию (например, 10.x.x)
```

