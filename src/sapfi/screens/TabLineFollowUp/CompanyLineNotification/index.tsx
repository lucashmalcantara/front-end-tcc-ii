import React, { useContext, useState } from "react";
import GetCompanyLineModel from "../../../services/Sapfi/Models/Company/Get/GetCompanyLineModels";
import Dialog from "react-native-dialog";
import { showWarningToast } from "../../../components/Toast";
import UserContext from "../../../contexts/User";

export interface Props {
  showDialog: Function;
  lineId: number;
  createCompanyLineNotification: Function;
  show: boolean;
}

const FollowUp: React.FC<Props> = ({ showDialog, createCompanyLineNotification, show, lineId }) => {
  const [visible, setDialog] = useState(show);
  const [number, setNumber] = useState("");
  const { expoPushToken } = useContext(UserContext);

  const handleConfirm = () => {
    if (number != ""){
      setDialog(false);
      createCompanyLineNotification(number, lineId, expoPushToken);
    }
    else{
      showWarningToast("Por favor, insira um valor válido!")
    }
  }

  const handleCancel = () => {
    showDialog(false);
    setNumber("");
  };

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Criar alerta</Dialog.Title>
      <Dialog.Description>
        Você será alertado de acordo com a condição abaixo
</Dialog.Description>
      <Dialog.Input placeholder="Quantidade de pessoas"
        keyboardType="numeric"
        onChangeText={setNumber}
        value={number}></Dialog.Input>
      <Dialog.Button label="Cancelar" onPress={handleCancel} />
      <Dialog.Button label="Confirmar" onPress={handleConfirm} />
    </Dialog.Container>
  );
};

export default FollowUp;
