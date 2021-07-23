import React from 'react'
import { TextInput, View, Alert } from 'react-native'
import { styles } from 'assets/stylesheet.js'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import XDate from 'xdate'

import { addItem } from 'redux-store/reducers/item'
import { NewTaskOccurenceButton } from '../styled-components/Touchables'
import {
  NewBillContainer
} from '../styled-components/View'
import { NewTaskSmallText, InstructionText, NewBillButtonText } from '../styled-components/Text'
import { ProfileCompleteTouchable, NewTaskInstructionText, Label } from 'styled_components'
import { NewIouCalendar } from '../styled-components/Calendar'
import TextInputMask from 'react-native-text-input-mask'

export const NewIou = (props) => {
  const dispatch = useDispatch()
  const { navigation } = props
  const [shared, setShared] = React.useState(false)
  const [sharedReceive, setSharedReceive] = React.useState(false)

  const [amountSelected, setAmountSelected] = React.useState(false)
  const [amount, setAmount] = React.useState()
  const [assigned, setAssigned] = React.useState()
  const [name, setName] = React.useState()
  const [nameSelected, setNameSelected] = React.useState(false)
  const user = useSelector((state) => state.user)
  const home = useSelector((state) => state.home)
  const [customSelected, setCustomSelected] = React.useState(false)
  const [due, setDue] = React.useState()
  const [markedDates, setMarkedDates] = React.useState({})
  const [someoneElse, setSomeoneElse] = React.useState(false)
  const onDaySelect = (day) => {
    const dateObj = {}
    dateObj[`${day.dateString}`] = { selected: true, selectedColor: '#fdcb6e' }
    setMarkedDates({ ...markedDates, ...dateObj })
    setDue(day.dateString)
  }

  const isSharedHome = () => {
    if (home.users.length > 1) {
      return (
        <>


        <View style={{flexDirection: 'row', alignSelf: 'center', flex: 0.005}}>
        <ProfileCompleteTouchable friction={10} tension={300}
          onPress={() => {
            setSharedReceive(!sharedReceive)
            setShared(false)
          }}
          
          color={sharedReceive === true ? 'rgba(112, 161, 255,1.0)' : 'rgba(112, 161, 255,0.5)'}
        >
          <InstructionText>Receive</InstructionText>
        </ProfileCompleteTouchable> 
        <ProfileCompleteTouchable friction={10} tension={300}
          onPress={() => {
            setShared(!shared)
            setSharedReceive(false)
          }}
         
          color={shared === true ? 'rgba(112, 161, 255,1.0)' : 'rgba(112, 161, 255,0.5)'}
        >
          <InstructionText>Send</InstructionText>
        </ProfileCompleteTouchable> 
        </View>
        {shared || sharedReceive ? (
          <>
          
            <Label>Tap to Assign</Label>
            <Label>Only this member will be notified.</Label>
            <View style={{flexDirection: 'row', width: '100%'}}>
              
              {home.users.map((member) => (
                <NewTaskOccurenceButton
                  selected={assigned === member.name ? true : false}
                  onPress={() => {
                    setAssigned(assigned !== member.name ? member.name : null)
                  }}
                >
                  <InstructionText>{member.name}</InstructionText>
                </NewTaskOccurenceButton>
              ))}
            </View>
          </>
        ) : null}
      </>
      )
    }
  }

  return (
    <NewBillContainer animation="bounceIn" >
    <KeyboardAvoidingScrollView
    contentInsetAdjustmentBehavior={'automatic'}
      showsVerticalScrollIndicator={false}
      contentInset={{top: 0, bottom: 350, left: 0, right: 0}}
      style={{ flex: 1, borderRadius: 20, marginTop: '10%' }}

    >
      <View  style={{marginTop: '10%'}}>
      <Label>IOU Description</Label>
        <View style={{ height: 75}}>
          

            <TextInput
              returnKeyType="go"
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Lunch"
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCapitalize="words"
              autoCorrect
              style={styles.newItemTextInput}
              onFocus={() => setNameSelected(true)}
              onEndEditing={() => setNameSelected(false)}
            />
          </View>
          <Label>Amount</Label>
        <View style={{ height: 75 }}>
          
            <TextInputMask
              mask={parseInt(amount) > 1000 ? '$[0],[000]' : '$[0000]'}
              returnKeyType="done"
              value={amount}
              style={{ fontSize: 40, textAlign: 'center', flex: 1, marginVertical: '4%' }}
              keyboardType="number-pad"
              onChangeText={(formatted, extracted) => setAmount(extracted)}
              placeholder="$20"
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
          <View>

          </View>
          <Label style={{marginVertical: '5%', marginHorizontal: '1%', fontSize: 18}}>When should this be paid back?</Label>
          <NewIouCalendar
            markedDates={markedDates}
            minDate={Date()}
            maxDate={new XDate().addMonths(1)}
            current={due ? due.dateString : new Date()}
            onDayPress={(day) => onDaySelect(day)}
          />
          <ProfileCompleteTouchable friction={10} tension={300}
            onPress={() => {
              if (name === null || name === undefined) {
                Alert.alert("You didn't specify a description for this IOU.")
                return
              }
              if (amount === null || amount === undefined) {
                Alert.alert("You didn't specify an amount for this IOU.")
                return
              }
              if (assigned === null || assigned === undefined) {
                Alert.alert("You didn't specify the person that owes you.")
                return
              }
              const newItemObj = {
                type: 'iou',
                shared,
                sharedReceive,
                id: Math.random(),
                due,
                name,
                user: assigned,
                amount,
                createdBy: user.username
              }
              dispatch(addItem(newItemObj))
              navigation.navigate('Main')
            }}
            color="rgba(255, 165, 2,1.0)"
          >
            <NewBillButtonText>Save New IOU</NewBillButtonText>
          </ProfileCompleteTouchable> 
          </View>
        </KeyboardAvoidingScrollView>
    </NewBillContainer>
  )
}
