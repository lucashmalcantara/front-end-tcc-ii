import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
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
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import ErrorModel from "../../services/Sapfi/Models/Core/ErrorModel";
import { showErrorToastFromHttpResponse } from "../../helpers/errorToastHelper";

const performDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function TabTicketFollowUp() {
  const { expoPushToken } = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);
  const [ticket, setTicket] = useState<GetTicketModel>();
  const [backgroundJobRunning, setBackgroundJobRunning] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setIsReady(false);
    await loadNativeBaseFonts();
    backgroundJob(2000);
    setIsReady(true);
  };

  const backgroundJob = async (delayInMilliseconds: number) => {
    if (backgroundJobRunning) {
      console.log("This job is already running...");
      return;
    }

    setBackgroundJobRunning(true);

    const jobId = Math.random();
    console.log(`New job ID`, jobId);

    while (true) {
      await performDelay(delayInMilliseconds);
      console.log(
        `${jobId} - Waited ${delayInMilliseconds}ms - ${Date.now().toLocaleString()}`
      );
    }
  };

  const loadNativeBaseFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
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
        showSuccessToast("Você será alertado quando sua vez estiver próxima!")
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast("Não foi possível criar o alerta.");
          return;
        }
        showErrorToastFromHttpResponse(error);
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
