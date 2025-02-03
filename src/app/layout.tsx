import type { Metadata } from "next";
import "./globals.css";
import ThemePrivider from "@/providers/ThemePrivider";
import LayoutProvider from "@/providers/LayoutProvider";
import StoreProvider from "@/providers/StoreProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <ThemePrivider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </ThemePrivider>
        </StoreProvider>
      </body>
    </html>
  );
}
