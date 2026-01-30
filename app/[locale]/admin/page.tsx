'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ADMIN_PASSWORD = 'ramazantop1mentor';

// Force dynamic rendering for admin page
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sponsorData, setSponsorData] = useState({
    name: '',
    description: '',
    logo: null as File | null,
    logoUrl: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Проверяем аутентификацию
    const auth = sessionStorage.getItem('admin-authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadSponsorData();
    }
  }, []);

  const loadSponsorData = async () => {
    try {
      const response = await fetch('/api/sponsor');
      if (response.ok) {
        const data = await response.json();
        setSponsorData(data);
      }
    } catch (error) {
      console.error('Error loading sponsor data:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
      loadSponsorData();
    } else {
      setError('Неверный пароль / Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', sponsorData.name);
      formData.append('description', sponsorData.description);
      if (sponsorData.logo) {
        formData.append('logo', sponsorData.logo);
      }

      const response = await fetch('/api/sponsor', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSponsorData({ ...sponsorData, logoUrl: data.logoUrl });
        alert('Данные спонсора обновлены / Sponsor data updated');
      } else {
        setError('Ошибка при сохранении / Error saving');
      }
    } catch (error) {
      setError('Ошибка при сохранении / Error saving');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль / Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-ocean-500 text-white py-3 rounded-lg font-semibold hover:bg-ocean-600 transition-colors"
            >
              Войти / Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Выйти / Logout
            </button>
          </div>

          {/* Sponsor Management */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Управление спонсором / Sponsor Management
            </h2>
            <form onSubmit={handleSponsorSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название спонсора / Sponsor Name
                </label>
                <input
                  type="text"
                  value={sponsorData.name}
                  onChange={(e) =>
                    setSponsorData({ ...sponsorData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="Введите название спонсора"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание спонсора / Sponsor Description
                </label>
                <textarea
                  value={sponsorData.description}
                  onChange={(e) =>
                    setSponsorData({
                      ...sponsorData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="Введите описание спонсора и его вклад"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Логотип спонсора / Sponsor Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSponsorData({ ...sponsorData, logo: file });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {sponsorData.logoUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Текущий логотип:</p>
                    <Image
                      src={sponsorData.logoUrl}
                      alt="Sponsor logo"
                      width={96}
                      height={96}
                      className="h-24 object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ocean-500 text-white py-3 rounded-lg font-semibold hover:bg-ocean-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Сохранение...' : 'Сохранить / Save'}
              </button>
            </form>
          </section>

          {/* File Management Link */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Управление файлами / File Management
            </h2>
            <p className="text-gray-600 mb-4">
              Для загрузки файлов перейдите на страницу{' '}
              <a
                href="/files"
                className="text-ocean-600 hover:underline font-semibold"
              >
                Файлы / Files
              </a>
              . Там вы сможете загрузить файлы команды.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

