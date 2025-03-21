import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Karla, Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-mono",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Portal - Hackathons at Berkeley",
  description: "A portal for Hackathons at Berkeley",
  openGraph: {
    title: "Portal - Hackathons at Berkeley",
    description: "A portal for Hackathons at Berkeley",
    images: ["https://calhacks-sierra.s3-us-west-2.amazonaws.com/assets/branding/og-image.jpg"],
  },
  icons: {
    icon: "/baby-ddoski.svg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@calhacks",
    creator: "@calhacks",
    images: ["https://calhacks-sierra.s3-us-west-2.amazonaws.com/assets/branding/og-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${karla.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <div className="max-w-screen-xl mx-auto">
              {children}
            </div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
