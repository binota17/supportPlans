import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import { useMemo } from "react";
import createStyles from "./styles";
import { is } from "immer/dist/internal";
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';


const uri = 'https://stream.nixcdn.com/NhacCuaTui980/WindyHill-VA-5941232.mp3?st=3heQtm14IFr0tYYfJ8Zgnw&e=1670174364'

const MyAudio = (props) => {

  const { uri } = props;

  const styles = useMemo(() => createStyles(), []);

  const [recording, setRecording] = React.useState<Audio.Recording>();

  const [audio, setAudio] = React.useState<Audio.Sound>();
  const [status, setStatus] = React.useState<AVPlaybackStatusSuccess>();

  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
  }

  const loadSound = async () => {
    console.log('Loading Sound');
    const { sound, status } = await Audio.Sound.createAsync({ uri: uri });
    setAudio(sound);
    await audio?.unloadAsync();
    if ('isPlaying' in status) {
      setStatus(status);
    }

  }
  let [underline, setUnderline] = useState<boolean>(props.font.underline);
  function Underline() {
    if (underline) return <FontAwesome style={styles.bottomSheetItem} name="underline" size={24} color="black" onPress={() => [setUnderline(false), updateFont]} />;
    else return <FontAwesome style={styles.bottomSheetItem} name="underline" size={24} color="grey" onPress={() => setUnderline(true)} />
  }



  let [italic, setItalic] = useState<boolean>(props.font.italic);
  function Italic() {
    if (italic) return <FontAwesome style={styles.bottomSheetItem} name="italic" size={24} color="black" onPress={() => setItalic(false)} />;
    else return <FontAwesome style={styles.bottomSheetItem} name="italic" size={24} color="grey" onPress={() => setItalic(true)} />
  }

  let [bold, setBold] = useState<boolean>(props.font.bold);
  function Bold() {
    if (bold) return <FontAwesome style={styles.bottomSheetItem} name="bold" size={24} color="black" onPress={() => setBold(false)} />;
    else return <FontAwesome style={styles.bottomSheetItem} name="bold" size={24} color="grey" onPress={() => setBold(true)} />
  }
  //
  let [fontSize, setFontSize] = useState<number>(props.font.fontSize);




  const onChange = async (value: any) => {
    await audio?.setPositionAsync(value);
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

  return (
    <View style={styles.container}>
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


          <Text>   {convertTime(status?.positionMillis)}</Text>

          <Slider
            value={status?.positionMillis}
            minimumValue={0}
            maximumValue={status?.durationMillis}
            style={{ flex: 1 }}
            onSlidingComplete={onChange}
          />

          <Text>{convertTime(status?.durationMillis)}</Text>

        </View>

        : null
      }
    </View>
  );
};
export default MyAudio;
