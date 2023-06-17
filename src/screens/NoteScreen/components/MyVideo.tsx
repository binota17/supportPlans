import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { useMemo } from 'react';
import createStyles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { media } from '../../../types/noteTypes';


const MyVideo = (props) => {

  const styles = useMemo(() => createStyles(), []);

  const video = React.useRef(null);
  const window = Dimensions.get("window");
  const videoHeight = Math.floor(window.width / 1.777)
  // const [status, setStatus] = React.useState<AVPlaybackStatus>();

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={{ width: '100%', height: videoHeight }}
        source={{
          uri: props.uri,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}

        rate={1.0}
        volume={1.0}
       
    </View>
  );

}

export const openRecordVideo = async (medias, setMedias) => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this app to access your camera!");
    return;
  }



  if (!result.cancelled && result.type) {
    console.log(result.uri)
    const newMedia: media = {
      type: result.type,
      uri: result.uri
    }
    setMedias([...medias, newMedia]);

    return

  }
}




export default MyVideo;
