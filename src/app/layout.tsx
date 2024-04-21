import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";

import { Sidebar } from "./_components/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sappho and her Finances",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} h-screen w-screen max-w-full`}
        >
          <div className="layer layer-fixed">
            <aside className="layer-drawer flex min-w-72 flex-col bg-primary-base">
              <span
                className="flex flex-col items-center justify-center px-2 pt-5 text-white"
                style={{ fontFamily: "fantasy" }}
              >
                <span className="text-5xl">SAPPHO</span>
                <span className="text-lg tracking-widest">& her Finances</span>
              </span>
              <div className="divider divider-secondary mb-0" />
              <Sidebar />
            </aside>
            <main className="layer-content p-4">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
