import { getTranslations } from 'next-intl/server';
import ArticleCard from '@/components/ArticleCard';

// This would typically come from a database or CMS
// For now, using mock data
const mockArticles = [
  {
    id: 1,
    title: 'Designing Our SeaPerch ROV: Engineering Challenges',
    author: 'Team Nomadic Guardians',
    date: '2026-01-15',
    excerpt: 'An in-depth look at the engineering decisions behind our ROV design...',
    topic: 'engineering',
    content: 'Full article content would go here...'
  },
  // Add more articles as needed
];

export default async function ArticlesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('articles');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        {mockArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t('noArticles')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        )}

        {/* Admin Section - would be conditionally rendered based on auth */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Admin Panel</h2>
          <p className="text-gray-600 mb-4">
            Admin functionality for publishing articles will be implemented here.
          </p>
          <button className="bg-ocean-500 text-white px-6 py-2 rounded-lg hover:bg-ocean-600 transition-colors">
            Add New Article
          </button>
        </div>
      </div>
    </div>
  );
}

