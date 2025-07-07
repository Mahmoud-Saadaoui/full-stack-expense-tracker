import "./globals.css";
import { AppProvider } from "./AppContext";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProvider>
            <>
              <div className="main">{children}</div>
              <footer className="footer">
                {new Date().getFullYear()} © Copyright{" "}
                <a
                  href="https://personal-portfolio-six-pearl-25.vercel.app/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Mahmoud Saadaoui
                </a>
              </footer>
            </>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
