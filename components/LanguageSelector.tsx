'use client';

import { useRouter } from 'next/navigation';

interface LanguageSelectorProps {
  onSelect?: () => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  const router = useRouter();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  ];

  const handleLanguageSelect = (locale: string) => {
    localStorage.setItem('language-selected', 'true');
    localStorage.setItem('preferred-language', locale);
    if (onSelect) {
      onSelect();
    }
    router.push(`/${locale}`);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Выберите язык / Choose Language / Тілді таңдаңыз
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Nomadic Guardians - SeaPerch West Asia 2026
        </p>
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="w-full flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-ocean-500 hover:bg-ocean-50 transition-all transform hover:scale-105"
            >
              <span className="text-4xl">{lang.flag}</span>
              <span className="text-xl font-semibold text-gray-900 flex-1 text-left">
                {lang.name}
              </span>
              <svg
                className="w-6 h-6 text-ocean-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

