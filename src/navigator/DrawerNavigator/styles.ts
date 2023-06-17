import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/color";

const createStyles = () =>
  StyleSheet.create({
    text: {
      fontSize: RFValue(25),
      fontWeight: "300",
      color: Colors.BLACK,
    },
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 40,
    },
    image: {
      width: 200,
      height: 180,
    },
    item: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
  });

export default createStyles;
