// src/app/layout.tsx
import "./globals.css";
// import localFont from "next/font/local";
import { Navbar } from "@/components/navBar";
import { Footer } from "@/components/footer";

// 1️⃣ Make sure you import localFont
// const cnnSans = localFont({
//   src: [
//     {
//       path: "/fonts/cnn_sans_display.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     // you can list additional weights/formats here
//   ],
//   variable: "--font-sans",
//   display: "swap",
// });

export const metadata = {
  title: "Voices for Peace",
  description: "…",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 2️⃣ Apply the generated CSS variable on <html>
    <html lang="en">
      <body className="flex flex-col min-h-screen font-[var(--font-sans)]">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
