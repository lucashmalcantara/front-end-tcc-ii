import React, { useState, useEffect, useContext, useRef } from "react";
import { Container, Content, View, Spinner, Button, Text } from "native-base";

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
import { showErrorToastFromHttpResponse } from "../../helpers/errorToastHelper";
import GetCalledTicketModel from "../../services/Sapfi/Models/Ticket/Get/GetCalledTicketModel";
import ModalComponent from "../../components/ModalComponent";

const performDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function TabTicketFollowUp() {
  const { expoPushToken } = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);
  const [ticket, setTicket] = useState<GetTicketModel>();
  const [calledTickets, setCalledTickets] = useState<GetCalledTicketModel[]>();
  const [showDialog, setShowDialog] = useState(false);

  const cancelTicketStateBackgroundTask = useRef<boolean>();
  const [
    ticketStateBackgroundTaskExecutionCount,
    setTicketStateBackgroundTaskExecutionCount,
  ] = useState(0);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    ticketStateBackgroundTask(1000);
  }, [ticketStateBackgroundTaskExecutionCount]);

  const ticketStateBackgroundTask = async (delayInMilliseconds: number) => {
    if (cancelTicketStateBackgroundTask.current) return;

    await performDelay(delayInMilliseconds);

    if (ticket) updateFollowUpState();

    setTicketStateBackgroundTaskExecutionCount(
      ticketStateBackgroundTaskExecutionCount + 1
    );
  };

  const initialize = async () => {
    setIsReady(false);
    await loadNativeBaseFonts();
    setIsReady(true);
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
    getCalledTickets(ticket.companyId, 3);
    createTicketFollowUp(ticket.id, expoPushToken);

    setTicketStateBackgroundTaskExecutionCount(0);
    cancelTicketStateBackgroundTask.current = false;
  };

  const createTicketFollowUp = (ticketId: number, deviceToken: string) => {
    SapfiApi.post("v1/TicketsFollowUp", {
      ticketId,
      deviceToken,
    })
      .then((response) => {
        showSuccessToast("Voc?? ser?? alertado quando sua vez estiver pr??xima!");
      })
      .catch((error) => {
        if (!error.response) {
          showErrorToast("N??o foi poss??vel criar o alerta.");
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const getCalledTickets = async (companyId: number, quantity: number) => {
    SapfiApi.get<GetCalledTicketModel[]>("/v1/Tickets/called-tickets/last", {
      params: {
        companyId,
        quantity,
      },
    })
      .then((response) => {
        if (!cancelTicketStateBackgroundTask.current)
          setCalledTickets(response.data);
      })
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const updateFollowUpState = () => {
    if (!ticket) return;
    getTicket(ticket.id);
    getCalledTickets(ticket.companyId, 3);
  };

  const getTicket = (ticketId: number) => {
    SapfiApi.get(`v1/Tickets/${ticketId}`)
      .then((response) => {
        if (!cancelTicketStateBackgroundTask.current) setTicket(response.data);
      })
      .catch((error) => {
        if (!error.response) {
          showErrorToast("N??o foi poss??vel atualizar o estado do ticket.");
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const handleDialogVisibility = (visible: boolean) => {
    setShowDialog(visible);
  };

  const deleteTicketFollowUp = async (
    ticketId: number,
    deviceToken: string
  ) => {
    SapfiApi.delete("/v1/TicketsFollowUp", {
      params: {
        ticketId,
        deviceToken,
      },
    })
      .then((response) => {
        cancelTicketStateBackgroundTask.current = true;
        setTicket(undefined);
        setShowDialog(false);
        showSuccessToast("Acompanhamento finalizado com sucesso.");
      })
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const handleDelete = () => {
    if (!ticket) return;
    deleteTicketFollowUp(ticket.id, expoPushToken);
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
          <View style={styles.companyTradingNameContainer}>
            <Text style={styles.companyTradingName}>
              {ticket.companyTradingName}
            </Text>
          </View>
          <Ticket number={ticket.number} issueDate={ticket.issueDate} />
          <FollowUp
            linePosition={ticket.linePosition}
            waitingTime={ticket.waitingTime}
            calledAt={ticket.calledAt}
          />
          <CalledTickets calledTickets={calledTickets} />
          <ModalComponent
            handleDialogVisibility={handleDialogVisibility}
            handleConfirm={handleDelete}
            title={"Finalizar acompanhamento"}
            description={`Deseja finalizar o acompanhamento do ticket ${ticket.number}?`}
            confirmButton={"SIM"}
            cancelButton={"N??O"}
            visible={showDialog}
          />
          <Button
            block
            danger
            style={styles.baseMarginTop}
            onPress={() => setShowDialog(true)}
          >
            <Text>Finalizar</Text>
          </Button>
        </Content>
      )}
    </Container>
  );
}
