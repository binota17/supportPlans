import { Overlay } from '@rneui/themed';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Sae } from 'react-native-textinput-effects';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { getPINCode, storePINCode } from '../../../asyncstorage';
import { pinCode } from '../../../types/OptionTypes';
import Loading from '../../../components/Loading';
import PinCode from '../../../components/PinCode';



const Question = ({setVisible}) =>{

    const [Q, setQ] = useState<string>('');
    const [A, setA] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [pinCodeVisible, setPinCodeVisible] = useState(false);


    useEffect(() => {
      const getData = async () => {
        const pinCodeParsed : pinCode = await getPINCode()
        setLoading(false)
        console.log(pinCodeParsed)
        if(pinCodeParsed.enabled && (JSON.stringify(pinCodeParsed.code) !== JSON.stringify(["", "", "", ""]))) {
          setPinCodeVisible(true);
          console.log(pinCodeParsed.code)
        }
        if(pinCodeParsed.quest && pinCodeParsed.answer) {
          setQ(pinCodeParsed.quest)
          setA(pinCodeParsed.answer)
        }
      }
      getData()
    }, [])

    const toggleOverlay = () => {
        setVisible(false);
      };

    const onConfirm = async () => {
      const pinCodeParsed : pinCode = await getPINCode()
      pinCodeParsed.quest = Q
      pinCodeParsed.answer = A
      storePINCode(pinCodeParsed)
      toggleOverlay()
    }
    
 
  return(
    <>
    {pinCodeVisible && <PinCode setVisible={setPinCodeVisible}/>}
    <Overlay isVisible={true} overlayStyle={styles.body} fullScreen={true}>
        {loading ? <Loading/> :
        <>
        <TouchableOpacity style={styles.back} onPress={toggleOverlay}>
            <AntDesign name="back" size={30} color="white" />
        </TouchableOpacity>
        <Sae
        inputStyle={{color : 'white'}}
        style={styles.text}
        label={'Question'}
        iconClass={FontAwesome}
        iconName={'pencil'}
        iconColor={'white'}
        inputPadding={16}
        labelHeight={24}
        // active border height
        borderHeight={2}
        // TextInput props
        autoCapitalize={'none'}
        autoCorrect={false}
        value={Q}
        onChangeText={(value) => setQ(value)}
        defaultValue={Q}
         />
        <Sae
        inputStyle={{color : 'white'}}
        style={[styles.text, {marginBottom: 40}]}
        label={'Answer'}
        iconClass={FontAwesome}
        iconName={'pencil'}
        iconColor={'white'}
        inputPadding={16}
        labelHeight={24}
        // active border height
        borderHeight={2}
        // TextInput props
        autoCapitalize={'none'}
        autoCorrect={false}
        value={A}
        onChangeText={(value) => setA(value)}
        defaultValue={A}
         />
        <TouchableOpacity style={styles.confirm} onPress={() => onConfirm()}>
           <AntDesign name="checkcircle" size={30} color="white" />
        </TouchableOpacity>
        </>
      }
    </Overlay>
    </>
  );

}

const styles = StyleSheet.create({
 text:{
   fontSize:20,
   fontFamily:"Roboto",
    width: 300,
    marginTop: 20
 },
 back:{
    alignSelf: 'flex-start'
  },
  confirm:{
    alignSelf: 'flex-end'
  },
 body: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.9)'
 }
});

export default Question;