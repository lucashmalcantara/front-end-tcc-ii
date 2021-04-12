import React, { Component } from "react";
import styles from './styles';

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
  name: string;
}

const Ticket: React.FC<Props> = ({ name }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Sua senha</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          <Text style={styles.ticketNumber}>A020</Text>
          <Text style={styles.ticketIssueDate}>11/04/2021 20:56</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default Ticket;
