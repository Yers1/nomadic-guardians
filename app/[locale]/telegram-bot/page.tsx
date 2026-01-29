/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from 'next-intl/server';


export default async function TelegramBotPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('telegramBot');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-ocean-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-500 rounded-full p-4 mb-6">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.327 0-.618.236-.618.563v1.125c0 .327.291.563.618.563.327 0 .618-.236.618-.563V8.724c0-.327-.291-.563-.618-.563zm-11.124 0c-.327 0-.618.236-.618.563v1.125c0 .327.291.563.618.563.327 0 .618-.236.618-.563V8.724c0-.327-.291-.563-.618-.563zM12 5.25c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75S15.722 5.25 12 5.25zm0 11.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"/>
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('features.title')}</h2>
          <ul className="space-y-4">
            {(t.raw('features.items') as string[]).map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Example Questions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('examples.title')}</h2>
          <div className="space-y-3">
            {(t.raw('examples.items') as string[]).map((question, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-700">{question}</p>

              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="https://t.me/your_bot_username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.327 0-.618.236-.618.563v1.125c0 .327.291.563.618.563.327 0 .618-.236.618-.563V8.724c0-.327-.291-.563-.618-.563zm-11.124 0c-.327 0-.618.236-.618.563v1.125c0 .327.291.563.618.563.327 0 .618-.236.618-.563V8.724c0-.327-.291-.563-.618-.563zM12 5.25c-3.722 0-6.75 3.028-6.75 6.75s3.028 6.75 6.75 6.75 6.75-3.028 6.75-6.75S15.722 5.25 12 5.25zm0 11.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"/>
            </svg>
            <span>{t('openBot')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

