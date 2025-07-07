"use client";

import React from "react";
import classes from "./login.module.css";
import cashImages from "./assets/cash.png";
import Image from "next/image";
import { login } from "./libs/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";
import { useTranslations, useLocale } from "next-intl";
import Loading from "./loading";
import Alert from "./alert";
import useFormMessage from "./hooks/useFormMessage";

export default function LoginPage() {
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();
  const globalState = useAppContext();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { message, type, showMessage, clearMessage } = useFormMessage();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearMessage();

    const response = await login(email, password);

    setLoading(false);

    if (response?.message) {
      const translatedMessage =
        locale === "ar"
          ? response.message === "Invalid credentials"
            ? "بيانات الدخول غير صحيحة"
            : response.message
          : response.message;
      showMessage(translatedMessage, "error");
    } else {
      globalState?.authenticate({
        user: response.user,
        token: response.token,
      });
      const successMessage =
        locale === "ar" ? "تم تسجيل الدخول بنجاح" : "Logged in successfully";
      showMessage(successMessage, "success");
      setTimeout(() => router.push(`/${locale}/home`), 1500);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={classes["login-container"]}>
      <div className={classes["form-container"]}>
        <div className={classes["image-login"]}>
          <Image width={100} height={100} alt="Login Image" src={cashImages} />
        </div>
        <h1 className={classes["form-title"]}>{t("title")}</h1>
        <p className={classes["form-subtitle"]}>{t("description")} </p>

        {message && (
          <Alert
            message={message}
            type={type === "success" ? "success" : "error"}
            onClose={clearMessage}
          />
        )}
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]}>
              {t("login")}
            </button>
          </div>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              {t("dontHaveAccount")}
              <Link
                href={`/${locale}/register`}
                className={classes["form-link"]}
              >
                {t("register")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
