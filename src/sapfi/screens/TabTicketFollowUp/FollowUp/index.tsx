import React from "react";
import styles from "./styles";

import { Card, CardItem, Text, Body, View, Label } from "native-base";
import moment from "moment";

export interface Props {
  linePosition: number;
  waitingTime: number;
  calledAt?: Date;
}

const FollowUp: React.FC<Props> = ({ linePosition, waitingTime, calledAt }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Seu atendimento</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          {!calledAt && (
            <>
              <View>
                <Text style={styles.ticketIssueDate}>Posição na fila</Text>
                <Text style={styles.ticketNumber}>{linePosition}</Text>
              </View>
              <View>
                <Text style={styles.ticketIssueDate}>
                  Estimativa atendimento
                </Text>
                <Text style={styles.ticketNumber}>{waitingTime}m</Text>
              </View>
            </>
          )}
          {calledAt && (
            <View style={styles.ticketAlreadyCalledContainer}>
              <Label>Seu ticket foi chamado em</Label>
              <Label>{moment(calledAt).format("DD/MM/YYYY HH:mm")}</Label>
            </View>
          )}
        </Body>
      </CardItem>
    </Card>
  );
};

export default FollowUp;
