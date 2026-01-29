'use client';

import { useState, useEffect } from 'react';

interface SponsorData {
  name: string;
  description: string;
  logoUrl: string;
}

export default function SponsorSection() {
  const [sponsor, setSponsor] = useState<SponsorData>({
    name: '',
    description: '',
    logoUrl: '',
  });

  useEffect(() => {
    loadSponsor();
  }, []);

  const loadSponsor = async () => {
    try {
      const response = await fetch('/api/sponsor');
      if (response.ok) {
        const data = await response.json();
        setSponsor(data);
      }
    } catch (error) {
      console.error('Error loading sponsor:', error);
    }
  };

  if (!sponsor.name && !sponsor.description && !sponsor.logoUrl) {
    return null; // Don't show if no sponsor data
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
            Our Sponsor / Наш Спонсор / Біздің Демеуші
          </h2>
          {sponsor.name && (
            <h3 className="text-2xl font-semibold mb-4 text-center text-ocean-600">
              {sponsor.name}
            </h3>
          )}
          {sponsor.description && (
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
              {sponsor.description}
            </p>
          )}
          {sponsor.logoUrl && (
            <div className="mt-8 flex justify-center">
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name || 'Sponsor logo'}
                className="max-h-32 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

