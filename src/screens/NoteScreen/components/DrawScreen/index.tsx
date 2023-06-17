import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import Signature from "react-native-signature-canvas";
import { FontAwesome5 } from '@expo/vector-icons';
import { media } from '../../../../types/noteTypes';
import { useRoute } from "@react-navigation/native";
import { Divider } from "@rneui/base";


const DrawScreen = ({ navigation }) => {

  const route = useRoute()

  let media;
  let setMedia;

  if (route.params) {
    media = route.params['media']
    setMedia = route.params['setMedia']
  }

  const ref = useRef<SignatureViewRef>(null);


  const handleSignature = (signature) => {
    // console.log(signature);
    const newMedia: media = {
      type: 'image',
      uri: signature
    }
    setMedia([...media, newMedia])
    navigation.goBack()
  };



  const erase = () => {
    ref.current?.erase();
  }
  const handleEmpty = () => {
    console.log("Empty");
  };
  const handleClear = () => {
    console.log("clear success!");
  };

  const undo = () => {
    ref.current?.undo();
  }

  const redo = () => {
    ref.current?.redo();
  }


  const draw = () => {
    ref.current?.draw();
  }

  const style = 'body,html { width: 100%; height: 600px;}';



  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={draw}>
          <FontAwesome5 name="pen-fancy" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={undo}>
          <FontAwesome5 name="undo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={redo}>
          <FontAwesome5 name="redo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={erase}>
          <FontAwesome5 name="eraser" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <SignatureScreen
        ref={ref}
        // onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={true}
        descriptionText={'abcde'}
        webStyle={style}
      />
    </>
  );
}

export default DrawScreen