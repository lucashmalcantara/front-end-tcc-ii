import React from "react";
import Dialog from "react-native-dialog";

import { colors } from "../../styles";
import styles from "./styles";

export interface Props {
  handleDialogVisibility(visible: Boolean): void;
  handleConfirm(): void;
  title: string;
  description: string;
  confirmButton: string;
  cancelButton: string;
  visible: boolean;
}

const ModalComponent: React.FC<Props> = ({
  handleDialogVisibility: handleDialogVisibility,
  handleConfirm,
  title,
  description,
  confirmButton,
  cancelButton,
  visible,
}) => {

  const handleCancel = () => {
    handleDialogVisibility(false);
  };

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>
        {description}
      </Dialog.Description>
      <Dialog.Button
        label={cancelButton}
        onPress={handleCancel}
        style={styles.cancelButton}
        color={colors.primary}
      />
      <Dialog.Button
        label={confirmButton}
        onPress={handleConfirm}
        color={colors.primary}
      />
    </Dialog.Container>
  );
};

export default ModalComponent;
