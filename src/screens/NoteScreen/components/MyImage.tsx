import * as ImagePicker from 'expo-image-picker';
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View } from 'react-native';
import { media } from '../../../types/noteTypes';
import { Image } from "react-native";



export const openCamera = async (medias, setMedias) => {
  // Ask the user for the permission to access the camera
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this app to access your camera!");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  // Explore the result


}

export const pickImage = async (medias, setMedias) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1
  });
  console.log(result);

  if (!result.cancelled && result.type) {
    const newMedia: media = {
      type: result.type,
      uri: result.uri
    }
    console.log(newMedia)
    setMedias([...medias, newMedia]);
    return
  }
};

const MyImage = (props) => {
  const { uri } = props;
  return (
    <View>
      <Image source={{ uri: uri }} style={{ flex: 1, width: "100%", height: 300, resizeMode: 'contain' }} />
    </View>
  )
}

export default MyImage