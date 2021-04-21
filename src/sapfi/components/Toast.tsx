import { Toast } from "native-base";

export const showSuccessToast = (text: string, buttonText?: string) =>
  Toast.show({
    text: text,
    buttonText: buttonText ?? "OK",
    type: "success",
    position: "bottom",
    duration: 3000,
  });

export const showErrorToast = (text: string, buttonText?: string) =>
  Toast.show({
    text: text,
    buttonText: buttonText ?? "OK",
    type: "danger",
    position: "bottom",
    duration: 3000,
  });
