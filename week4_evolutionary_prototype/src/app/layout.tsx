import type { Metadata } from 'next';
import './globals.css';
import { StockProvider } from '../context/StockContext';

export const metadata: Metadata = {
  title: 'StockMate Pro | Enterprise Stock Maintenance System',
  description:
    'Software Engineering Week 4 Evolutionary Prototype. High-precision warehouse inventory management, purchase orders, supplier tracking, and real-time stock telemetry.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0A0D12] text-[#FCFAF7] font-sans antialiased selection:bg-[#D49B37] selection:text-[#0A0D12]">
        <StockProvider>{children}</StockProvider>
      </body>
    </html>
  );
}
