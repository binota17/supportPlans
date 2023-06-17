import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/color";
import { font } from '../../types/noteTypes';

const createStyles = (font: font, viewMode: boolean) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: Colors.ALICE_BLUE,
      marginTop: viewMode ? 40 : 0,
    },
    text: {
      fontSize: RFValue(25),
      fontWeight: "300",
      color: Colors.BLACK,
    },
    title: {
      margin: 5,
      fontFamily: font.bold && font.italic ? font.fontType + "-BoldItalic" : font.bold ? font.fontType + "-Bold" : font.italic ? font.fontType + "-Italic" : font.fontType,
      fontSize: font.fontSize * 1.5,
      textDecorationLine: font.underline ? "underline" : "none",
      textAlign: font.align === 0 ? "left" : font.align === 1 ? "center" : "right",
      color: font.textColor
    },


    divider: {
      width: "80%",
      alignSelf: "center",
    },

    listButton: {
      flexDirection: "row",
      height: 60,
      width: "95%",
      borderRadius: 30,
      alignSelf: "center",
      backgroundColor: Colors.LIGHT_SKY_BLUE,
      position: "absolute",
      bottom: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      margin: 10,
      width: 30,
      height: 30,
    },
    description: {
      flex: 1,
      margin: 5,
      fontFamily: font.bold && font.italic ? font.fontType + "-BoldItalic" : font.bold ? font.fontType + "-Bold" : font.italic ? font.fontType + "-Italic" : font.fontType,
      fontSize: font.fontSize,
      textDecorationLine: font.underline ? "underline" : "none",
      textAlign: font.align === 0 ? "left" : font.align === 1 ? "center" : "right",
      color: font.textColor
    },
    buttonDelete: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 80,
      right: 10,
    },
  });

export default createStyles;
