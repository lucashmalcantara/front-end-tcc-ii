import { StyleSheet } from "react-native";
import { fonts } from "../../../styles/index";

const styles = StyleSheet.create({
  cardBody: {
    alignItems: "center",
  },
  ticketNumber: {
    fontSize: fonts.big,
    fontWeight: 'bold'
  },
  ticketIssueDate: {
    fontSize: fonts.medium,
  },
});

export default styles;
