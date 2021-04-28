import React, { useContext, useState } from "react";
import GetCompanyLineModel from "../../../services/Sapfi/Models/Company/Get/GetCompanyLineModels";
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
  handleDialogVisibility(visible: Boolean): void;
  visible: boolean;
  lineId: number;
}

const FollowUp: React.FC<Props> = ({
  handleDialogVisibility: handleDialogVisibility,
  visible,
  lineId,
}) => {
  const [notifyWhen, setNotifyWhen] = useState<string>();
  const { expoPushToken } = useContext(UserContext);

  const createLineFollowUp = (
    notifyWhen: number,
    lineId: number,
    deviceToken: string
  ) => {
    SapfiApi.post("v1/LinesFollowUp", {
      lineId,
      deviceToken,
      notifyWhen,
    })
      .then((response) =>
        showSuccessToast(
          "Você será alertado quando a fila atingir a quantidade de pessoas informada!"
        )
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast("Não foi possível criar o alerta.");
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const handleConfirm = () => {
    if (!notifyWhen) {
      showWarningToast("Por favor, insira um valor válido!");
      return;
    }

    createLineFollowUp(Number.parseInt(notifyWhen), lineId, expoPushToken);
    handleDialogVisibility(false);
  };

  const handleCancel = () => {
    handleDialogVisibility(false);
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
      ></Dialog.Input>
      <Dialog.Button label="Cancelar" onPress={handleCancel} />
      <Dialog.Button
        disabled={!notifyWhen}
        color={notifyWhen ? undefined : colors.gray}
        label="Confirmar"
        onPress={handleConfirm}
      />
    </Dialog.Container>
  );
};

export default FollowUp;
