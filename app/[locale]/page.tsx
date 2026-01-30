import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import SponsorSection from '@/components/SponsorSection';
import TeamPhotos from '@/components/TeamPhotos';

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-600 via-primary-600 to-ocean-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-2xl sm:text-3xl mb-6 text-ocean-100">
              {t('subtitle')}
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold mb-8">
              {t('status')}
            </div>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-100">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Goals, Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-ocean-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">{t('mission.title')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('mission.content')}</p>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">{t('goals.title')}</h2>
            <ul className="space-y-2 text-gray-600">
              {(t.raw('goals.items') as string[]).map((goal, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-ocean-500 mr-2">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">{t('plans.title')}</h2>
            <ul className="space-y-2 text-gray-600">
              {(t.raw('plans.items') as string[]).map((plan, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <SponsorSection />

      {/* Team Photos */}
      <TeamPhotos />

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">{t('quickLinks.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={`/${locale}/articles`}
            className="bg-gradient-to-br from-ocean-500 to-ocean-600 text-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-3">📝</div>
            <div className="font-semibold text-lg">{t('quickLinks.articles')}</div>
          </Link>
          <Link
            href={`/${locale}/resources`}
            className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-3">📚</div>
            <div className="font-semibold text-lg">{t('quickLinks.resources')}</div>
          </Link>
          <Link
            href={`/${locale}/files`}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-3">📁</div>
            <div className="font-semibold text-lg">{t('quickLinks.files')}</div>
          </Link>
          <Link
            href={`/${locale}/telegram-bot`}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-3">🤖</div>
            <div className="font-semibold text-lg">{t('quickLinks.telegramBot')}</div>
          </Link>
        </div>
      </section>
    </div>
  );
}

