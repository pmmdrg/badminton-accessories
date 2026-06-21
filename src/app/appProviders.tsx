import ReactQueryProvider from '@/providers/queryProvider';
import { ToastProvider } from '@/providers/toastProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <ToastProvider>{children}</ToastProvider>
      </GoogleOAuthProvider>
    </ReactQueryProvider>
  );
}
