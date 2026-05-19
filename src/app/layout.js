import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quaid-e-Millat School - Management System",
  description: "Quaid-e-Millat Public Boys High School Management System",
};

import { ThemeLangProvider } from "@/context/ThemeLangContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeLangProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeLangProvider>
      </body>
    </html>
  );
}
