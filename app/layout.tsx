import type { Metadata } from "next";
import "../assets/globals.css";

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Expense tracker is a tool designed to help track financial transactions',
  keywords: "expense Expense tracker Tracker financial transactions transaction",
  authors: [
    {
      name: "Saadaoui Mahmoud",
    },
  ],
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
