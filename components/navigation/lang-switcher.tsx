'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const LangSwitcher = ({ locale }: { locale: string }) => {
  // Only two languages are supported
  const targetLanguage = locale === 'en' ? 'de' : 'en';
  const pathname = usePathname();

  const redirectTarget = () => {
    if (!pathname) {
      return '/';
    } else {
      const segments = pathname.split('/');
      segments[1] = targetLanguage;
      return segments.join('/');
    }
  };

  return (
    <Link className='flex items-center gap-1 font-semibold' locale={targetLanguage} href={redirectTarget()}>
      <span>{targetLanguage === 'en' ? '🇬🇧' : '🇩🇪'}</span>
      {targetLanguage.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
