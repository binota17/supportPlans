import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ElementWithSwitch from '../components/ElementWithSwitch';
import DefElement from '../components/DefElement';
import EditPinCode from '../components/EditPinCode';
import EditQuestion from '../components/EditQuestion';
import { pinCode } from '../../../types/OptionTypes';
import { getPINCode } from '../../../asyncstorage';
import { storePINCode } from '../../../asyncstorage/index';

const SecurityScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [pinCodeChecked, setPinCodeChecked] = useState(false);
  const [visibleEditPinCode, setVisibleEditPinCode] = useState(false);
  const [visibleQuestion, setVisibleQuestion] = useState(false);

  useEffect(() => {
    const storeData = async () => {
      const pinCodeParsed: pinCode = await getPINCode()
      pinCodeParsed.enabled = pinCodeChecked
      storePINCode(pinCodeParsed)
    }
    storeData()
  }, [pinCodeChecked])


  const openPinCode = () => {
    setVisibleEditPinCode(true);
  }

  const openQuestion = () => {
    setVisibleQuestion(true);
  }
  useEffect(() => {
    const getData = async () => {
      const pinCodeParsed: pinCode = await getPINCode()
      if (pinCodeParsed) {
        setPinCodeChecked(pinCodeParsed.enabled)
      } else {
        const defPinCode: pinCode = {
          code: ['', '', '', ''],
          quest: '',
          answer: '',
          enabled: false
        }
        storePINCode(defPinCode)
      }
    }
    getData()
  }, [])



  return (
    <View>
      <ElementWithSwitch checked={pinCodeChecked} setChecked={setPinCodeChecked} nameIcon="lock-outline" text="Enable security" />
      <DefElement nameIcon='fiber-pin' text='PinCode' onPress={openPinCode} enabled={pinCodeChecked} />
      {visibleEditPinCode && <EditPinCode navigation={navigation} setVisible={setVisibleEditPinCode} />}
      <DefElement nameIcon='question-answer' text='Question & Answer' onPress={openQuestion} enabled={pinCodeChecked} />
      {visibleQuestion && <EditQuestion setVisible={setVisibleQuestion} />}
    </View>
  )
}

export default SecurityScreen