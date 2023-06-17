import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { createElementsStyles } from "./styles";
import { Switch } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';

const ElementWithSwitch = ({checked, setChecked, nameIcon, text}) => {


  const styles = useMemo(() => createElementsStyles(), []);
  return (
    <View style={styles.body}>
      <MaterialIcons name={nameIcon} size={30} color="black" />
      <Text style={styles.text}> {text}</Text>
        <Switch
        style={styles.switch}
        value={checked}
        onValueChange={(value) => setChecked(value)}
       />
    </View>
  );
};

export default ElementWithSwitch;
