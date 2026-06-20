'use client';

import '../styles/globals.css';
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ToastList from '@/components/toast';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPath =
    pathname.endsWith('/login') ||
    pathname.endsWith('/register') ||
    pathname.endsWith('/forgot-password') ||
    pathname.endsWith('/reset-password');

  const isAdminPath = pathname.startsWith('/admin');
  const isManagerPath = pathname.startsWith('/manager');

  const renderElement = (): React.ReactNode => {
    if (isAuthPath || isAdminPath || isManagerPath) return children;

    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  };

  return (
    <html lang='en'>
      <head>
        <title>Badminton Accessories Shop</title>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </head>
      <body>
        <Providers>
          <ToastList />
          {renderElement()}
        </Providers>
      </body>
    </html>
  );
}
