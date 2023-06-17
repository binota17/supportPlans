
import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RecentScreen,CalendarScreen,SearchScreen, TestScreen, Test, TestScreen2, SettingsScreen,TodoListScreen} from "../../screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from "react-native";



type TopTab = {
  // Recent: undefined;
  Storage: undefined;
  Note: undefined;
  TodoList:undefined;
  Setting:undefined;
  Search: undefined;
    TestScreen: undefined;
    Test: undefined;
  };
  
export default function TopTab() {
  //  const Tab = createMaterialTopTabNavigator<TopTab>();

    
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen name="Storage" component={RecentScreen} options={{
          tabBarIcon: () => (
            <Image source = {require('../../../assets/home.png')} style={{width:30,height:30}} resizeMode="stretch" ></Image>
          )
        }}/>

        <Tab.Screen name="Note" component={CalendarScreen} options={{
          tabBarIcon: () => (
            <Image source = {require('../../../assets/bookmark.png')} style={{width:30,height:30}} resizeMode="stretch" ></Image>
          )
        }}/>

        <Tab.Screen name="TodoList" component={TodoListScreen} options={{
          tabBarIcon: () => (
            <Image source = {require('../../../assets/tasklist.png')} style={{width:30,height:30}} resizeMode="stretch" ></Image>
          )
        }}/>

        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarIcon: () => (
            <Image source = {require('../../../assets/search.png')} style={{width:30,height:30}} resizeMode="stretch" ></Image>
          )
        }}/>

        <Tab.Screen name="Setting" component={SettingsScreen} options={{
          tabBarIcon: () => (
            <Image source = {require('../../../assets/settings.png')} style={{width:30,height:30}} resizeMode="stretch" ></Image>
          )
        }}/>

      </Tab.Navigator>
    )
  } 