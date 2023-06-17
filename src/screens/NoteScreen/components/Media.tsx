import React from 'react';
import { media } from '../../../types/noteTypes';
import MyVideo from './MyVideo';
import MyAudio from './MyAudio';
import MyImage from './MyImage';
import {Text, TouchableOpacity, View} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 


const Media = ({media, viewMode, medias, setMedias}) => {
  

  const handleDelete = () => {
    const newMedias = medias.filter(mediaT => mediaT !== media)
    setMedias(newMedias)
  }

  return(
  <View>
    {media.type === 'image' ?
        <MyImage key={media.uri} uri={media.uri}/>
        : media.type === 'video' ?
        <MyVideo key={media.uri} uri={media.uri}/>
        : media.type === 'audio' ?
        <MyAudio key={media.uri} uri={media.uri}/> : null
    }
    {!viewMode && 
        <TouchableOpacity style={{ position:'absolute', top: 10, right:10}} onPress={handleDelete}>
        <MaterialIcons name="cancel" size={20} color="red" />
        </TouchableOpacity>
    } 

    </View>
  )
  }

export default Media