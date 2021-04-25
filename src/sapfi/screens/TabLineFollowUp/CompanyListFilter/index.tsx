import React, { useState } from "react";
import styles from "./styles";
import SapfiApi from "../../../services/Sapfi/Api";
import {
  Form,
  Item,
  Picker,
  View,
  Label,
  Icon,
  Button,
  Text,
  Input,
} from "native-base";
import GetCompanyModel from "../../../services/Sapfi/Models/Company/Get/GetCompanyModel";
import { Alert } from "react-native";
import { showErrorToast } from "../../../components/Toast";
import { showErrorToastFromHttpResponse } from "../../../helpers/errorToastHelper";

export interface Props {
  handleCompanyListFilter: Function;
}

const CompanyListFilter: React.FC<Props> = ({ handleCompanyListFilter }) => {
  const [state, setState] = useState("MG");
  const [city, setCity] = useState("Contagem");

  const onStateValueChange = (state: string) => {
    setState(state);
  };

  const onCityValueChange = (city: string) => {
    setCity(city);
  };

  const getCompanies = async (state: string, city: string) => {
      SapfiApi.get<GetCompanyModel>("/v1/Companies", {
      params: {
        country: "BRA",
        state,
        city,
      },
    })
      .then((response) =>
        response.status === 204
          ? Alert.alert(
              "Nenhum estabelecimento encontrado",
              "Ainda não estamos disponíveis nessa região."
            )
          : handleCompanyListFilter(response.data)
      )
      .catch((error) => {
        if (!error.response) {
          showErrorToast(error.toString());
          return;
        }
        showErrorToastFromHttpResponse(error);
      });
  };

  return (
    <View>
      <View style={styles.containerStartProcess}>
        <Label style={styles.nearByCompaniesLabel}>
          Estabelecimentos próximos
        </Label>
      </View>
      <Form>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.stateDropdown}
            placeholder="Estado"
            selectedValue={city}
            onValueChange={(value) => onStateValueChange(value)}
          >
            <Picker.Item label="MG" value="MG" />
          </Picker>
        </Item>
      </Form>
      <Form>
        <Item floatingLabel>
          <Label>Cidade</Label>
          <Input
            autoCapitalize="characters"
            value={city}
            onChangeText={(value) => onCityValueChange(value)}
          />
        </Item>
        <Button
          block
          primary
          style={styles.baseMarginTop}
          onPress={() => getCompanies(state, city)}
        >
          <Text>Filtrar</Text>
        </Button>
      </Form>
    </View>
  );
};

export default CompanyListFilter;
