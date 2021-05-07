import { StyleSheet } from "react-native";
import { fonts, general, metrics } from "../../../styles/index";

const styles = StyleSheet.create({
  ...general,
  buttonContainer: {
    marginTop: metrics.doubleBaseMargin,
  },
  companyListContainer: {
    alignItems: "center",
    marginBottom: metrics.doubleBaseMargin,
  },
  companyListLabel: {
    fontSize: fonts.big,
  },
  listContainer: { flex: 1, width: "100%" },
  companyInformationContainer: {
    flexDirection: "column",
    flex: 1,
    marginTop: metrics.baseMargin
  },
  tradingName: {
    alignSelf: "flex-start",
    fontSize: fonts.regular,
    fontWeight: 'bold'
  },
  address: {
    alignSelf: "flex-start",
    fontSize: fonts.medium
  },
});

export default styles;
