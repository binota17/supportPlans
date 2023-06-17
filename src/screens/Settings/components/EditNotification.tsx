import { Overlay } from '@rneui/themed';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Sae } from 'react-native-textinput-effects';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getNotification, getPINCode, storeNotification, storePINCode } from '../../../asyncstorage';
import { notification, pinCode } from '../../../types/OptionTypes';
import Loading from '../../../components/Loading';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { getTime } from '../../../untils/time';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAllScheduledNotificationsAsync, getNextTriggerDateAsync, scheduleNotificationAsync } from 'expo-notifications';



const EditNotification = ({ setVisible }) => {

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dayRepeat, setDayRepeat] = useState(1);






  const toggleOverlay = () => {
    setVisible(false);
  };





  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => {
    const getData = async () => {
      const notificationParsed: notification = await getNotification()
      setLoading(false)
      setTitle(notificationParsed.title)
      setBody(notificationParsed.body)
      setDate(new Date(notificationParsed.date))
      setDayRepeat(notificationParsed.dayRepeat)
    }
    getData()
  }, [])
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };


  const showTimepicker = () => {
    showMode("time");
  };

  const onConfirm = async () => {
    const notification: notification = {
      enabled: true,
      title: title,
      body: body,
      dayRepeat: dayRepeat,
      date: date.toString()
    }
    storeNotification(notification)
    await schedulePushNotification()
    toggleOverlay()
  }



  const [open, setOpen] = useState(false);



  const DayRepeatPicker = () => {
    return (
      <DropDownPicker
        containerStyle={{
          width: 70,
        }}
        open={open}
        value={dayRepeat.toString()}
        items={items}
        setOpen={setOpen}
        setValue={setDayRepeat}
        setItems={setItems}
        // dropDownDirection={"TOP"}
        labelStyle={{
          fontSize: 20
        }}
      />
    );
  }

  async function schedulePushNotification() {

    const notificationParsed: notification = await getNotification()
    const triggerDay = new Date(notificationParsed.date)

    triggerDay.setSeconds(0)
    await scheduleNotificationAsync({
      content: {
        title: notificationParsed.title,
        body: notificationParsed.body,
      },
      trigger: {
        hour: triggerDay.getHours(),
        minute: triggerDay.getMinutes(),
        repeats: true,
      }
    });
  }

  const [items, setItems] = useState<{}[]>([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ])

  return (
    <Overlay isVisible={true} overlayStyle={styles.body} fullScreen={true}>
      {loading ? <Loading /> :
        <>
          <TouchableOpacity style={styles.back} onPress={toggleOverlay}>
            <AntDesign name="back" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.top}>
            <TouchableOpacity style={styles.time} onPress={showTimepicker}>
              <Text style={styles.textTopLeft}>{getTime(date)}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTopRight}>Repeat per </Text>
              <DayRepeatPicker />
              <Text style={styles.textTopRight}> Day</Text>
            </View>
          </View>
          <Sae
            inputStyle={{ color: 'white' }}
            style={styles.text}
            label={'Title'}
            iconClass={FontAwesome}
            iconName={'pencil'}
            iconColor={'white'}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            value={title}
            onChangeText={(value) => setTitle(value)}
            defaultValue={title}
          />
          <Sae
            inputStyle={{ color: 'white' }}
            style={[styles.text, { marginBottom: 40 }]}
            label={'Body'}
            iconClass={FontAwesome}
            iconName={'pencil'}
            iconColor={'white'}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            value={body}
            onChangeText={(value) => setBody(value)}
            defaultValue={body}
          />
          <TouchableOpacity style={styles.confirm} onPress={() => onConfirm()}>
            <AntDesign name="checkcircle" size={30} color="white" />
          </TouchableOpacity>
        </>
      }
    </Overlay>
  );

}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "Roboto",
    width: 300,
    marginTop: 20
  },

  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTopLeft: {
    fontSize: 30,
  },

  textTopRight: {
    color: 'white',
    fontSize: 30,
  },
  back: {
    alignSelf: 'flex-start'
  },
  confirm: {
    alignSelf: 'flex-end'
  },
  body: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  time: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,

  },
  dayRepeat: {
    flexDirection: "row",
  }
});

export default EditNotification;