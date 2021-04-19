import React, { Component, useState, useEffect, useContext } from "react";
import { Container, Content, View, Label, Spinner, Toast } from "native-base";

import styles from "./styles";
import Ticket from "./Ticket";
import FollowUp from "./FollowUp";
import CalledTickets from "./CalledTickets";
import StartFollowUp from "./StartFollowUp";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import GetTicketModel from "../../services/Sapfi/Models/Ticket/Get/GetTicketModel";
import { colors } from "../../styles";
import UserContext from "../../contexts/User";
import SapfiApi from "../../services/Sapfi/Api";
import { errorToast, successToast } from "../../components/Toast";

export default function TabTicketFollowUp() {
  const { expoPushToken } = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);
  const [ticket, setTicket] = useState<GetTicketModel>();

  useEffect(() => {
    loadNativeBaseFonts();
    console.log("expoPushToken: ",expoPushToken);
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

  const handleTicket = (ticket: GetTicketModel) => {
    setTicket(ticket);
    createTicketFollowUp(ticket.id, expoPushToken);
  };

  const createTicketFollowUp = (ticketId: number, deviceToken: string) => {
    SapfiApi.post("v1/TicketsFollowUp", {
      ticketId,
      deviceToken,
    })
      .then((response) =>
        successToast("Você será alertado quando sua vez estiver próxima!")
      )
      .catch((error) => {
        errorToast("Não foi possível criar o alerta.");
      });
  };

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
