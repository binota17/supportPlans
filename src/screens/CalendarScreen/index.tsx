import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import createStyles from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";
import NoteCalendar from "./components/NoteCalendar";
import getNoteListByTime from './components/noteListByTimeUtils';
import NoteList from "../../components/NoteList";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}


const CalendarScreen: FC<IProps> = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  const noteList = useAppSelector((state) => state.note.noteList);
  const [selected, setSelected] = useState(new Date());
  const noteListByTime = getNoteListByTime(noteList, new Date(selected))

  return (
    <ScrollView>
      <NoteCalendar noteList={noteList} selected={selected} setSelected={setSelected}/>
      {noteListByTime && <NoteList navigation={ navigation } noteList = {noteListByTime} />}
    </ScrollView>
  )
};

export default CalendarScreen;
