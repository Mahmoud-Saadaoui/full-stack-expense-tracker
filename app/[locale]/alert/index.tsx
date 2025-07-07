"use client";

import React from "react";
import styles from "./alert.module.css";

type AlertProps = {
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
};

export default function Alert({
  message,
  type = "error",
  onClose,
}: AlertProps) {
  return (
    <div
      className={`${styles.alert} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      <div className={styles.contentWrapper}>
        <span className={styles.message}>{message}</span>
        {onClose && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
