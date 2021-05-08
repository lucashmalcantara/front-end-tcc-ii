import React, { useContext, useState } from "react";
import Dialog from "react-native-dialog";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/Toast";
import UserContext from "../../../contexts/User";
import { colors } from "../../../styles";
import SapfiApi from "../../../services/Sapfi/Api";
import { showErrorToastFromHttpResponse } from "../../../helpers/errorToastHelper";

export interface Props {
  createLineFollowUp(
    notifyWhen: number,
    lineId: number,
    deviceToken: string
  ): void;
  cancel(): void;
  visible: boolean;
  lineId: number;
}

const FollowUp: React.FC<Props> = ({
  createLineFollowUp: createLineFollowUp,
  cancel: cancel,
  visible,
  lineId,
}) => {
  const [notifyWhen, setNotifyWhen] = useState<string>();
  const { expoPushToken } = useContext(UserContext);

  const handleConfirm = () => {
    if (!notifyWhen) {
      showWarningToast("Por favor, insira um valor válido!");
      return;
    }

    createLineFollowUp(Number.parseInt(notifyWhen), lineId, expoPushToken);

    setNotifyWhen("");
  };

  const handleCancel = () => {
    cancel();
    setNotifyWhen("");
  };

  const onChangeNotifyWhenInput = (text: string) => {
    const numericRegex = /^([0-9]{1,100})+$/;
    if (!text || numericRegex.test(text)) {
      setNotifyWhen(text);
    }
  };

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Criar alerta</Dialog.Title>
      <Dialog.Description>
        Você será alertado de acordo com a condição abaixo
      </Dialog.Description>
      <Dialog.Input
        placeholder="Quantidade de pessoas"
        keyboardType="numeric"
        onChangeText={onChangeNotifyWhenInput}
        value={notifyWhen}
        autoFocus={true}
      ></Dialog.Input>
      <Dialog.Button
        label="Cancelar"
        onPress={handleCancel}
        color={colors.primary}
      />
      <Dialog.Button
        disabled={!notifyWhen}
        color={notifyWhen ? colors.primary : colors.gray}
        label="Confirmar"
        onPress={handleConfirm}
      />
    </Dialog.Container>
  );
};

export default FollowUp;
