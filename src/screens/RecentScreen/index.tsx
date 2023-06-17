import React, { FC, useEffect, useMemo, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from "react-native";
import createStyles from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import NoteInfo from "../../components/NoteInfo";
import {noteState} from "../../types/noteTypes";
import { FontAwesome } from '@expo/vector-icons'; 
import { Colors } from "../../constants/color";
import { deleteNote, setNotes, sortNotesByTime } from "../../redux/noteSlice";
import { Feather } from '@expo/vector-icons'; 
import { getData } from "../../asyncstorage";
import NoteList from "../../components/NoteList";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const RecentScreen: FC<IProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const noteList = useAppSelector((state) => state.note.noteList);

  useEffect(() => {
    const getFirstTimeData = async () =>{
      await getData(dispatch, setNotes);
      dispatch(sortNotesByTime());
    }
    getFirstTimeData()
  }, []);


  return (
    <NoteList navigation={ navigation } noteList={noteList}/>
  );
};

export default RecentScreen;
