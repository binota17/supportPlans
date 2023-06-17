import { Button ,Text, View} from "react-native";
import React from "react";
import { createDrawerNavigator} from '@react-navigation/drawer';
import TopTab from "../MaterialTopTabsNavigator";




export default function Drawer() {
  const Drawer = createDrawerNavigator();
  // const Drawer = createBottomTabNavigator();

  return (
    <Drawer.Navigator> 
    
      <Drawer.Screen name="Support Plan" component={TopTab} />
      
    </Drawer.Navigator>

   

  ) } 