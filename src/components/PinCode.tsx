import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Dimensions, Button, Text, TouchableWithoutFeedback, BackHandler } from "react-native";
import { createPinCodeStyles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Overlay } from '@rneui/themed';
import { getPINCode, storePINCode } from "../asyncstorage";
import Loading from "./Loading";
import Waiting from "./Waiting";
import { pinCode } from "../types/OptionTypes";
import Question from "./Question";

const PinCode = ({ setVisible }) => {



  const switchHandler = () => {
    setWaiting(true);
  };

  const [question, setQuestion] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState(["", "", "", ""]);
  const [passCode, setPassCode] = React.useState(["", "", "", ""]);
  const [buttonCounter, setButtonCounter] = React.useState(0);
  const [errorCounter, setErrorCounter] = React.useState(0);

  useEffect(() => {
    const getData = async () => {
      const pinCodeParsed: pinCode = await getPINCode()
      setLoading(false)
      if (JSON.stringify(pinCodeParsed.code) !== JSON.stringify(["", "", "", ""])) {
        setPinCode(pinCodeParsed.code)
      }
      if (pinCodeParsed.quest && pinCodeParsed.answer) {
        setHasQuestion(true)
      }

    }
    getData()
  }, [])

  const exit = () => {
    BackHandler.exitApp();
  }

  const openQuestion = () => {
    setQuestion(true)
  }

  const checkPinCode = () => {
    if (JSON.stringify(passCode) === JSON.stringify(pinCode)) {
      setButtonCounter(0);
      setPassCode(["", "", "", ""])
      setErrorCounter(0);
      toggleOverlay()
    } else {
      setErrorCounter(errorCounter + 1);
      setButtonCounter(0);
      setPassCode(["", "", "", ""])
    }
    if (errorCounter >= 2) {
      //Navigation code
      switchHandler();
      setButtonCounter(0);
      setPassCode(["", "", "", ""])
      setErrorCounter(0);
    }
  };
  useEffect(() => {
    if (buttonCounter === 4) {
      checkPinCode()
      setButtonCounter(0);
    }
  }, [passCode])

  let nopad = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 0 },
  ];


  const presControl = (num) => {
    if (buttonCounter >= 4) return;
    let tempCode = [...passCode];
    tempCode[buttonCounter] = num;
    setPassCode(tempCode);
    setButtonCounter(buttonCounter + 1);
  };



  const clearPress = () => {
    if (buttonCounter === 0) return;
    let tempCode = [...passCode];
    tempCode[buttonCounter - 1] = "";
    console.log(tempCode);
    setButtonCounter(buttonCounter - 1);
    setPassCode(tempCode);
  };



  const toggleOverlay = () => {
    setVisible(false);
  };



  const styles = useMemo(() => createPinCodeStyles(), []);
  return (
    <Overlay overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }} isVisible={true} fullScreen={true}>
      {loading ?
        <Loading /> :
        waiting ?
          <Waiting setWaiting={setWaiting} /> :
          question ?
            <Question setQuestion={setQuestion} setVisible={setVisible} /> :
            <View style={styles.body}>

              {errorCounter && !buttonCounter ?
                <View style={styles.body2}>
                  <Text style={styles.titleerr}>Your entries did not match</Text>
                  <Text style={styles.titleerr2}>Please try again</Text>
                </View>
                : <Text style={styles.title1}>Enter your PIN Code</Text>}
              <View style={styles.boxcontaner}>
                {passCode.map((p, index) => {
                  if (errorCounter && !buttonCounter) return <View key={index} style={styles.box3}></View>;
                  else return <View key={index} style={p !== "" ? styles.box2 : styles.box1}></View>;
                })}
              </View>
              <View style={styles.noBox}>
                {nopad.map((num) => {
                  return (
                    <View key={num.id} style={{ flexDirection: "row" }}>
                      {num.id === 0 && <TouchableOpacity onPress={exit} style={styles.deleter}>
                        <Text style={styles.title}>X</Text>
                      </TouchableOpacity>}
                      <TouchableOpacity
                        style={styles.box}

                        onPress={() => presControl(num.id)}
                      >
                        <Text style={styles.title}>{num.id}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
                <TouchableOpacity onPress={clearPress} style={styles.deleter}>
                  <MaterialIcons name="backspace" size={40} color="black" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={hasQuestion ? openQuestion : undefined} style={styles.forget}>
                <Text style={styles.forgetText}>Forget PIN Code?</Text>
              </TouchableOpacity>
            </View>
      }

    </Overlay>
  );
};

export default PinCode;
