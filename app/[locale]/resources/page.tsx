import { getTranslations } from 'next-intl/server';

export default async function ResourcesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('resources');

  const categories = [
    { key: 'manuals', icon: '📘', color: 'from-blue-500 to-blue-600' },
    { key: 'stem', icon: '🔬', color: 'from-purple-500 to-purple-600' },
    { key: 'cad', icon: '🛠️', color: 'from-orange-500 to-orange-600' },
    { key: 'hydrodynamics', icon: '🌊', color: 'from-cyan-500 to-cyan-600' },
    { key: 'safety', icon: '🛡️', color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.key}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center text-3xl mb-4`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                {t(`categories.${category.key}.title`)}
              </h2>
              <p className="text-gray-600 mb-4">
                {t(`categories.${category.key}.description`)}
              </p>
              <button className="text-ocean-600 font-semibold hover:text-ocean-700 transition-colors">
                View Resources →
              </button>
            </div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Resource Links</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">SeaPerch Official Website</h3>
              <p className="text-gray-600 text-sm mb-2">Official SeaPerch competition resources and documentation</p>
              <a href="https://www.seaperch.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Visit Site →
              </a>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">STEM Education Resources</h3>
              <p className="text-gray-600 text-sm mb-2">Educational materials for robotics and engineering</p>
              <a href="#" className="text-purple-600 hover:underline text-sm">
                View Resources →
              </a>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-1">CAD Software & Tools</h3>
              <p className="text-gray-600 text-sm mb-2">Free and open-source CAD tools for ROV design</p>
              <a href="#" className="text-orange-600 hover:underline text-sm">
                View Tools →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

