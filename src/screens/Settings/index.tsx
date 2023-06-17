import React, { FC, useMemo, useState } from "react";
import { View, Text } from "react-native";
import createStyles from "./styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import ElementWithSwitch from "./components/ElementWithSwitch";
import DefElement from "./components/DefElement";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const SettingsScreen: FC<IProps> = ({ navigation }) => {
  
  const openSecurityScreen = () => {
    navigation.navigate('Security')
  }

  const openNotification = () => {
    navigation.navigate('Notification')
  }

  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={{flex: 1}}>
      <DefElement nameIcon='security' text='Security' onPress={openSecurityScreen} enabled={true} />
      <DefElement nameIcon='notifications' text='Notification' onPress={openNotification} enabled={true} />
    </View>
  );
}; 

export default SettingsScreen;
