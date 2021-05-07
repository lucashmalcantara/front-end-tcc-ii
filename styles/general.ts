import metrics from "./metrics";
import colors from "./colors";
import fonts from "./fonts";

import { StyleSheet } from "react-native";

const general = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    margin: metrics.doubleBaseMargin,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: fonts.regular,
    alignSelf: "center",
    marginBottom: metrics.doubleBaseMargin,
  },
  baseMarginTop: {
    marginTop: metrics.baseMargin,
  },
});

export default general;
