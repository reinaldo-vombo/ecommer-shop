import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { Toaster } from "sonner";
import SessionWrapper from "@/provider/SessionWrapper";

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME, AUTHOR_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC
  ? `https://${process.env.NEXT_PUBLIC}`
  : 'http://localhost:3000';
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_CREATOR,
      site: TWITTER_SITE
    }
  }),
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  applicationName: 'Redxp',
  description: 'Em vez de ir aos shoppings locais para fazer compras, cada vez mais pessoas estão usando a variedade de produtos on-line.',
  authors: {
    name: AUTHOR_NAME,
    url: 'https://github.com/reinaldo-vombo'
  },
  keywords: ['Nike', 'Converse', 'E-commerce', 'Online store',],
  creator: 'Reinaldo Vombo',
  publisher: 'Reinaldo Vombo',
  alternates: {
    canonical: '/',
    languages: {
      'pt': '/pt-PT'
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${GeistSans.variable} antialiased`}
        >
          {children}
          <Toaster
            richColors
            position="bottom-right"
          />
        </body>
      </html>
    </SessionWrapper>
  );
}
