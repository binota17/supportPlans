import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ElementWithSwitch from '../components/ElementWithSwitch';
import DefElement from '../components/DefElement';
import EditNotification from '../components/EditNotification';
import Notification from '../components/Notification';
import { notification } from '../../../types/OptionTypes';
import { getNotification } from '../../../asyncstorage';
import { storeNotification } from '../../../asyncstorage/index';
import { cancelAllScheduledNotificationsAsync, scheduleNotificationAsync } from 'expo-notifications';

const NotificationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [notificationChecked, setNotificationChecked] = useState(false);
  const [visibleEditNotification, setVisibleEditNotification] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const notificationParsed: notification = await getNotification()
      if (notificationParsed) {
        console.log(notificationParsed)
        setNotificationChecked(notificationParsed.enabled)
      } else {
        const defNotification: notification = {
          enabled: false,
          title: 'DiaryAndNote Notification',
          body: 'It\'s time to write a diary',
          dayRepeat: 1,
          date: new Date().toString()
        }
        storeNotification(defNotification)
      }
    }
    getData()
  }, [])

  async function schedulePushNotification() {

    const notificationParsed: notification = await getNotification()
    const date = new Date(Date.now() + 1000 * 5);

    await scheduleNotificationAsync({
      content: {
        title: notificationParsed.title,
        body: notificationParsed.body,
      },
      trigger: { date }
    });
  }




  const openNotification = () => {
    setVisibleEditNotification(true);
  }


  useEffect(() => {
    const storeData = async () => {
      const notificationParsed: notification = await getNotification()
      notificationParsed.enabled = notificationChecked
      storeNotification(notificationParsed)
    }
    storeData()
  }, [notificationChecked])

  useEffect(() => {
    if (!notificationChecked) {
      cancelAllScheduledNotificationsAsync()
      console.log("cancelAllScheduledNotifications")
    }
  }, [notificationChecked])

  return (

    <View>
      <Notification />
      <ElementWithSwitch checked={notificationChecked} setChecked={setNotificationChecked} nameIcon="notifications-active" text="Enable Notification" />
      <DefElement nameIcon='edit' text='Edit Notification' onPress={openNotification} enabled={notificationChecked} />
      {visibleEditNotification && <EditNotification setVisible={setVisibleEditNotification} />}
      <DefElement nameIcon='announcement' text='Try Notification' onPress={async () => schedulePushNotification()} enabled={notificationChecked} />
    </View>
  )
}

export default NotificationScreen