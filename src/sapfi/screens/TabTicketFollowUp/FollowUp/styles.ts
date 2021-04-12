import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/index";

const styles = StyleSheet.create({
  cardBody: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  ticketNumber: {
    fontSize: fonts.huge,
  },
  ticketIssueDate: {
    fontSize: fonts.medium,
  },
});

export default styles;
