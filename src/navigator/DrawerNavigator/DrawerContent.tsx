import React, { useMemo } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import createStyles from "./styles";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


const MyCustomDrawerContent = ({ navigation }) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../../../assets/logo.png")}
        />
        <View style={styles.body}>
          <Text style={styles.text}>Support</Text>
          <Text style={styles.text}>Plan</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Settings")}
        >
          <Feather name="settings" size={30} color="black" />
          <Text style={styles.text}> Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyCustomDrawerContent;
 