import React from "react";
import styles from "./styles";
import moment from "moment";

import { Card, CardItem, Text, Body } from "native-base";

export interface Props {
  number: string;
  issueDate: Date;
}

const Ticket: React.FC<Props> = ({ number, issueDate }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Seu ticket</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          <Text style={styles.ticketNumber}>{number}</Text>
          <Text style={styles.ticketIssueDate}>
            Data emissão: {moment(issueDate).format("DD/MM HH:mm")}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default Ticket;
