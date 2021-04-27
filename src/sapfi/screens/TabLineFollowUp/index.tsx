import React, { useContext, useState } from "react";
import styles from "./styles";
import { Button, Container, Content, View, Text } from "native-base";
import CompanyList from "./CompanyList";
import CompanyListFilter from "./CompanyListFilter";
import GetCompanyModel from "../../services/Sapfi/Models/Company/Get/GetCompanyModel";
import CompanyLineState from "./CompanyLineState";
import GetCompanyLineModel from "../../services/Sapfi/Models/Company/Get/GetCompanyLineModels";
import UserContext from "../../contexts/User";
import Dialog from "react-native-dialog";
import CompanyLineNotification from "./CompanyLineNotification";
import SapfiApi from "../../services/Sapfi/Api";
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import { showErrorToastFromHttpResponse } from "../../helpers/errorToastHelper";

export default function TabLineFollowUp() {
  const [companies, setCompanies] = useState<GetCompanyModel[]>();
  const [line, setLine] = useState<GetCompanyLineModel>();
  const [visible, setDialog] = useState(true);

  const showDialog = (show:boolean) => {setDialog(show)};

  const handleLine = (line: GetCompanyLineModel) => {
    console.log(">>> Chamou handleCompany.");
    setLine(line);
  };

  const handleCompanyListFilter = (companies: GetCompanyModel[]) => {
    console.log(">>> Chamou handleCompanyListFilter.", companies);
    setCompanies(companies);
  };

  const createNotification = (notifyWhen: number, lineId: number, deviceToken: string) => {
    SapfiApi.post("v1/LinesFollowUp", {
      lineId,
      deviceToken,
      notifyWhen
    })
      .then((response) =>
        showSuccessToast("Você será alertado quando a fila atingir a quantidade de pessoas informada!")
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast("Não foi possível criar o alerta.");
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  }

  return (
    <Container>
      <Content padder>
        <View style={styles.companyListContainer}>
          {line ? (
            <View>
              <CompanyLineState line={line} />
              <Button
                block
                info
                style={styles.baseMarginTop}
                onPress={() => showDialog(false)}
              >
                <Text>Criar Alerta</Text>
              </Button>
              <CompanyLineNotification
              showDialog={showDialog}
              lineId={line.id}
              createCompanyLineNotification={createNotification}
              show={visible}
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
                info
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
