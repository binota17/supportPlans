import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, Keyboard, ImageBackground } from "react-native";
import createStyles from "./styles";
import { NavigationProp, ParamListBase, useRoute } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Divider } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/color";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNote, updateNote, deleteNote } from "../../redux/noteSlice";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { noteState, font, defaultFont, position, media, sticker } from '../../types/noteTypes';
import { LogBox } from 'react-native';
import FontBottomSheet from "./components/FontBottomSheet";

import { Audio } from "expo-av";
import MyVideo, { openRecordVideo } from "./components/MyVideo";
import { getFullCalendarTime, getTime } from "../../untils/time";
import showMedia from "./components/Media";
import { startRecording, stopRecording } from './components/recording';
import { openCamera, pickImage } from "./components/MyImage";
import Draggable from "react-native-draggable";
import StickerBottomSheet from "./components/StickerBottomSheet";
import Sticker from "./components/Sticker";
import Media from "./components/Media";


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const NoteScreen: FC<IProps> = ({ navigation }, props) => {
  const route = useRoute()

  let viewMode;
  let note;

  if (route.params) {
    viewMode = route.params['viewMode']
    note = route.params['note']
  }

  const noteList = useAppSelector(state => state.note.noteList)

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string | undefined>(note ? note.title : '');
  const [desc, setDesc] = useState<string | undefined>(note ? note.desc : '');
  const [date, setDate] = useState<Date>(note ? new Date(note.date) : new Date());
  const [font, setFont] = useState<font>(note ? note.font : defaultFont);
  const [position, setPosition] = useState<position>(note ? note.position : undefined);
  const [medias, setMedias] = useState<media[]>(note ? note.medias : []);
  const [stickers, setStickers] = useState<sticker[]>(note ? note.stickers : []);



  const calendarText = getFullCalendarTime(date)
  const timeText = getTime(date)

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    // console.log(new Date(currentDate.nativeEvent.timestamp));
    if (currentDate.nativeEvent.timestamp) {
      setDate(new Date(currentDate.nativeEvent.timestamp));
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  useEffect(() => {
    if (viewMode) navigation.setOptions({ headerShown: false });
    else navigation.setOptions({
      headerShown: true, headerRight: () => (
        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity style={{ marginLeft: 30 }} onPress={handleOnSave}>
            <Feather name="check-square" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [viewMode, title, desc, date, font, position, medias, stickers]);

  const enableViewMode = () => {
    viewMode = true;
  }






  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const enableEditor = () => {
    navigation.navigate('NoteScreen', {
      note: note,
      viewMode: false,
    });
  }

  const handleDelete = () => {
    if (!note) return;
    const noteDeleted: noteState = { ...note }
    const id = noteDeleted.id
    if (noteDeleted.id) dispatch(deleteNote({ id }));
    Alert.alert("Success", 'delete success')
    navigation.goBack()
  }

  //
  const fontBottomSheetRef = useRef<BottomSheet>(null);

  const handleFontSnapPress = useCallback(() => {
    Keyboard.dismiss();
    fontBottomSheetRef.current?.snapToIndex(0);
  }, []);
  //

  const stickersBottomSheetRef = useRef<BottomSheet>(null);

  const handleStickerSnapPress = useCallback(() => {
    Keyboard.dismiss();
    stickersBottomSheetRef.current?.snapToIndex(0);
  }, []);




  const openMap = () => {
    navigation.navigate('MapScreen', {
      position: position,
      setPosition: setPosition,
    })
  }

  const openDraw = () => {
    navigation.navigate('Drawing', {
      media: medias,
      setMedia: setMedias,
    });
  }



  const [recording, setRecording] = React.useState<Audio.Recording>();

  const [offsetY, setOffsetY] = useState(0)

  // console.log(stickers)

  const styles = useMemo(() => createStyles(font, viewMode), [font, viewMode]);
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerItem} onPress={showDatepicker} disabled={viewMode ? true : false} >
          <Entypo name="calendar" size={24} color="black" />
          <Text>{calendarText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerItem} onPress={showTimepicker} disabled={viewMode ? true : false} >
          <Feather name="clock" size={24} color="black" />
          <Text>{timeText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerItem} onPress={openMap} disabled={viewMode ? true : false} >
          <FontAwesome5 name="map-marker-alt" size={24} color="black" />
          <Text style={{ marginLeft: 5, marginRight: 10 }}>{position?.name}</Text>
        </TouchableOpacity>
      </View>
      <Divider color={Colors.LIGHT_SKY_BLUE} width={1} />
      <TextInput style={styles.title} placeholder="Title" value={title} onChangeText={(title) => setTitle(title)} defaultValue={note ? note.title : ''} editable={viewMode ? false : true} />
      <Divider style={styles.divider} width={1} />
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }} onScroll={(event) => setOffsetY(event.nativeEvent.contentOffset.y)}>

        <TextInput
          style={styles.description}
          placeholder="Description"
          multiline={true}
          value={desc}
          onChangeText={(desc) => setDesc(desc)}
          defaultValue={note ? note.desc : ''}
          editable={viewMode ? false : true}
        />

        {(medias && medias.map((media, index) => <Media key={index} media={media} viewMode={viewMode} medias={medias} setMedias={setMedias} />))}

        {(stickers && stickers.map((sticker, index) =>
          <Sticker key={index} sticker={sticker} viewMode={viewMode} offsetY={offsetY} stickers={stickers} setStickers={setStickers} index={index} />
        ))}

        {/* <Draggable x={185} y={300} renderColor='red' renderText='B' onDragRelease={(event) => console.log(event.nativeEvent.pageY)}/> */}

      </ScrollView>
      {!viewMode ?
        <View style={styles.listButton}>
          <TouchableOpacity onPress={handleFontSnapPress}>
            <FontAwesome style={styles.button} name="font" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage(medias, setMedias)}>
            <Entypo style={styles.button} name="image" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openCamera(medias, setMedias)}>
            <Entypo style={styles.button} name="camera" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openRecordVideo(medias, setMedias)}>
            <Entypo style={styles.button} name="video-camera" size={30} color="black" />
          </TouchableOpacity>
          {recording ?
            <TouchableOpacity onPress={() => stopRecording(recording, setRecording, medias, setMedias)}>
              <MaterialIcons name="record-voice-over" size={30} color="black" />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => startRecording(setRecording)}>
              <MaterialIcons style={styles.button} name="keyboard-voice" size={30} color="black" />
            </TouchableOpacity>}

          <TouchableOpacity onPress={handleStickerSnapPress}>
            <Entypo style={styles.button} name="emoji-happy" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openDraw}>
            <MaterialCommunityIcons style={styles.button} name="draw" size={30} color="black" />
          </TouchableOpacity>
        </View>

        :
        <View>
          <TouchableOpacity style={[styles.buttonEnableEditor, { backgroundColor: Colors.SKY_BLUE }]} onPress={enableEditor}>
            <MaterialCommunityIcons name="pencil-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonDelete, { backgroundColor: Colors.RED }]} onPress={handleDelete} >
            <FontAwesome name="trash" size={30} color="black" />
          </TouchableOpacity>
        </View>
      }
      <FontBottomSheet bottomSheetRef={fontBottomSheetRef} font={font} setFont={setFont} />
      <StickerBottomSheet bottomSheetRef={stickersBottomSheetRef} stickers={stickers} setStickers={setStickers} offsetY={offsetY} />
    </View>
  );
};

export default NoteScreen;
