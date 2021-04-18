import React, { useState, useEffect } from "react";
import styles from "./styles";

import { Label, Card, CardItem, Text, Body, View, Spinner } from "native-base";
import moment from "moment";

import SapfiApi from "../../../services/Sapfi/Api";
import GetCalledTicketModel from "../../../services/Sapfi/Models/Ticket/Get/GetCalledTicketModel";
import { Alert } from "react-native";
import ErrorModel from "../../../services/Sapfi/Models/Core/ErrorModel";
import { colors } from "../../../styles";

export interface Props {
  companyId: number;
  quantity: number;
}

const CalledTickets: React.FC<Props> = ({ companyId, quantity }) => {
  const [isReady, setIsReady] = useState(false);

  const [calledTickets, setCalledTickets] = useState<GetCalledTicketModel[]>(
    []
  );

  useEffect(() => {
    setIsReady(false);
    getTicket(companyId, quantity);
  }, []);

  const getTicket = async (companyId: number, quantity: number) => {
    SapfiApi.get<GetCalledTicketModel[]>("/v1/Tickets/called-tickets/last", {
      params: {
        companyId,
        quantity,
      },
    })
      .then((response) => setCalledTickets(response.data))
      .catch((error) => {
        let errorModel: ErrorModel = error.response.data;
        Alert.alert(errorModel.title, errorModel.message);
      })
      .finally(() => setIsReady(true));
  };

  return (
    <Card>
      <CardItem header bordered>
        <Text>Últimos tickets chamados</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          {!isReady && <Spinner color={colors.primary} />}
          {isReady && calledTickets.length === 0 && (
            <Label>Nenhum encontrado.</Label>
          )}
          {isReady && calledTickets.length > 0 && (
            <>
              {calledTickets.map((calledTicket) => (
                <View key={calledTicket.id} style={styles.cardItemContainer}>
                  <Text style={styles.ticketNumber}>{calledTicket.number}</Text>
                  <Text style={styles.calledAt}>
                    {moment(calledTicket.calledAt).format("DD/MM HH:mm")}
                  </Text>
                </View>
              ))}
            </>
          )}
        </Body>
      </CardItem>
    </Card>
  );
};

export default CalledTickets;
