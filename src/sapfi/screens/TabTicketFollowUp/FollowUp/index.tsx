import React from "react";
import styles from "./styles";

import { Card, CardItem, Text, Body, View } from "native-base";

export interface Props {
  linePosition: number;
  waitingTime: number;
}

const FollowUp: React.FC<Props> = ({ linePosition, waitingTime }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Seu atendimento</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          <View>
            <Text style={styles.ticketIssueDate}>Posição na fila</Text>
            <Text style={styles.ticketNumber}>{linePosition}</Text>
          </View>
          <View>
            <Text style={styles.ticketIssueDate}>Estimativa atendimento</Text>
            <Text style={styles.ticketNumber}>{waitingTime}m</Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export default FollowUp;
