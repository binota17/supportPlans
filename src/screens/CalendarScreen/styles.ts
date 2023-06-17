import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/color";

const createStyles = () =>
  StyleSheet.create({
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      fontSize: RFValue(25),
      fontWeight: "300",
    },
    text: {

      color: Colors.BLACK,
    }
  });

export default createStyles;
