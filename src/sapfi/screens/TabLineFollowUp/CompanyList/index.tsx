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
import { colors } from "../../../styles";

export interface Props {
  companies: GetCompanyModel[] | undefined;
}

const CompanyList: React.FC<Props> = ({ companies }) => {
  return (
    <View>
      <View style={styles.companyListContainer}>
        <Label style={styles.companyListLabel}>Estabelecimentos próximos</Label>
        <View style={styles.listContainer}>
          {companies ? (
            <List>
              {companies.map((company) => (
                <ListItem key={company.id} noIndent>
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
