import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wildcard Subdomain Test",
  description: "Testing AWS Amplify Wildcard Subdomains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
