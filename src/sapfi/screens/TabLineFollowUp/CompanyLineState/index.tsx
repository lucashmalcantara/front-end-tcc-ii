import React from "react";
import styles from "./styles";

import { Card, CardItem, Text, Body, View, Label } from "native-base";
import GetCompanyLineModel from "../../../services/Sapfi/Models/Company/Get/GetCompanyLineModels";

export interface Props {
  line: GetCompanyLineModel | undefined;
}

const FollowUp: React.FC<Props> = ({ line }) => {
  return (
    <Card>
      <CardItem header bordered>
        <Text>Situação atual</Text>
      </CardItem>
      <CardItem bordered>
        <Body style={styles.cardBody}>
          {line && (
            <>
              <View>
                <Text style={styles.ticketIssueDate}>Pessoas na fila</Text>
                <Text style={styles.ticketNumber}>{line.numberOfTickets}</Text>
              </View>
              <View>
                <Text style={styles.ticketIssueDate}>
                  Estimativa para atendimento
                </Text>
                <Text style={styles.ticketNumber}>{line.waitingTime}m</Text>
              </View>
            </>
          )}
        </Body>
      </CardItem>
    </Card>
  );
};

export default FollowUp;
