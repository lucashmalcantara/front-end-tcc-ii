import React, { Component } from "react";
import styles from "./styles";

import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Content,
  View,
} from "native-base";

export interface Props {
  name: string;
}

const StartFollowUp: React.FC<Props> = ({ name }) => {
  return (
    <View>
      <View style={styles.containerStartProcess}>
        <Label style={styles.startProcess}>Iniciar acompanhamento</Label>
      </View>
      <Form>
        <Item floatingLabel>
          <Label>Código do restaurante</Label>
          <Input />
        </Item>
        <Item floatingLabel>
          <Label>Número do ticket</Label>
          <Input />
        </Item>
        <Button block primary style={styles.baseMarginTop}>
          <Text>Iniciar</Text>
        </Button>
      </Form>
    </View>
  );
};

export default StartFollowUp;
