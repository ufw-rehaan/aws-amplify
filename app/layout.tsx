import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuerySure Multi Tenant Checker",
  description: "Testing AWS Amplify Wildcard Subdomains for QuerySure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto bg-purple-50 text-purple-950 font-sans">
        {children}
      </body>
    </html>
  );
}
