import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Planner",
  description: "Plan and track your learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <div className="flex min-h-screen">
          <div className="hidden w-60 shrink-0 md:block">
            <Sidebar />
          </div>
          <div className="flex min-h-screen flex-1 flex-col bg-slate-900/80">
            <Header />
            <main className="flex-1 px-4 pb-6 pt-4 md:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
