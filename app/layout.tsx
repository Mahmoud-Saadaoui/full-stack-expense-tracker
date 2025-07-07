import { ReactNode } from "react";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

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

export default function RootLayout({ children }: Props) {
  return children;
}
