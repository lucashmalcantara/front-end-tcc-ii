import React, { Component } from "react";
import styles from "./styles";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  View,
} from "native-base";

export interface Props {
  name: string;
}

const CalledTickets: React.FC<Props> = ({ name }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Senhas chamadas</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          <View style={styles.cardItemContainer}>
            <Text style={styles.ticketNumber}>A020</Text>
            <Text style={styles.calledAt}>11/04/2021 20:56</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Text style={styles.ticketNumber}>A020</Text>
            <Text style={styles.calledAt}>11/04/2021 20:56</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Text style={styles.ticketNumber}>A020</Text>
            <Text style={styles.calledAt}>11/04/2021 20:56</Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default CalledTickets;
