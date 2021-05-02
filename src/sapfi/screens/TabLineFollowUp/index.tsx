import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Button, Container, Content, View, Text } from "native-base";
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

const performDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function TabLineFollowUp() {
  const [
    lineStateBackgroundTaskExecutionCount,
    setLineStateBackgroundTaskExecutionCount,
  ] = useState(0);

  const cancelLineStateBackgroundTask = useRef<boolean>();

  const [companies, setCompanies] = useState<GetCompanyModel[]>();
  const [line, setLine] = useState<GetCompanyLineModel>();
  const [showDialog, setShowDialog] = useState(false);
  const [lineFollowUpExists, setLineFollowUpExists] = useState(false);
  const { expoPushToken } = useContext(UserContext);

  useEffect(() => {
    lineStateBackgroundTask(10000);
  }, [lineStateBackgroundTaskExecutionCount]);

  const lineStateBackgroundTask = async (delayInMilliseconds: number) => {
    if (cancelLineStateBackgroundTask.current) return;

    await performDelay(delayInMilliseconds);

    if (line) getLineById(line.id);

    setLineStateBackgroundTaskExecutionCount(
      lineStateBackgroundTaskExecutionCount + 1
    );
  };

  const getLineById = async (id: number) => {
    SapfiApi.get<GetCompanyLineModel>("/v1/Lines", {
      params: {
        companyId: id,
      },
    })
      .then((response) => {
        if (!cancelLineStateBackgroundTask.current) setLine(response.data);
      })
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  useEffect(() => {
    if (!line) return;

    getLineFollowUp(line.id, expoPushToken);
  }, [line]);

  const getLineFollowUp = async (lineId: number, deviceToken: string) => {
    SapfiApi.get<GetCompanyLineModel>("/v1/LinesFollowUp", {
      params: {
        lineId,
        deviceToken,
      },
    })
      .then((response) =>
        response.status === 204
          ? setLineFollowUpExists(false)
          : setLineFollowUpExists(true)
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  const deleteLineFollowUp = async (lineId: number, deviceToken: string) => {
    SapfiApi.delete<GetCompanyLineModel>("/v1/LinesFollowUp", {
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
  };

  const handleLine = (line: GetCompanyLineModel) => {
    setLine(line);
    setLineStateBackgroundTaskExecutionCount(0);
    cancelLineStateBackgroundTask.current = false;
  };

  const handleCompanyListFilter = (companies: GetCompanyModel[]) => {
    setCompanies(companies);
  };

  const handleDialogVisibility = (visible: boolean) => {
    setShowDialog(visible);
    if (line) getLineFollowUp(line.id, expoPushToken);
  };

  const handleCloseLineState = () => {
    cancelLineStateBackgroundTask.current = true;
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
              {lineFollowUpExists ? (
                <Button
                  block
                  primary
                  style={styles.baseMarginTop}
                  onPress={() => handleDelete()}
                >
                  <Text>Excluir Alerta</Text>
                </Button>
              ) : (
                <Button
                  block
                  primary
                  style={styles.baseMarginTop}
                  onPress={() => setShowDialog(true)}
                >
                  <Text>Criar Alerta</Text>
                </Button>
              )}

              <CompanyLineNotification
                handleDialogVisibility={handleDialogVisibility}
                lineId={line.id}
                visible={showDialog}
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
