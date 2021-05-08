import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Button, Container, Content, View, Text, Spinner } from "native-base";
import CompanyList from "./CompanyList";
import CompanyListFilter from "./CompanyListFilter";
import GetCompanyModel from "../../services/Sapfi/Models/Company/Get/GetCompanyModel";
import CompanyLineState from "./CompanyLineState";
import GetCompanyLineModel from "../../services/Sapfi/Models/Company/Get/GetCompanyLineModels";
import CompanyLineNotification from "./CompanyLineNotification";
import SapfiApi from "../../services/Sapfi/Api";
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import { showErrorToastFromHttpResponse } from "../../helpers/errorToastHelper";
import UserContext from "../../contexts/User";
import ModalComponent from "../../components/ModalComponent";
import { colors } from "../../styles";

const performDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function TabLineFollowUp() {
  const componentExecutionId = useRef<number>();
  const currentLineId = useRef<number>();

  const [companies, setCompanies] = useState<GetCompanyModel[]>();
  const [line, setLine] = useState<GetCompanyLineModel>();
  const notifyWhenRef = useRef<number>();

  const [
    showCompanyLineNotificationDialog,
    setShowCompanyLineNotificationDialog,
  ] = useState(false);
  const [
    showDeleteLineFollowUpDialog,
    setShowDeleteLineFollowUpDialog,
  ] = useState(false);
  const [lineFollowUpExists, setLineFollowUpExists] = useState(false);
  const [checkLineFollowUpIsReady, setCheckLineFollowUpIsReady] = useState(
    true
  );
  const { expoPushToken } = useContext(UserContext);

  const backgroundTask = async () => {
    const semaphore = componentExecutionId.current
      ? componentExecutionId.current
      : 0;

    while (componentExecutionId.current === semaphore) {
      if (currentLineId.current) await getLineById(currentLineId.current);
      await performDelay(10000);
    }
  };

  const getLineById = async (id: number) => {
    try {
      const response = await SapfiApi.get<GetCompanyLineModel>("/v1/Lines", {
        params: {
          companyId: id,
        },
      });

      if (response.data.id === id) setLine(response.data);
    } catch (error) {
      if (!error.response) {
        showErrorToast(error.toString());
        return;
      }
      showErrorToastFromHttpResponse(error);
    }
  };

  useEffect(() => {
    if (!line) return;

    getLineFollowUp(line.id, expoPushToken);
  }, []);

  useEffect(() => {
    if (line?.numberOfTickets === notifyWhenRef.current)
      setLineFollowUpExists(false);
  }, [line]);

  const getLineFollowUp = async (lineId: number, deviceToken: string) => {
    setCheckLineFollowUpIsReady(false);
    SapfiApi.get<GetCompanyLineModel>("/v1/LinesFollowUp", {
      params: {
        lineId,
        deviceToken,
      },
    })
      .then((response) => {
        response.status === 204
          ? setLineFollowUpExists(false)
          : setLineFollowUpExists(true);
      })
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      })
      .finally(() => setCheckLineFollowUpIsReady(true));
  };

  const createLineFollowUp = (
    notifyWhen: number,
    lineId: number,
    deviceToken: string
  ) => {
    SapfiApi.post("v1/LinesFollowUp", {
      lineId,
      deviceToken,
      notifyWhen,
    })
      .then((response) => {
        if (line) getLineFollowUp(line.id, expoPushToken);
        notifyWhenRef.current = notifyWhen;
        setShowCompanyLineNotificationDialog(false);
        showSuccessToast(
          "Você será alertado quando a fila atingir a quantidade de pessoas informada!"
        );
      })
      .catch((error) => {
        notifyWhenRef.current = undefined;
        if (!error.response) {
          showErrorToast("Não foi possível criar o alerta.");
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const deleteLineFollowUp = async (lineId: number, deviceToken: string) => {
    SapfiApi.delete("/v1/LinesFollowUp", {
      params: {
        lineId,
        deviceToken,
      },
    })
      .then((response) => {
        setLineFollowUpExists(false);
        showSuccessToast("Alerta de situação de fila excluído com sucesso.");
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
    if (!line) return;
    deleteLineFollowUp(line.id, expoPushToken);
    setShowDeleteLineFollowUpDialog(false);
  };

  const handleLine = (line: GetCompanyLineModel) => {
    componentExecutionId.current = Math.random();
    backgroundTask();
    currentLineId.current = line.id;
    setLine(line);
    if (line) getLineFollowUp(line.id, expoPushToken);
  };

  const handleCompanyListFilter = (companies: GetCompanyModel[]) => {
    setCompanies(companies);
  };

  const handleCancelLineNotificationDialog = () => {
    setShowCompanyLineNotificationDialog(false);
    if (line) getLineFollowUp(line.id, expoPushToken);
  };

  const handleDeleteLineFollowUpDialogVisibility = (visible: boolean) => {
    setShowDeleteLineFollowUpDialog(visible);
  };

  const handleCloseLineState = async () => {
    componentExecutionId.current = undefined;
    currentLineId.current = undefined;
    setLine(undefined);
  };

  return (
    <Container>
      <Content padder>
        <View>
          {line ? (
            <View>
              <View style={styles.companyTradingNameContainer}>
                <Text style={styles.companyTradingName}>
                  {companies?.find((c) => c.id === line.id)?.tradingName}
                </Text>
              </View>
              <CompanyLineState line={line} />
              {!checkLineFollowUpIsReady ? (
                <Spinner color={colors.primary} />
              ) : lineFollowUpExists ? (
                <>
                  <ModalComponent
                    handleDialogVisibility={
                      handleDeleteLineFollowUpDialogVisibility
                    }
                    handleConfirm={handleDelete}
                    title={"Excluir alerta"}
                    description={`Deseja excluir o alerta de situação de fila?`}
                    confirmButton={"SIM"}
                    cancelButton={"NÃO"}
                    visible={showDeleteLineFollowUpDialog}
                  />
                  <Button
                    block
                    primary
                    style={styles.baseMarginTop}
                    onPress={() => setShowDeleteLineFollowUpDialog(true)}
                  >
                    <Text>Excluir Alerta</Text>
                  </Button>
                </>
              ) : (
                <Button
                  block
                  primary
                  style={styles.baseMarginTop}
                  onPress={() => setShowCompanyLineNotificationDialog(true)}
                >
                  <Text>Criar Alerta</Text>
                </Button>
              )}
              <CompanyLineNotification
                createLineFollowUp={createLineFollowUp}
                cancel={handleCancelLineNotificationDialog}
                lineId={line.id}
                visible={showCompanyLineNotificationDialog}
              />
              <Button
                block
                danger
                style={styles.baseMarginTop}
                onPress={() => handleCloseLineState()}
              >
                <Text>Voltar</Text>
              </Button>
            </View>
          ) : !companies ? (
            <CompanyListFilter
              handleCompanyListFilter={handleCompanyListFilter}
            />
          ) : (
            <View>
              <CompanyList companies={companies} handleLine={handleLine} />
              <Button
                block
                danger
                style={styles.baseMarginTop}
                onPress={() => setCompanies(undefined)}
              >
                <Text>Voltar</Text>
              </Button>
            </View>
          )}
        </View>
      </Content>
    </Container>
  );
}
