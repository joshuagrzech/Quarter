import React from 'react'
import { View, TextInput, Alert, Text } from 'react-native'
import { styles } from 'assets/stylesheet.js'
import { useDispatch, useSelector } from 'react-redux'
import XDate from 'xdate'
import { v4 as uuidv4 } from 'uuid'
import { Calendar } from 'react-native-calendars'

import { addItem } from 'redux-store/reducers/item'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { InstructionText } from '../styled-components/Text'
import { NewBillContainer } from '../styled-components/View'
import { ProfileCompleteTouchable } from 'styled_components'
import { NewIouCalendar } from '../styled-components/Calendar'
import TextInputMask from 'react-native-text-input-mask'
import { ShadowButtonText, HomeSettingsContainer, Label } from 'styled_components'
import Collapsible from 'react-native-collapsible';

export const NewBill = (props) => {
  const dispatch = useDispatch()
  const { navigation } = props
  const [shared, setShared] = React.useState(false)
  const [markedDates, setMarkedDates] = React.useState({})
  const [amountSelected, setAmountSelected] = React.useState()
  const [amount, setAmount] = React.useState(null)
  const [due, setDue] = React.useState()
  const [name, setName] = React.useState()
  const [nameSelected, setNameSelected] = React.useState(false)
  const userName = useSelector((state) => state.user.username)
  const home = useSelector((state) => state.home)
  const myuuid = uuidv4()

  const onDaySelect = (day) => {
    setDue(day)
    const markedArr = {}
    markedArr[day.dateString] = { selected: true, selectedColor: '#fdcb6e' }
    setMarkedDates(markedArr)
  }

  const isSharedHome = () => {
    if (home.users.length > 0) {
      return (
        <View style={{flex: 1}}>
        <ProfileCompleteTouchable friction={10} tension={300}
          onPress={() => setShared(shared !== true)}
          color={shared === true ? 'rgba(112, 161, 255,1.0)' : 'rgba(112, 161, 255,0.5)'}
        >
          <InstructionText>{shared ? 'Tap to Un-Split' : 'Tap to Split'}</InstructionText>
        </ProfileCompleteTouchable> 
        </View>
      )
    }
  }

  return (
    <NewBillContainer animation="bounceIn">
      <KeyboardAvoidingScrollView
        showsVerticalScrollIndicator={false}
        contentInset={{ bottom: 350 }}
        
        style={{ flex: 1, borderRadius: 20, marginTop: '10%' }}
      >
        <HomeSettingsContainer style={{marginTop: '10%', flex: 1}}>
          <Label>Bill Name</Label>
          <View style={{ flex: 1 }}>


            <TextInput
              returnKeyType="go"
              style={{ fontSize: 40, textAlign: 'center', flex: 1, marginVertical: '4%' }}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Rent"
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCapitalize="words"
              autoCorrect
              onFocus={() => setNameSelected(true)}
              onEndEditing={() => setNameSelected(false)}
            />
          </View>
          <Label>Amount</Label>

          <View style={{ flex: 1 }}>
            <TextInputMask
              mask={parseInt(amount) > 1000 ? '$[0],[000]' : '$[0000]'}
              returnKeyType="done"
              value={amount}
              style={{ fontSize: 40, textAlign: 'center', flex: 1, marginVertical: '4%' }}
              keyboardType="number-pad"
              onChangeText={(formatted, extracted) => setAmount(extracted)}
              placeholder="$1400"
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setAmountSelected(true)}
              onEndEditing={(text) => {
                setAmountSelected(false)
              }}
            />
          </View>

          {isSharedHome()}


          <NewIouCalendar
            markedDates={markedDates}
            minDate={Date()}
            maxDate={new XDate().addMonths(1)}
            current={due ? due.dateString : new Date()}
            onDayPress={(day) => onDaySelect(day)}
          />
          <Collapsible arrowStyling={{ thickness: 5 }} title={'More'} titleProps={{ title: { fontSize: 30 } }} style={{ height: '10%' }} collapsiblestyle={{ height: '50%' }}>
            <View style={{ height: '100%' }}>

            </View>
          </Collapsible>
          <ProfileCompleteTouchable friction={10} tension={300}
            onPress={() => {
              if (name === null || name === undefined) {
                Alert.alert("You didn't specify a biller for this Bill.")
                return
              }
              if (amount === null || amount === undefined) {
                Alert.alert("You didn't specify an amount for this Bill.")
                return
              }
              if (due === null || due === undefined) {
                Alert.alert("You didn't specify a due date for this Bill.")
                return
              }
              const newItemObj = {
                type: 'bill',
                shared,
                id: myuuid,
                due: due.dateString,
                name,
                amount: amount,
                createdBy: userName
              }
              dispatch(addItem(newItemObj))
              navigation.navigate('Main')
            }}
            color="rgba(46, 213, 115,1.0)"
          >
            <ShadowButtonText>Save New Bill</ShadowButtonText>
          </ProfileCompleteTouchable> 
        </HomeSettingsContainer>
      </KeyboardAvoidingScrollView>
    </NewBillContainer>
  )
}

NewBill.sharedElements = () => [{ id: 'connect_bank', animation: 'move' }]
