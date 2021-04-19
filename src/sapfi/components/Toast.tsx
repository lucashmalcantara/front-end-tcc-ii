import { Toast } from "native-base";

export const successToast = (text: string, buttonText?: string) =>
  Toast.show({
    text: text,
    buttonText: buttonText,
    textStyle: { color: "green" },
    position: "bottom",
  });

export const errorToast = (text: string, buttonText?: string) =>
  Toast.show({
    text: text,
    buttonText: buttonText,
    textStyle: { color: "red" },
    position: "bottom",
  });
