"use client";
import React from "react";
import classes from "../styles/add-transaction.module.css";
import { createTransaction } from "../../libs/requests";
import { useAppContext } from "../../AppContext";
import { useTranslations } from "next-intl";
import Alert from "../../alert";
import useFormMessage from "../../hooks/useFormMessage";

export default function AddTransaction() {
  const t = useTranslations("Home");
  const globalState = useAppContext();
  const [name, setName] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const { message, type, showMessage, clearMessage } = useFormMessage();
  const [loading, setLoading] = React.useState(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !amount || !startDate) {
      showMessage(t("pleaseFillAllFields"), "error");
      return;
    }

    if (isNaN(parseFloat(amount))) {
      showMessage(t("amountMustBeNumber"), "error");
      return;
    }
    clearMessage();

    try {
      const transaction = await createTransaction(
        name,
        parseFloat(amount),
        new Date(startDate),
        globalState?.auth?.token
      );

      globalState?.addTransaction(transaction);

      showMessage(t("transactionAddedSuccessfully"), "success");

      setName("");
      setAmount("");
      setStartDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      showMessage(
        t("errorAddingTransaction") || "Error adding transaction",
        "error"
      );
    }
  };

  return (
    <form className={classes["transaction-form"]} onSubmit={onSubmit}>
      {message && (
        <Alert
          message={message}
          type={type ?? "error"}
          onClose={clearMessage}
        />
      )}
      <div>
        <label htmlFor="text" className={classes["form-label"]}>
          {t("name")}
        </label>
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          id="text"
          placeholder={t("enterName")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {t("amount")}
        </label>
        <input
          value={amount}
          onChange={handleChangeAmount}
          type="text"
          id="amount"
          placeholder={t("enterAmount")}
          className={classes["form-input"]}
        />
        <small className={classes["amount-hint"]}>
          💡 {t("expenseHint", { sign: "-" })}
        </small>
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {t("startDate")}
        </label>
        <input
          value={startDate}
          onChange={handleChangeStartDate}
          type="date"
          id="start-date"
          className={classes["form-input"]}
        />
      </div>

      <button>{t("addTransaction")}</button>
    </form>
  );
}
