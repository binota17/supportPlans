import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../../../constants/color";

const createStyles = () =>
  StyleSheet.create({
    body: {
      flex: 1,
    },
    text: {
      fontSize: RFValue(25),
      fontWeight: "300",
      color: Colors.BLACK,
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      ...StyleSheet.absoluteFillObject,
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 60,
      justifyContent: "center",
      right: 10,
      backgroundColor: Colors.LIGHT_SKY_BLUE,
    },
    name: {
      height: 40,

      paddingLeft: 10,
      paddingRight: 10,
    },
  });

export default createStyles;
