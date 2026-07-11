import { Inter, Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import BackgroundSystem from "./BackgroundSystem";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import { profile } from "./portfolioData";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: '--font-fira',
  display: 'swap',
});

export const metadata = {
  title: `${profile.fullName} | ${profile.headline}`,
  description: profile.heroSummary,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-color-accent/30 selection:text-color-accent">
        <ThemeProvider>
          <ScrollProgress />
          <BackgroundSystem />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
