import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";

import styles from "./styles";
import Ticket from "./Ticket";
import FollowUp from "./FollowUp";
import CalledTickets from "./CalledTickets";

export default function TabTicketFollowUp() {
  return (
    <Container>
      <Content padder>
      <Ticket name=""/>
      <FollowUp name=""/>
      <CalledTickets name=""/>
      </Content>
    </Container>
  );
}
