import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { useDispatch, useSelector } from 'react-redux'
import XDate from 'xdate'

import { addItem } from 'redux-store/reducers/item'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { InstructionText, NewTaskInstructionText, NewTaskSmallText, NewBillButtonText } from '../styled-components/Text'
import { View, TextInput, Alert } from 'react-native'
import { NewBillContainer, NewTaskOccurenceButtonView } from '../styled-components/View/components'
import { NewIouCalendar } from '../styled-components/Calendar'
import { NewTaskOccurenceButton } from '../styled-components/Touchables/components'
import { ProfileCompleteTouchable, HomeSettingsContainer, Label } from 'styled_components'
export const NewTask = (props) => {
  const dispatch = useDispatch()
  const { navigation } = props
  const [shared, setShared] = React.useState(false)
  const [markedDates, setMarkedDates] = React.useState({})
  const [amountSelected, setAmountSelected] = React.useState()
  const [notes, setNotes] = React.useState()
  const [due, setDue] = React.useState()
  const [name, setName] = React.useState()
  const [monthly, setMonthly] = React.useState(false)
  const [weekly, setWeekly] = React.useState(false)
  const [nameSelected, setNameSelected] = React.useState(false)

  const [assigned, setAssigned] = React.useState()
  const user = useSelector((state) => state.user)
  const home = useSelector((state) => state.home)

  const onDaySelect = (day) => {
    const dateObj = {}
    dateObj[`${day.dateString}`] = { selected: true, selectedColor: '#fdcb6e' }
    setMarkedDates({ ...markedDates, ...dateObj })
    setDue(day.dateString)
  }

  const isSharedHome = () => {
    if (home.users.length > 0) {
      return (
        <>
          <View style={{ flex: 0.005 }}>
            <ProfileCompleteTouchable friction={10} tension={300}
              onPress={() => setShared(shared !== true)}
              color={shared === true ? 'rgba(112, 161, 255,1.0)' : 'rgba(112, 161, 255,0.5)'}
            >
              <InstructionText>{shared ? 'Tap to Un-Split' : 'Tap to Split'}</InstructionText>
            </ProfileCompleteTouchable> 
          </View>
          {shared ? (
            <>

              <Label>Tap to Assign</Label>
              <Label>Only this member will be reminded.</Label>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <NewTaskOccurenceButton
                  selected={assigned === user.username ? true : false}
                  onPress={() => {
                    setAssigned(assigned !== user.username ? user.username : null)
                  }}
                >
                  <InstructionText>Me</InstructionText>
                </NewTaskOccurenceButton>
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
        contentInset={{ top: 0, bottom: 450, left: 0, right: 0 }}
        style={{ flex: 1, borderRadius: 20, marginTop: '10%' }}

      >
        <View style={{ paddingTop: '10%', flex: 1 }}>
          <Label>Task Name</Label>
          <View style={{ height: 75 }}>


            <TextInput
              returnKeyType="go"
              style={{ fontSize: 40, textAlign: 'center', marginVertical: '4%' }}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Trash"
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCapitalize="words"
              autoCorrect
              constainerStyle={{ flex: 1 }}
              onFocus={() => setNameSelected(true)}
              onEndEditing={() => setNameSelected(false)}
            />
          </View>
          <Label>Task Description</Label>
          <View style={{ height: 85, alignItems: 'center' }}>
            <TextInput
              returnKeyType="go"
              value={notes}
              multiline={true}
              numberOfLines={2}
              style={{ fontSize: 20, textAlign: 'auto', marginVertical: '4%', marginHorizontal: '2%' }}
              onChangeText={(text) => setNotes(text)}
              placeholder="Take trash to curb with recycling every other week."
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCorrect
              onFocus={() => setAmountSelected(true)}
              onEndEditing={() => setAmountSelected(false)}
            />
          </View>
          <HomeSettingsContainer>

            {isSharedHome()}

            <NewIouCalendar
              markedDates={markedDates}
              minDate={Date()}
              maxDate={new XDate().addMonths(1)}
              current={due ? due.dateString : new Date()}
              onDayPress={(day) => onDaySelect(day)}
              style={{ flex: 1 }}
            />
            <NewTaskOccurenceButtonView style={{flex: 0.25, flexDirection: 'row'}}>              
              <NewTaskOccurenceButton
                selected={monthly}
                style={{ flex: 1, height: 45 }}
                onPress={() => {
                  setMonthly(!monthly)
                }}
              >
                <InstructionText style={{ marginTop: '7%' }}>Monthly</InstructionText>
              </NewTaskOccurenceButton>
              <NewTaskOccurenceButton
                selected={weekly}
                style={{ flex: 1, height: 45}}

                onPress={() => {
                  setWeekly(!weekly)
                }}
              >
                <InstructionText style={{ marginTop: '7%' }}>Weekly</InstructionText>
              </NewTaskOccurenceButton>
            </NewTaskOccurenceButtonView>
            <ProfileCompleteTouchable friction={10} tension={300}
              onPress={() => {
                if (name === null || name === undefined) {
                  Alert.alert("You didn't specify a name for this Task.")
                  return
                }
                if (due === null || due === undefined) {
                  Alert.alert("You didn't specify a due date for this Task.")
                  return
                }
                const newItemObj = {
                  type: 'task',
                  shared,
                  id: Math.random(),
                  weekly,
                  monthly,
                  due,
                  title: name,
                  notes,
                  user: assigned,
                  createdBy: user.username
                }
                dispatch(addItem(newItemObj))
                navigation.navigate('Main')
              }}
              style={{ marginTop: '-5%' }}
              color="#ff00cc"
            >
              <NewBillButtonText>Save New Task</NewBillButtonText>
            </ProfileCompleteTouchable> 
          </HomeSettingsContainer>
        </View>
      </KeyboardAvoidingScrollView>
    </NewBillContainer>
  )
}
