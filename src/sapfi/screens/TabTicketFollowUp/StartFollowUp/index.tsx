import React, { useState } from "react";
import styles from "./styles";
import SapfiApi from "../../../services/Sapfi/Api";
import { Form, Item, Input, Label, Button, Text, View } from "native-base";
import GetTicketModel from "../../../services/Sapfi/Models/Ticket/Get/GetTicketModel";
import { Alert } from "react-native";
import { showErrorToast } from "../../../components/Toast";
import { showErrorToastFromHttpResponse } from "../../../helpers/errorToastHelper";

export interface Props {
  handleTicket: Function;
}

const StartFollowUp: React.FC<Props> = ({ handleTicket }) => {
  const [friendlyHumanCompanyCode, setFriendlyHumanCompanyCode] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");

  const getTicket = async (
    friendlyHumanCompanyCode: string,
    number: string
  ) => {
    SapfiApi.get<GetTicketModel>("/v1/Tickets", {
      params: {
        friendlyHumanCompanyCode,
        number,
      },
    })
      .then((response) =>
        response.status === 204
          ? Alert.alert(
              "Ticket não encontrado",
              "Verifique os dados inseridos e tente novamente!"
            )
          : handleTicket(response.data)
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  return (
    <View>
      <View style={styles.containerStartProcess}>
        <Label style={styles.startProcess}>Iniciar acompanhamento</Label>
      </View>
      <Form>
        <Item floatingLabel>
          <Label>Código do estabelecimento</Label>
          <Input
            autoCapitalize="characters"
            value={friendlyHumanCompanyCode}
            onChangeText={(value) => setFriendlyHumanCompanyCode(value)}
          />
        </Item>
        <Item floatingLabel>
          <Label>Número do ticket</Label>
          <Input
            autoCapitalize="characters"
            value={ticketNumber}
            onChangeText={(value) => setTicketNumber(value)}
          />
        </Item>
        <Button
          block
          primary
          style={styles.baseMarginTop}
          onPress={() => getTicket(friendlyHumanCompanyCode, ticketNumber)}
        >
          <Text>Iniciar</Text>
        </Button>
      </Form>
    </View>
  );
};

export default StartFollowUp;
