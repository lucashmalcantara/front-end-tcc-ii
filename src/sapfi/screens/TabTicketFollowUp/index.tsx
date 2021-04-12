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

export default function TabTicketFollowUp() {
  return (
    <Container>
      <Content padder>
      <Ticket name=""></Ticket>
      </Content>
    </Container>
  );
}
