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

const FollowUp: React.FC<Props> = ({ name }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Seu atendimento</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          <View>
            <Text style={styles.ticketIssueDate}>Posição na fila</Text>
            <Text style={styles.ticketNumber}>6</Text>
          </View>
          <View>
            <Text style={styles.ticketIssueDate}>Estimativa atendimento</Text>
            <Text style={styles.ticketNumber}>15m</Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default FollowUp;
