'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  topic: string;
  content: string;
}

export default function ArticleCard({ article, locale }: { article: Article; locale: string }) {
  const t = useTranslations('articles');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'kz' ? 'kk-KZ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/${locale}/articles/${article.id}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1 h-full flex flex-col">
        <div className="mb-4">
          <span className="inline-block bg-ocean-100 text-ocean-700 text-xs font-semibold px-3 py-1 rounded-full">
            {t(`topics.${article.topic}`)}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
          <span>{t('author')}: {article.author}</span>
          <span>{formatDate(article.date)}</span>
        </div>
        <div className="mt-4 text-ocean-600 font-semibold">
          {t('readMore')} →
        </div>
      </div>
    </Link>
  );
}

