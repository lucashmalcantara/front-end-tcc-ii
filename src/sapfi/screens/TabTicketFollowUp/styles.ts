import { StyleSheet } from "react-native";
import { colors, metrics } from "../../styles";

const styles = StyleSheet.create({
  containerStartFollowUp: {
    marginTop: "35%",
  },
  baseMarginTop: {
    marginTop: metrics.baseMargin,
  },
  companyTradingNameContainer: {
    alignItems: "center",
    margin: metrics.baseMargin,
  },
  companyTradingName: {
    color: colors.primary,
    textAlign:'center',
    fontWeight: 'bold'
  },
});

export default styles;
