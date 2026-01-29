'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSelector from '@/components/LanguageSelector';

export default function RootPage() {
  const router = useRouter();
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    // Check if language was already selected
    const languageSelected = localStorage.getItem('language-selected');
    const preferredLanguage = localStorage.getItem('preferred-language');
    
    if (languageSelected && preferredLanguage) {
      // Redirect to preferred language
      router.push(`/${preferredLanguage}`);
    } else {
      // Show language selector
      setShowSelector(true);
    }
  }, [router]);

  if (!showSelector) {
    return null; // Will redirect
  }

  return <LanguageSelector />;
}

