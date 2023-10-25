import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

import { cn, constructMetadata } from '@/lib/utils';

import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

const inter = Inter({ subsets: ['latin'], preload: true });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='light'>
      <Providers>
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy',
            inter.className
          )}
        >
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
