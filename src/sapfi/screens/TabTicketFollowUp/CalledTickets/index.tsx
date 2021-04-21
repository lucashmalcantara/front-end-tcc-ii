import React, { useState, useEffect } from "react";
import styles from "./styles";

import { Label, Card, CardItem, Text, Body, View, Spinner } from "native-base";
import moment from "moment";

import GetCalledTicketModel from "../../../services/Sapfi/Models/Ticket/Get/GetCalledTicketModel";
import { colors } from "../../../styles";

export interface Props {
  calledTickets: GetCalledTicketModel[] | undefined;
}

const CalledTickets: React.FC<Props> = ({ calledTickets }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Últimos tickets chamados</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          {calledTickets === undefined && <Spinner color={colors.primary} />}
          {calledTickets && calledTickets.length === 0 && (
            <Label>Nenhum encontrado.</Label>
          )}
          {calledTickets && calledTickets.length > 0 && (
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
