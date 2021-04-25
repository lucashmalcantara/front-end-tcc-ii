import React, { useState } from "react";
import styles from "./styles";
import { Button, Container, Content, View, Text } from "native-base";
import CompanyList from "./CompanyList";
import CompanyListFilter from "./CompanyListFilter";
import GetCompanyModel from "../../services/Sapfi/Models/Company/Get/GetCompanyModel";

export default function TabLineFollowUp() {
  const [companies, setCompanies] = useState<GetCompanyModel[]>();
  const [company, setCompany] = useState<GetCompanyModel>();

  const handleCompany = (company: GetCompanyModel) => {
    console.log(">>> Chamou handleCompany.");
  };

  const handleCompanyListFilter = (companies: GetCompanyModel[]) => {
    console.log(">>> Chamou handleCompanyListFilter.", companies);
    setCompanies(companies);
  };

  return (
    <Container>
      <Content padder>
        <View style={styles.companyListContainer}>
          {company ? (
            <Text>Tela do estado da fila (Empresa). Criar um componente</Text>
          ) : !companies ? (
            <CompanyListFilter
              handleCompanyListFilter={handleCompanyListFilter}
            />
          ) : (
            <View>
              <CompanyList companies={companies} />
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
