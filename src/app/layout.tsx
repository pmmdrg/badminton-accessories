'use client';

import ReactQueryProvider from '@/providers/queryProvider';

import '../styles/globals.css';
import { usePathname } from 'next/navigation';
import Header from '@/components/custom/header';
import Footer from '@/components/custom/footer';
import ToastList, { ToastProvider } from '@/components/custom/toast';

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
      <title>Badminton Accessories Shop</title>
      <body>
        <ReactQueryProvider>
          <ToastProvider>
            <ToastList />
            {renderElement()}
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
