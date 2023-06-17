import React, { FC, useMemo, useState } from "react";
import { View, Text } from "react-native";
import createStyles from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { SearchBar } from '@rneui/themed';
import { useAppSelector } from "../../redux/hooks";
import NoteList from "../../components/NoteList";


const SearchScreen = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  const [searchTitle, setSearchTitle] = useState('')
  const [searchDesc, setSearchDesc] = useState('')
  const noteList = useAppSelector((state) => state.note.noteList);
  const noteListSearch = noteList.filter(note => note.title.includes(searchTitle) && note.desc?.includes(searchDesc));

  
  return (
    <View style={styles.body}>
      <View style={styles.search}>
        <SearchBar
          placeholder="Title"
          onChangeText={setSearchTitle}
          value={searchTitle}
          lightTheme={true}
          round={true}
        />
        <SearchBar
          placeholder="Description"
          onChangeText={setSearchDesc}
          value={searchDesc}
          lightTheme={true}
          round={true}
        />
      </View>
      {searchTitle || searchDesc ?

      <NoteList navigation={ navigation } noteList={noteListSearch}/>
      : null}
    </View>
  );
};

export default SearchScreen;
