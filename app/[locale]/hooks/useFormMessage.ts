import React from "react";

export default function useFormMessage() {
  const [message, setMessage] = React.useState<string | null>(null);
  const [type, setType] = React.useState<"success" | "error" | null>(null);

  const showMessage = (text: string, messageType: "success" | "error") => {
    setMessage(text);
    setType(messageType);
  };

  const clearMessage = () => {
    setMessage(null);
    setType(null);
  };

  return { message, type, showMessage, clearMessage };
}