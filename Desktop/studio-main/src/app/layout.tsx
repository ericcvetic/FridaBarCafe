import type {Metadata} from 'next';
import { Inter, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'Frida Bar Cafe',
  description: 'Las mejores hamburguesas de la ciudad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Dancing+Script:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${dancingScript.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
