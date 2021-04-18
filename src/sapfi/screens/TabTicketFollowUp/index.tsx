import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  View,
  Label,
} from "native-base";

import styles from "./styles";
import Ticket from "./Ticket";
import FollowUp from "./FollowUp";
import CalledTickets from "./CalledTickets";
import StartFollowUp from "./StartFollowUp";
import * as Font from "expo-font";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import GetTicketModel from "../../services/Sapfi/Models/Ticket/Get/GetTicketModel";

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

  const handleTicket = (ticket: GetTicketModel) => {
    console.log(">>> handleTicket = (ticket: GetTicketModel)");
    console.log(ticket);
    setTicket(ticket);
  };

  return !isReady ? (
    <Label>Loading...</Label>
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
          <Ticket name="" />
          <FollowUp name="" />
          <CalledTickets name="" />
        </Content>
      )}
    </Container>
  );
}
