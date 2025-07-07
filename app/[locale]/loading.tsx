"use client";

import React from "react";
import { useLocale } from "next-intl";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  textAlign: "center",
  fontFamily: "sans-serif",
  color: "#4F46E5",
};

const spinnerStyle: React.CSSProperties = {
  width: "50px",
  height: "50px",
  border: "6px solid #e5e7eb",
  borderTopColor: "#4F46E5",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: "1rem",
};

const globalStyle = `
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;

export default function Loading() {
  const locale = useLocale();

  return (
    <>
      <style>{globalStyle}</style>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        <p>{locale === "ar" ? "جاري التحميل..." : "Loading..."}</p>
      </div>
    </>
  );
}