import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../../constants/color";

const createStyles = () =>
  StyleSheet.create({
    body: {
      flex: 1,

      // justifyContent: "center",
      // alignItems: "center",
    },
    text: {
      fontSize: RFValue(25),
      fontWeight: "300",
      color: Colors.BLACK,
    },

    buttonDown: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      right: 10,
      borderRadius: 30,
      justifyContent: "center"
    },

    buttonUp: {
      width: 60,
      height: 60,
      bottom: 80,
      right: 10,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
  });

export default createStyles;
