"use client";

import React from "react";
import classes from "./register.module.css";
import cashImages from "../assets/cash.png";
import Image from "next/image";
import { register } from "../libs/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../AppContext";
import { useTranslations, useLocale } from "next-intl";
import Loading from "../loading";
import Alert from "../alert";
import useFormMessage from "../hooks/useFormMessage";

export default function RegisterPage() {
  const router = useRouter();
  const globalState = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const locale = useLocale();
  const t = useTranslations("Register");
  const { message, type, showMessage, clearMessage } = useFormMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showMessage(
        locale === "ar"
          ? "كلمة المرور وتأكيد كلمة المرور غير متطابقين"
          : "Password and Confirm Password are not the same",
        "error"
      );
      return;
    }
    setLoading(true);
    clearMessage();
    const response = await register(email, password, username, confirmPassword);
    setLoading(false);
    if (response?.message) {
      showMessage(response.message, "error");
    } else {
      globalState?.authenticate({
        user: response.user,
        token: response.token,
      });
      showMessage(
        locale === "ar" ? "تم التسجيل بنجاح" : "Register Successfully",
        "success"
      );
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
            type={type ?? "error"}
            onClose={clearMessage}
          />
        )}
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <label htmlFor="username">{t("username")}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("confirmPassword")}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={classes["form-group"]}>
            <button type="submit" className={classes["form-button"]}>
              {t("register")}
            </button>
          </div>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              {t("alreadyHaveAccount")}
              <Link href={`/${locale}`} className={classes["form-link"]}>
                {t("login")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}