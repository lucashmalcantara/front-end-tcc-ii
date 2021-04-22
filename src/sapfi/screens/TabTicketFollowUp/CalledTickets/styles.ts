import { StyleSheet } from "react-native";
import {  fonts } from "../../../styles/index";

const styles = StyleSheet.create({
  cardBody: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardItemContainer: {
    alignItems: "center",
  },
  ticketNumber: {
    fontSize: fonts.big,
  },
  calledAt: {
    fontSize: fonts.small,
  },
});

export default styles;
