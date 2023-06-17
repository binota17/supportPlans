import {Text, TouchableOpacity} from "react-native";
import React, { useMemo } from "react";
import { createElementsStyles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

const DefElement = ({nameIcon, text, onPress, enabled}) => {


  const styles = useMemo(() => createElementsStyles(), []);
  return (
    <TouchableOpacity style={styles.body} onPress={onPress} disabled={enabled ? false : true}>
      <MaterialIcons name={nameIcon} size={30} color={enabled ? "black" : 'lightgrey'} />
      <Text style={enabled ? styles.text : styles.disText}> {text}</Text>
    </TouchableOpacity>
  );
};

export default DefElement;
