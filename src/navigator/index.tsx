import React from "react";
import {
  CalendarScreen,
  NoteScreen,
  RecentScreen,
  MapScreen,
  SettingsScreen,
  TestScreen,
  DrawScreen,
  TodoListScreen
} from "../screens";
import {
  SecurityScreen,
} from "../screens/SettingsScreen/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {Image} from "react-native";

import Drawer from "./DrawerNavigator/DrawerNavigator";
import Waiting from "../components/Waiting";
import PinCode from "../components/PinCode";
import NotificationScreen from "../screens/SettingsScreen/screens/NotificationScreen";
import { createDrawerNavigator} from '@react-navigation/drawer';
import TopTab from "./MaterialTopTabsNavigator";



// export type MainStackParamList = {
//   Drawer: undefined;
//   NoteScreen: undefined;
// };

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainStack = createNativeStackNavigator();

export default function Screens() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        
        <MainStack.Screen name="SUPPORT PLAN" component={TopTab} />
        <MainStack.Screen name="NoteScreen" component={NoteScreen}/>
        <MainStack.Screen name="RecentScreen" component={RecentScreen}/>
        <MainStack.Screen name="MapScreen" component={MapScreen}/>
        <MainStack.Screen name="Settings" component={SettingsScreen}/>
        <MainStack.Screen name="Security" component={SecurityScreen}/>
        <MainStack.Screen name="Notification" component={NotificationScreen}/>
        <MainStack.Screen name="Drawing" component={DrawScreen}/>
      </MainStack.Navigator>
    </NavigationContainer> 
  );
}