import React, { FC, useEffect, useMemo, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from "react-native";
import { createNoteListStyles } from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from "../redux/hooks";
import NoteInfo from "../components/NoteInfo";
import { noteState } from "../types/noteTypes";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "../constants/color";
import { deleteNote, setNotes, sortNotesByTime } from "../redux/noteSlice";
import { Feather } from '@expo/vector-icons';

const NoteList = ({ noteList, navigation }) => {
  const dispatch = useAppDispatch();
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])

  useEffect(() => {
    navigation.addListener("focus", async () => {
      dispatch(sortNotesByTime());
    })
  }, []);

  const handleOnPress = (note) => {
    if (selectedNotes.length) return selectNotes(note)
    else return openEditMode(note);
  }

  const handleOutSidePress = () => {
    deselectNotes();
  }

  const deleteMultipleNotes = () => {
    if (!selectedNotes.length) return;
    selectedNotes.forEach(id => dispatch(deleteNote({ id })))
    deselectNotes();
  }

  const cancelMultipleNotes = () => {
    if (!selectedNotes.length) return;
    deselectNotes();
  }

  const getSelected = (note: noteState) => selectedNotes.includes(note.id)

  const deselectNotes = () => setSelectedNotes([]);




  // const dispatch = useAppDispatch();


  const styles = useMemo(() => createNoteListStyles(), []);
  return (
    <TouchableWithoutFeedback onPress={handleOutSidePress}>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
          {noteList.map((note) => (<NoteInfo key={note.id} note={note} handleOnLongPress={selectNotes} selected={getSelected} onPress={handleOnPress} />)).sort()}
        </ScrollView>
        {
          !selectedNotes.length ?
            <TouchableOpacity style={[styles.buttonDown, { backgroundColor: Colors.SKY_BLUE }]} onPress={() => navigation.navigate('NoteScreen')}>
              <MaterialCommunityIcons name="pencil-plus-outline" size={30} color="black" />
            </TouchableOpacity>
            :
            <View>
              <TouchableOpacity style={[styles.buttonDown, { backgroundColor: Colors.GREY }]} onPress={cancelMultipleNotes}>
                <Feather name="x" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonUp, { backgroundColor: Colors.RED }]} onPress={deleteMultipleNotes}>
                <FontAwesome name="trash" size={30} color="black" />
              </TouchableOpacity>
            </View>
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

export default NoteList
