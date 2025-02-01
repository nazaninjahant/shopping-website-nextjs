import type { Metadata } from "next";
import "./globals.css";
import ThemePrivider from "@/providers/ThemePrivider";

export const metadata: Metadata = {
  title: "Shopping with NextJs",
  description: "An e-commerce website build with NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemePrivider>{children}</ThemePrivider>
      </body>
    </html>
  );
}
