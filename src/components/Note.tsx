import { Divider } from "@rneui/themed";
import React, { useMemo } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { Colors } from "../constants/color";
import { noteState, media } from "../types/noteTypes";
import { getCalendarTime, getDay, getTime } from "../untils/time";
import { createNoteStyles } from "./styles";

const TaskInfo = (props) => {
  const note: noteState = props.note;
  const date: Date = new Date(note.date);
  const positionName: string | undefined = note.position?.name
  const medias: media[] | undefined = note.medias?.slice(0, 3);

  const calendarText = getCalendarTime(date)
  const timeText = getTime(date)
  const dayText = getDay(date)

  const Mediasa = () => {
    return (
      <View style={{ flex: 5, flexDirection: 'row' }}>
        {medias && medias.map((media) => {
          if (media.type === 'image' || media.type === 'video') return <Image key={media.uri} source={{ uri: media.uri }} style={styles.noteMedia} />
          if (media.type === 'audio') return <Image key={media.uri} source={require('../../assets/audio.jpg')} style={styles.noteMedia} />
        }
        )}
      </View>
    )
  }

  const styles = useMemo(() => createNoteStyles(note.font), [note.font]);
  return (
    <TouchableOpacity style={styles.bodyNote} onPress={() => props.onPress(note)} onLongPress={() => props.handleOnLongPress(note)}>
      <View style={styles.noteBody}>
        <View style={styles.noteDay}>
          <Text>{timeText}</Text>
          <Text>{calendarText}</Text>
          <Text>{dayText}</Text>
        </View>
        <Divider orientation='vertical' color={Colors.RED} width={1} />
        <View style={styles.noteInfo}>
          <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
          <Text style={styles.noteDesc} numberOfLines={1}>{note.desc}</Text>
          <Medias />
        </View>
      </View>
      <Divider color={Colors.RED} width={1} />
      <Text style={styles.position} numberOfLines={1}>{positionName}</Text>
      {props.selected(note) && <View style={styles.overlay}></View>}
    </TouchableOpacity>
  );
};

export default TaskInfo;
