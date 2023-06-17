import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, Dimensions, Button, Text, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { createPinCodeStyles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import { getPINCode, storePINCode } from "../../../asyncstorage";
import Loading from "../../../components/Loading";
import { pinCode } from "../../../types/OptionTypes";

const EditPinCode = ({ navigation, setVisible }) => {



  const switchHandler = () => {
    navigation.navigate("Wait");
  };

  const [loading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState(["", "", "", ""]);
  const [passCode, setPassCode] = React.useState(["", "", "", ""]);
  const [tempPassCode, setTempPassCode] = React.useState(["", "", "", ""]);
  const [buttonCounter, setButtonCounter] = React.useState(0);
  const [errorCounter, setErrorCounter] = React.useState(0);
  const [FirstTime, setFirstTime] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      const pinCodeParsed: pinCode = await getPINCode()
      setLoading(false)
      console.log(pinCodeParsed)
      if (JSON.stringify(pinCodeParsed.code) !== JSON.stringify(["", "", "", ""])) {
        setPinCode(pinCodeParsed.code)
        setFirstTime(false)
      }
    }
    getData()
  }, [])


  useEffect(() => {
    if (buttonCounter === 4) {
      if (JSON.stringify(pinCode) !== JSON.stringify(["", "", "", ""])) {
        checkOldPinCode()
      } else {
        if (FirstTime) handleFirstTime();
        if (!FirstTime) check2ndPinCode();
      }
      setButtonCounter(0);
    }
  }, [passCode])

  const presControl = (num) => {
    if (buttonCounter >= 4) return;
    let tempCode = [...passCode];
    tempCode[buttonCounter] = num;
    setPassCode(tempCode);
    setButtonCounter(buttonCounter + 1);
  };


  const checkOldPinCode = () => {
    console.log(passCode, pinCode)
    if (JSON.stringify(passCode) === JSON.stringify(pinCode)) {
      setFirstTime(true)
      setPassCode(["", "", "", ""])
      setPinCode(["", "", "", ""])
      setButtonCounter(0);
    } else {
      setErrorCounter(1);
      setPassCode(["", "", "", ""])
      setButtonCounter(0);
    }
  };

  const handleFirstTime = () => {
    setButtonCounter(0);
    setTempPassCode(passCode);
    setPassCode(["", "", "", ""]);
    setFirstTime(false)
  };




  const checkPinCode = (a, b) => {
    if (JSON.stringify(passCode) === JSON.stringify(tempPassCode)) {
      alert("Login success");
      setErrorCounter(0);
    } else {
      alert(" Login Failed  ");
      setErrorCounter(1);
      setButtonCounter(0);
      setPassCode(["", "", "", ""])
    }
    if (errorCounter >= 2) {
      //Navigation code
      switchHandler();
    }
  };

  const clearPress = () => {
    if (buttonCounter === 0) return;
    let tempCode = [...passCode];
    tempCode[buttonCounter - 1] = "";
    console.log(tempCode);
    setButtonCounter(buttonCounter - 1);
    setPassCode(tempCode);
  };

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


  const toggleOverlay = () => {
    setVisible(false);
  };

  const styles = useMemo(() => createPinCodeStyles(), []);
  return (
    <Overlay overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }} isVisible={true} fullScreen={true}>
      {loading ?
        <Loading /> :
        <View style={styles.body}>

          {errorCounter && !buttonCounter ?
            <View style={styles.body2}>
              <Text style={styles.titleerr}>Your entries did not match</Text>
              <Text style={styles.titleerr2}>Please try again</Text>
            </View>
            : JSON.stringify(pinCode) !== JSON.stringify(["", "", "", ""]) ? <Text style={styles.title1}>Enter your old PIN Code</Text> :
              FirstTime ? <Text style={styles.title1}>1 - Enter your PIN Code</Text> : <Text style={styles.title1}>2 - Confirm your PIN Code</Text>}
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
                  {num.id === 0 && <TouchableOpacity onPress={toggleOverlay} style={styles.deleter}>
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

        </View>
      }

    </Overlay>
  );
};

export default EditPinCode;
