import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Divider } from "@rneui/themed";

import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from "../../../constants/color";
import { useAppDispatch } from "../../../redux/hooks";
import * as SplashScreen from 'expo-splash-screen';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const FontBottomSheet = (props) => {
  //

  const [open, setOpen] = useState(false);
  let [fontType, setFontType] = useState<string>(props.font.fontType);
  const [items, setItems] = useState([
    { label: 'Roboto', value: 'Roboto', labelStyle: { fontFamily: 'Roboto' } },
    { label: 'OpenSans', value: 'OpenSans', labelStyle: { fontFamily: 'OpenSans' } },
    { label: 'AveriaSansLibre', value: 'AveriaSansLibre', labelStyle: { fontFamily: 'AveriaSansLibre' } },
    { label: 'ChakraPetch', value: 'ChakraPetch', labelStyle: { fontFamily: 'ChakraPetch' } },
    { label: 'DancingScript', value: 'DancingScript', labelStyle: { fontFamily: 'DancingScript' } },
    { label: 'JosefinSans', value: 'JosefinSans', labelStyle: { fontFamily: 'JosefinSans' } },
    { label: 'LobsterTwo', value: 'LobsterTwo', labelStyle: { fontFamily: 'LobsterTwo' } },
    { label: 'TuesdayNight', value: 'TuesdayNight', labelStyle: { fontFamily: 'TuesdayNight' } },
  ]);

  function Font() {
    return (

      <DropDownPicker
        style={{ width: 150 }}
        containerStyle={{
          width: 150
        }}
        open={open}
        value={fontType}
        textStyle={{ fontFamily: fontType }}
        items={items}
        setOpen={setOpen}
        setValue={setFontType}
        setItems={setItems}
        // dropDownDirection={"TOP"}
        listMode="MODAL"

      />
    )
  }

  //
  let [textColor, setTextColor] = useState<string>(props.font.textColor);

  function ChooseColor() {
    return (
      <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 10 }}>
        <TouchableOpacity style={[styles.colorBox, { backgroundColor: Colors.BLACK }]} onPress={() => setTextColor(Colors.BLACK)}>
          {textColor === Colors.BLACK && <FontAwesome name="check" size={24} color="white" />}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.colorBox, { backgroundColor: Colors.BLUE }]} onPress={() => setTextColor(Colors.BLUE)}>
          {textColor === Colors.BLUE && <FontAwesome name="check" size={24} color="white" />}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.colorBox, { backgroundColor: Colors.GREEN }]} onPress={() => setTextColor(Colors.GREEN)}>
          {textColor === Colors.GREEN && <FontAwesome name="check" size={24} color="white" />}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.colorBox, { backgroundColor: Colors.RED }]} onPress={() => setTextColor(Colors.RED)}>
          {textColor === Colors.RED && <FontAwesome name="check" size={24} color="white" />}
        </TouchableOpacity>
      </View>
    )
  }
  //

  function FontSizePicker() {
    return (
      <Picker
        style={{ width: 90, height: 0, }}
        selectedValue={fontSize}
        onValueChange={(itemValue, itemIndex) => setFontSize(itemValue)}
        mode={"dropdown"}
      >
        <Picker.Item label="12" value={12} />
        <Picker.Item label="14" value={14} />
        <Picker.Item label="16" value={16} />
        <Picker.Item label="18" value={18} />
        <Picker.Item label="20" value={20} />
        <Picker.Item label="22" value={22} />
        <Picker.Item label="24" value={24} />
        <Picker.Item label="26" value={26} />
        <Picker.Item label="28" value={28} />
        <Picker.Item label="30" value={30} />
      </Picker>
    );
  }

  //
  let [align, setAlign] = useState<number>(props.font.align); // 0 is left, 1 is center, 2 is right aligned
  function Align() {
    return align % 3 === 0 ? (
      <FontAwesome style={styles.bottomSheetItem}
        name="align-left"
        size={24}
        color="black"
        onPress={() => setAlign(++align)}
      />
    ) : align % 3 === 1 ? (
      <FontAwesome style={styles.bottomSheetItem}
        name="align-center"
        size={24}
        color="black"
        onPress={() => setAlign(++align)}
      />
    ) : (
      <FontAwesome style={styles.bottomSheetItem}
        name="align-right"
        size={24}
        color="black"
        onPress={() => setAlign(++align - 3)}
      />
    );
  }

  const snapPoints = useMemo(() => ["12%", "20%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={3}
      />
    ),
    []
  );

  const updateFont = () => {
    props.setFont({ ...props.font, fontType, fontSize, align, bold, italic, underline, textColor })
  }


  useEffect(() => {
    updateFont();
  }, [fontType, fontSize, align, bold, italic, underline, textColor])

  // const handleClosePress = useCallback(() => {
  //   bottomSheetRef.current?.close();
  // }, []);

  // const renderFooter = useCallback(
  //   (props) => (
  //     <BottomSheetFooter {...props}>
  //       <View style={styles.footerContainer}>
  //         <TouchableOpacity style={styles.button} onPress={handleClosePress}>
  //           <MaterialIcons name="keyboard-arrow-down" size={40} color="black" />
  //         </TouchableOpacity>
  //       </View>
  //     </BottomSheetFooter>
  //   ),
  //   []
  // );


  return (
    <View style={styles.container}>
      <BottomSheet
        style={{ flex: 1 }}
        ref={props.bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        // footerComponent={renderFooter}
        enableContentPanningGesture={false}
      >

        <View style={styles.contentContainer}>

          <Font />
          <FontSizePicker />
          <Align />
          <Bold />
          <Italic />
          <Underline />
        </View>
        <Divider color={Colors.LIGHT_SKY_BLUE} width={1} />
        <ChooseColor />
        <Divider color={Colors.LIGHT_SKY_BLUE} width={1} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundColor: 'grey',
  },
  contentContainer: {
    // flex: 1,
    flexDirection: "row",
    // height: 10,
    // alignItems: "center",
    // marginBottom: "90%",
    // paddingLeft: 10,
  },
  bottomSheet: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  bottomSheetItem: {
    marginTop: 15,
    marginRight: 20,
  },

  footerContainer: {
    // padding: 12,
    // margin: 12,
    // borderRadius: 12,
    backgroundColor: "#80f",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.SKY_BLUE,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    right: 5,
  },

  listButton: {
    flexDirection: "row",
    height: 60,
    width: "95%",
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: Colors.LIGHT_SKY_BLUE,
    position: "absolute",
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    margin: 10,
    width: 30,
    height: 30,
  },
  colorBox: {
    height: 30,
    width: 50,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  }
});


export default FontBottomSheet;
