import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../constants/color";
import { font } from '../types/noteTypes';

export const createNoteStyles = (font: font) =>
  StyleSheet.create({
    bodyNote: {
      height: 160,
      flex: 1,
      backgroundColor: Colors.SKY_BLUE,
      borderRadius: 20,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      overflow: "hidden",
    },
    noteBody: {
      height: 140,
      flexDirection: 'row',

      alignSelf: "center",
    },

    noteDay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },


    overlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
    },

    noteInfo: {
      flex: 3,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },

    noteMedia: {
      marginRight: 2,
      width: 84,
      height: 84,
    },


    noteTitle: {
      flex: 1.333333333,
      fontSize: RFValue(20),
      fontFamily: font.bold && font.italic ? font.fontType + "-BoldItalic" : font.bold ? font.fontType + "-Bold" : font.italic ? font.fontType + "-Italic" : font.fontType,
      textDecorationLine: font.underline ? "underline" : "none",
      textAlign: font.align === 0 ? "left" : font.align === 1 ? "center" : "right",
      color: font.textColor
    },

    noteDesc: {
      flex: 1,
      fontSize: RFValue(15),
      marginBottom: 5,
      fontFamily: font.bold && font.italic ? font.fontType + "-BoldItalic" : font.bold ? font.fontType + "-Bold" : font.italic ? font.fontType + "-Italic" : font.fontType,
      textDecorationLine: font.underline ? "underline" : "none",
      textAlign: font.align === 0 ? "left" : font.align === 1 ? "center" : "right",
      color: font.textColor

    },
    position: {
      marginLeft: 10,
      marginRight: 10
    },


  });

export const createNoteListStyles = () =>
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
      alignItems: "center",
      position: "absolute",
      bottom: 10,
      right: 10,
    },

    buttonUp: {
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


export const createPinCodeStyles = () =>
  StyleSheet.create({
    body: {
      width: '100%',
      height: '100%',
      alignItems: "center",
      justifyContent: "center",
    },

    body2: {
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
      fontSize: 40,
    },
    noBox: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      width: 270,
      height: 200,
    },
    box1: {
      width: 13,
      height: 13,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: "gray",
    },
    titleerr: {
      fontSize: 30,
      marginTop: 30,
      fontFamily: "Roboto",
      color: "red",
    },

    titleerr2: {
      fontSize: 15,
      marginBottom: 15,
      fontFamily: "Roboto",
      color: "red",
    },

    box: {
      width: 70,
      height: 70,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: "green",
      alignItems: "center",
      backgroundColor: "#F2F3F4",
      justifyContent: "center",
      margin: 10
    },

    boxcontaner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-around',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 10,
    },


    forget: {
      marginTop: 200,
    },
    forgetText: {
      fontSize: 20,
      fontFamily: "Roboto",
      color: "gray",
    },
    overlay: {
      position: "absolute",
      height: "300%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.9)",
    },
    box2: {
      width: 13,
      height: 13,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: "gray",
      backgroundColor: "blue",
    },
    box3: {
      width: 13,
      height: 13,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: "gray",
      backgroundColor: "red",
    },
    deleter: {
      width: 70,
      height: 70,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: "green",
      alignItems: "center",
      backgroundColor: "grey",
      justifyContent: "center",
      margin: 10
    },
    title1: {
      fontSize: 30,
      marginTop: 30,
      marginBottom: 30,
      fontFamily: "Roboto",
      color: "gray",
    },


  })