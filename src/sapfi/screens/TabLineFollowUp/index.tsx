import React, { useContext, useEffect, useState } from "react";
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

export default function TabLineFollowUp() {
  const [companies, setCompanies] = useState<GetCompanyModel[]>();
  const [line, setLine] = useState<GetCompanyLineModel>();
  const [showDialog, setShowDialog] = useState(false);
  const [lineFollowUpExists, setLineFollowUpExists] = useState(false);
  const { expoPushToken } = useContext(UserContext);

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
    console.log(">>> Chamou handleCompany.");
    setLine(line);
  };

  const handleCompanyListFilter = (companies: GetCompanyModel[]) => {
    console.log(">>> Chamou handleCompanyListFilter.", companies);
    setCompanies(companies);
  };

  const handleDialogVisibility = (visible: boolean) => {
    setShowDialog(visible);
    if (line) getLineFollowUp(line.id, expoPushToken);
  };

  return (
    <Container>
      <Content padder>
        <View style={styles.companyListContainer}>
          {line ? (
            <View>
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
                onPress={() => setLine(undefined)}
              >
                <Text>Fechar</Text>
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
