import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from '../../../constants/color';


export const createElementsStyles = () => StyleSheet.create({
  body: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    alignItems: "center",
    margin: 10
  },

  text: {
    flex: 1,
    fontSize: 25,
  },

  disText: {
    flex: 1,
    fontSize: 25,
    color: 'lightgrey',
  },

  switch: {
    marginRight: 20
  }
})

export const createPinCodeStyles = () =>
  StyleSheet.create({
    body: {
      width: '100%',
      height: '70%',
      alignItems: "center",
      justifyContent: "center",
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

    titleerr2: {
      fontSize: 15,
      marginBottom: 15,
      fontFamily: "Roboto",
      color: "red",
    },
    backspace: {

    },
    overlay: {
      position: "absolute",
      height: "300%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.9)",
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
    body2: {
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
      fontSize: 40,
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


    boxcontaner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-around',
      marginLeft: 40,
      marginRight: 40,
      marginTop: 10,
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
    title1: {
      fontSize: 30,
      marginTop: 30,
      marginBottom: 30,
      fontFamily: "Roboto",
      color: "gray",
    },

    titleerr: {
      fontSize: 30,
      marginTop: 30,
      fontFamily: "Roboto",
      color: "red",
    },

  })