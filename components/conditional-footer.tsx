'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Footer } from './footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  const { isLoading } = useAuth();
  
  // Don't render footer on login page or during loading states
  if (pathname === '/login' || isLoading) {
    return null;
  }
  
  return <Footer />;
}
