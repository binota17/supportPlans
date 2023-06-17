import { Overlay } from '@rneui/themed';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Sae } from 'react-native-textinput-effects';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { getPINCode } from '../asyncstorage';
import { pinCode } from "../types/OptionTypes";

const Question = ({setQuestion, setVisible}) =>{
    const [Q, setQ] = useState<string>('');
    const [A, setA] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getData = async () => {
        const pinCodeParsed : pinCode = await getPINCode()
        setLoading(false)
        console.log(pinCodeParsed)
        if(pinCodeParsed.quest && pinCodeParsed.answer) {
          setQ(pinCodeParsed.quest)
          setAnswer(pinCodeParsed.answer)
        }
      }
      getData()
    }, [])

    const onConfirm = () => {
      if(A === answer) setVisible(false);
      else alert("uncorrect")
    }


 
  return(
    <View style={styles.body}>
        <TouchableOpacity style={styles.back} onPress={() => setQuestion(false)}>
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
        editable={false}
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
        </View>
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
    marginTop: '50%',
     width: "100%",
     justifyContent: "center",
     alignItems: "center",
  }
});

export default Question;