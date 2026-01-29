'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface FileData {
  technicalReport: { url: string; name: string };
  teamIntroduction: { url: string; name: string };
  poster: { url: string; name: string };
  outreach: { url: string; name: string };
}

export default function FilesManager() {
  const t = useTranslations('files');
  const [isAdmin, setIsAdmin] = useState(false);
  const [files, setFiles] = useState<FileData>({
    technicalReport: { url: '', name: '' },
    teamIntroduction: { url: '', name: '' },
    poster: { url: '', name: '' },
    outreach: { url: '', name: '' },
  });
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated');
    setIsAdmin(auth === 'true');
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const handleFileUpload = async (fileType: string, file: File) => {
    if (!isAdmin) {
      setError('Только админ может загружать файлы / Only admin can upload files');
      return;
    }

    setUploading(fileType);
    setError('');

    try {
      const formData = new FormData();
      formData.append('fileType', fileType);
      formData.append('file', file);

      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFiles((prev) => ({
          ...prev,
          [fileType]: { url: data.fileUrl, name: data.fileName },
        }));
        alert('Файл загружен / File uploaded');
      } else {
        setError('Ошибка при загрузке / Upload error');
      }
    } catch (error) {
      setError('Ошибка при загрузке / Upload error');
    } finally {
      setUploading(null);
    }
  };

  const FileSection = ({
    fileType,
    title,
    description,
    objective,
    color,
    icon,
  }: {
    fileType: keyof FileData;
    title: string;
    description: string;
    objective?: string;
    color: string;
    icon: React.ReactNode;
  }) => {
    const file = files[fileType];

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mr-4`}>
                {icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                {objective && (
                  <p className="text-sm text-gray-500 mt-1">{objective}</p>
                )}
              </div>
            </div>
            <p className="text-gray-700 mb-4 ml-16">{description}</p>
            
            {file.url ? (
              <div className="ml-16 space-y-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-ocean-500 text-white px-6 py-2 rounded-lg hover:bg-ocean-600 transition-colors"
                >
                  {t('required.technicalReport.download')}: {file.name}
                </a>
                {isAdmin && (
                  <label className="ml-2 inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                    {uploading === fileType ? 'Загрузка...' : 'Изменить / Change'}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          handleFileUpload(fileType, selectedFile);
                        }
                      }}
                      disabled={uploading === fileType}
                    />
                  </label>
                )}
              </div>
            ) : (
              <div className="ml-16">
                {isAdmin ? (
                  <label className="inline-block bg-ocean-500 text-white px-6 py-2 rounded-lg hover:bg-ocean-600 transition-colors cursor-pointer">
                    {uploading === fileType ? 'Загрузка...' : t('required.teamIntroduction.upload')}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          handleFileUpload(fileType, selectedFile);
                        }
                      }}
                      disabled={uploading === fileType}
                    />
                  </label>
                ) : (
                  <p className="text-gray-500">Файл не загружен / File not uploaded</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Required Section */}
      <section className="mb-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <h2 className="text-3xl font-bold text-gray-900">{t('required.title')}</h2>
          <p className="text-gray-600 mt-2">
            These documents are mandatory for competition participation.
          </p>
        </div>

        <div className="space-y-6">
          <FileSection
            fileType="technicalReport"
            title={t('required.technicalReport.title')}
            description={t('required.technicalReport.description')}
            objective={t('required.technicalReport.objective')}
            color="bg-ocean-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />

          <FileSection
            fileType="teamIntroduction"
            title={t('required.teamIntroduction.title')}
            description={t('required.teamIntroduction.description')}
            color="bg-primary-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Optional Section */}
      <section>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
          <h2 className="text-3xl font-bold text-gray-900">{t('optional.title')}</h2>
          <p className="text-gray-600 mt-2">{t('optional.note')}</p>
        </div>

        <div className="space-y-6">
          <FileSection
            fileType="poster"
            title={t('optional.poster.title')}
            description={t('optional.poster.description')}
            color="bg-green-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          <FileSection
            fileType="outreach"
            title={t('optional.outreach.title')}
            description={t('optional.outreach.description')}
            color="bg-purple-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}

