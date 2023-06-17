import { Audio } from "expo-av";
import { media } from "../../../types/noteTypes";

export const startRecording = async (setRecording) => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.log("Failed to start recording");
    }
  }

  
export const stopRecording = async (recording ,setRecording, medias, setMedias) => {
    console.log("Stopping recording..");
    if (recording) {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        const newMedia : media = {
            type: 'audio',
            uri: uri
          }
          setMedias([...medias , newMedia]);
        console.log("Recording stopped and stored at", uri);
      }
    }
    setRecording(undefined);
  }