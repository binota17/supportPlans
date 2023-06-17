import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../../constants/color";

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      flexDirection: 'row',
      width: "90%",
      alignItems: "center",
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
    },
  });

export default createStyles;
