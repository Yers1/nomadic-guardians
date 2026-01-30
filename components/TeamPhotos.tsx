'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TeamPhotos() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await fetch('/api/team-photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos || []);
      }
    } catch (error) {
      console.error('Error loading team photos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Фотографии команды / Team Photos / Команда фотосуреттері
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photoUrl, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={photoUrl}
                alt={`Team photo ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

