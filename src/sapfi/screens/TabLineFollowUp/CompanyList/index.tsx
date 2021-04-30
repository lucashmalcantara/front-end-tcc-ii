import React, { useState } from "react";
import styles from "./styles";
import SapfiApi from "../../../services/Sapfi/Api";
import {
  Label,
  List,
  ListItem,
  View,
  Text,
  Body,
  Right,
  Button,
  Left,
  Content,
  Icon,
  Spinner,
} from "native-base";
import GetCompanyModel from "../../../services/Sapfi/Models/Company/Get/GetCompanyModel";
import GetCompanyLineModel from "../../../services/Sapfi/Models/Company/Get/GetCompanyLineModels";
import { colors } from "../../../styles";
import { Alert } from "react-native";
import { showErrorToast } from "../../../components/Toast";
import { showErrorToastFromHttpResponse } from "../../../helpers/errorToastHelper";

export interface Props {
  companies: GetCompanyModel[] | undefined;
  handleLine: Function;
}

const CompanyList: React.FC<Props> = ({ companies, handleLine }) => {
  
  const getCompanyLine = async (company: GetCompanyModel) => {
    console.log(">>> getCompanyLine = async (company: GetCompanyModel)",company);
    SapfiApi.get<GetCompanyLineModel>("/v1/Lines", {
      params: {
        companyId: company.id
      },
    })
      .then((response) =>
        response.status === 204
          ? Alert.alert(
              "Nenhuma fila encontrada",
              "Não foi possível encontrar uma fila de espera para este estabelecimento."
            )
          : handleLine(response.data)
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  }
  
  return (
    <View>
      <View style={styles.companyListContainer}>
        <Label style={styles.companyListLabel}>Estabelecimentos próximos</Label>
        <View style={styles.listContainer}>
          {companies ? (
            <List>
              {companies.map((company) => (
                <ListItem key={company.id} noIndent
                onPress={() => getCompanyLine(company)}
                >
                  <Left style={styles.companyInformationContainer}>
                    <Text style={styles.tradingName}>
                      {company.tradingName}
                    </Text>
                    <Text style={styles.address}>
                      {company.address.street}, {company.address.number} -{" "}
                      {company.address.neighborhood}
                    </Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              ))}
            </List>
          ) : (
            <Spinner color={colors.primary} />
          )}
        </View>
      </View>
    </View>
  );
};

export default CompanyList;
