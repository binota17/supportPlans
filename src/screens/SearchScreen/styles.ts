import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/color";

const createStyles = () =>
  StyleSheet.create({
    body: {
      flex: 1,
    },
    text: {
      fontSize: RFValue(25),
      fontWeight: "200",
      color: Colors.BLACK,
    },
    search: {
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
    },

  });
export default createStyles;
