import React, { Component } from "react";
import styles from "./styles";
import moment from "moment";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";

export interface Props {
  ticketNumber: string;
  ticketIssueDate: Date;
}

const Ticket: React.FC<Props> = ({ ticketNumber, ticketIssueDate }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Seu ticket</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          <Text style={styles.ticketNumber}>{ticketNumber}</Text>
          <Text style={styles.ticketIssueDate}>Data emissão: {moment(ticketIssueDate).format('DD/MM HH:mm')}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default Ticket;
