import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yaswanth Kumar Sirimella — Embedded Software Engineer',
  description:
    'Personal portfolio of Yaswanth Kumar Sirimella. Automotive Embedded SW Test Automation Engineer specializing in C++, Python, sensor log parsing, and safety-critical software.',
  keywords: [
    'Yaswanth Kumar Sirimella',
    'Yaswanth Sirimella',
    'Embedded Software Engineer',
    'Automotive Engineer',
    'C++',
    'Python',
    'Sensor Logs',
    'ISTQB AI Testing',
  ],
  authors: [{ name: 'Yaswanth Kumar Sirimella' }],
  openGraph: {
    title: 'Yaswanth Kumar Sirimella — Embedded Software Engineer Portfolio',
    description:
      'Automotive Embedded Systems Engineer specializing in C++, Python, sensor log parsing, and ASTQB/ISTQB AI Testing.',
    url: 'https://yaswanthkumaryadav.github.io/My-Portifolio/',
    siteName: 'Yaswanth Kumar Sirimella Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} font-mono h-full w-full m-0 p-0`}>
      <body className="antialiased bg-white text-gray-900 selection:bg-teal-100 selection:text-teal-900 w-full min-h-screen m-0 p-0">
        <main className="w-full min-h-screen relative">{children}</main>
      </body>
    </html>
  );
}
