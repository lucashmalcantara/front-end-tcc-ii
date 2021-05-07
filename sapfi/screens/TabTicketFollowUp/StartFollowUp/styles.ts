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
  startProcess :{
    fontSize: fonts.big
  }
});

export default styles;
