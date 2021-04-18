import React, { Component, useState, useEffect } from "react";
import { Container, Content, View, Label, Spinner } from "native-base";

import styles from "./styles";
import Ticket from "./Ticket";
import FollowUp from "./FollowUp";
import CalledTickets from "./CalledTickets";
import StartFollowUp from "./StartFollowUp";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import GetTicketModel from "../../services/Sapfi/Models/Ticket/Get/GetTicketModel";
import { colors } from "../../styles";

export default function TabTicketFollowUp() {
  const [isReady, setIsReady] = useState(false);
  const [ticket, setTicket] = useState<GetTicketModel>();

  useEffect(() => {
    loadNativeBaseFonts();
  }, []);

  const loadNativeBaseFonts = async () => {
    setIsReady(false);
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setIsReady(true);
  };

  const handleTicket = (ticket: GetTicketModel) => setTicket(ticket);

  return !isReady ? (
    <Spinner color={colors.primary} />
  ) : (
    <Container>
      {!ticket ? (
        <Content padder>
          <View style={styles.containerStartFollowUp}>
            <StartFollowUp handleTicket={handleTicket} />
          </View>
        </Content>
      ) : (
        <Content padder>
          <Ticket number={ticket.number} issueDate={ticket.issueDate} />
          <FollowUp
            linePosition={ticket.linePosition}
            waitingTime={ticket.waitingTime}
          />
          <CalledTickets companyId={ticket.companyId} quantity={3} />
        </Content>
      )}
    </Container>
  );
}
