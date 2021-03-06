import { StyleSheet } from "react-native";
import { fonts, general, metrics } from "../../../styles/index";

const styles = StyleSheet.create({
  ...general,
  buttonContainer: {
    marginTop: metrics.doubleBaseMargin,
  },
  containerStartProcess: {
    alignItems: "center",
    marginBottom: metrics.doubleBaseMargin
  },
  nearByCompaniesLabel :{
    fontSize: fonts.big
  },
  stateDropdown: {
    height: 50,
  },
});

export default styles;
