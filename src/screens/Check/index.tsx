import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { useMemo } from "react";
import createStyles from "./styles";
import { is } from "immer/dist/internal";
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';


const uri = 'https://stream.nixcdn.com/NhacCuaTui980/WindyHill-VA-5941232.mp3?st=3heQtm14IFr0tYYfJ8Zgnw&e=1670174364'

const Test = ({ navigation }) => {

  const styles = useMemo(() => createStyles(), []);

  const [recording, setRecording] = React.useState<Audio.Recording>();


  const [audio, setAudio] = React.useState<Audio.Sound>();
  const [status, setStatus] = React.useState<AVPlaybackStatusSuccess>();
  const loadSound = async () => {
    console.log('Loading Sound');
    const { sound, status } = await Audio.Sound.createAsync({ uri: uri });
    setAudio(sound);
    await audio?.unloadAsync();
    if ('isPlaying' in status) {
      setStatus(status);
    }

  }


  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
  }


  const convertTime = (time: number | undefined) => {

    const sec = time ? time / 1000 : 0;
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - (hours * 3600)) / 60);
    const seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));

    return (!hours ? '' : hours < 10 ? ("0" + hours + ':') : hours + ':') +
      (minutes < 10 ? ("0" + minutes) : minutes) + ':' +
      (seconds < 10 ? ("0" + seconds) : seconds);
  }
  const playSound = async () => {
    if (audio?._loaded) {
      audio?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await audio.playAsync();
    }
  }

  const pauseSound = async () => {
    if (audio) await audio.pauseAsync();
  }

  React.useEffect(() => {
    if (uri) {
      loadSound();
    }
  }, [uri])

  const onChange = async (value: any) => {
    await audio?.setPositionAsync(value);
  }





  return (
    <View style={styles.container}>
      <Button title='Open' onPress={() => { navigation.navigate('TestScreen') }} />
      {audio ?
        <View style={styles.box}>
          {status?.isPlaying ?
            <TouchableOpacity onPress={pauseSound}>
              <FontAwesome name="pause" size={24} color="black" />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={playSound}>
              <FontAwesome name="play" size={24} color="black" />
            </TouchableOpacity>}

          <Text> {convertTime(status?.positionMillis)}</Text>

          <Slider
            value={status?.positionMillis}
            minimumValue={0}
            maximumValue={status?.durationMillis}
            style={{ flex: 1 }}
            onSlidingComplete={onChange}
          />

          <Text>{convertTime(status?.durationMillis)}</Text>

        </View>

        : <View>
          {/* <Button
  title={recording ? 'Stop Recording' : 'Start Recording'}
  onPress={recording ? stopRecording : startRecording}
/> */}
        </View>
      }
    </View>
  );
};
export default Test;
