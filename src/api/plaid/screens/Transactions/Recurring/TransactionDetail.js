/* eslint-disable no-shadow */
import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { Alert, Text, Animated, Easing, TextInput, TouchableOpacity } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import LinearGradient from 'react-native-linear-gradient'

import XDate from 'xdate'
import { useDispatch, useSelector } from 'react-redux'
import TouchableScale from 'react-native-touchable-scale'
import { LineChart } from 'react-native-chart-kit'
import { addItem } from 'redux-store/reducers/item'
import {
  TransactionDetailSharedElementContainerAndDecoy,
  ModalDarkBackground
} from '../../../styled-components/View/components'
import { TransactionDetailRecurringDateButton } from '../../../styled-components/Touchables/components'
import {
  TransactionDetailInstructionText,
  TransactionDetailRecurringDateButtonText,
  TransactionDetailSaveButtonText
} from '../../../styled-components/Text/components'

export const TransactionDetail = (props) => {
  const item = props.navigation.getParam('item')
  const { navigation } = props
  const [newName, setNewName] = React.useState()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = React.useState(false)
  const cardViewHeight = React.useRef(new Animated.Value(0.75)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const [nameSelected, setNameSelected] = React.useState(false)
  const [dateOneSelected, setDateOneSelected] = React.useState(false)
  const [dateTwoSelected, setDateTwoSelected] = React.useState(false)
  const [shared, setShared] = React.useState(false)
  const userName = useSelector((state) => state.user.username)
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current
  if (isLoaded === false) {
    Animated.spring(cardViewHeight, {
      toValue: 1,
      delay: 0,
      duration: 200,
      useNativeDriver: true
    }).start()
    Animated.timing(buttonOpacity, {
      toValue: 1,
      delay: 0,
      duration: 200,
      useNativeDriver: true
    }).start()

    Animated.timing(backgroundOpacity, {
      useNativeDriver: true,
      toValue: 0.75,
      duration: 200,
      delay: 0,
      easing: Easing.ease
    }).start(() => {
      setIsLoaded(true)
    })
  }
  let amounts = []
  let i = 0
  Object.keys(item.reocurringData).forEach((data) => {
    if (data === 'dates') {
      i++
      return
    }
    const thisDate = new XDate(`${item.reocurringData.dates[i]}`).getWeek()
    if (thisDate >= 1) {
      amounts = [...amounts, { x: thisDate, y: item.reocurringData[data] }]
    }
    i++
  })

  const chartConfig = {
    backgroundGradientFrom: '#f1f2f6',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#f1f2f6',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(45, 52, 54, ${opacity})`,
    strokeWidth: 4, // optional, default 3
    barPercentage: 0.5
  }

  const data = {
    labels: [
      item.reocurringData.dates[2] ? item.reocurringData.dates[2] : 'Start',
      item.reocurringData.dates[1],
      item.reocurringData.dates[0]
    ],
    datasets: [
      {
        data: [
          Object.values(item.reocurringData).filter((item) => typeof item === 'number')[3]
            ? Object.values(item.reocurringData).filter((item) => typeof item === 'number')[3]
            : 0,
          Object.values(item.reocurringData).filter((item) => typeof item === 'number')[2],
          Object.values(item.reocurringData).filter((item) => typeof item === 'number')[1]
        ]
      }
    ]
  }

  return (
    <>
      {' '}
      <TransactionDetailSharedElementContainerAndDecoy>
        <SharedElement id="transaction">
          <TransactionDetailSharedElementContainerAndDecoy />
        </SharedElement>
      </TransactionDetailSharedElementContainerAndDecoy>
      <Animated.ModalDarkBackground />
      <ModalDarkBackground>
        <Animated.TransactionDetailView>
          <LinearGradient colors={['#00cec9', '#74b9ff']}>
            <View style={styles.style283}>
              <ModalDarkBackground>
                <View style={styles.style285}>
                  <TextInput
                    returnKeyType="go"
                    value={newName}
                    onChangeText={(text) => setNewName(text)}
                    placeholder={item.merchant_name.split(' ')[0]}
                    placeholderTextColor="gray"
                    autoCapitalize="words"
                    autoCorrect
                    onFocus={() => setNameSelected(!nameSelected)}
                    onEndEditing={() => setNameSelected(false)}
                  />
                </View>

                <ModalDarkBackground>
                  <LineChart data={data} width={300} height={220} chartConfig={chartConfig} />
                </ModalDarkBackground>
                <ModalDarkBackground>
                  <TouchableOpacity
                    onPress={() => {
                      setDateOneSelected(true)
                      setDateTwoSelected(false)
                    }}
                  >
                    <Text>
                      {new XDate(item.reocurringData.dates[0]).toString('dd') +
                        new XDate(item.reocurringData.dates[0]).toString('S')}{' '}
                      - ${Object.values(item.reocurringData).filter((item) => typeof item === 'number')[1]}
                    </Text>
                  </TouchableOpacity>
                  <TransactionDetailRecurringDateButton
                    onPress={() => {
                      setDateTwoSelected(true)
                      setDateOneSelected(false)
                    }}
                  >
                    <TransactionDetailRecurringDateButtonText>
                      {new XDate(item.reocurringData.dates[1]).toString('dd') +
                        new XDate(item.reocurringData.dates[1]).toString('S')}{' '}
                      - ${Object.values(item.reocurringData).filter((item) => typeof item === 'number')[2]}
                    </TransactionDetailRecurringDateButtonText>
                  </TransactionDetailRecurringDateButton>
                </ModalDarkBackground>
                <TransactionDetailRecurringDateButton onPress={() => setShared(shared !== true)}>
                  <TransactionDetailInstructionText>Split With Roommates</TransactionDetailInstructionText>
                </TransactionDetailRecurringDateButton>
                <TouchableScale friction={10} tension={300}
                  onPress={() => {
                    let due = new XDate()
                    if (dateOneSelected === false && dateTwoSelected === false) {
                      Alert.alert('Please Select a Date & Amount to begin. You can edit this later.')
                    } else {
                      if (dateOneSelected === true) {
                        if (Math.sign(new XDate(item.reocurringData.dates[0]).diffDays(new XDate())) === -1) {
                          due = new XDate(item.reocurringData.dates[0]).addMonths(2)
                        } else {
                          due = new XDate(item.reocurringData.dates[0]).addMonths(1)
                        }
                      } else if (dateTwoSelected === true) {
                        if (Math.sign(new XDate(item.reocurringData.dates[1]).diffDays(new XDate())) === -1) {
                          due = new XDate(item.reocurringData.dates[1]).addMonths(2)
                        } else {
                          due = new XDate(item.reocurringData.dates[1]).addMonths(1)
                        }
                      }
                      const newItemObj = {
                        type: 'bill',
                        shared,
                        id: Object.keys(item.reocurringData)[1],
                        due,
                        name: newName || item.merchant_name,
                        amount: dateOneSelected
                          ? Object.values(item.reocurringData).filter((item) => typeof item === 'number')[1]
                          : Object.values(item.reocurringData).filter((item) => typeof item === 'number')[2],
                        createdBy: userName
                      }
                      dispatch(addItem(newItemObj))
                      navigation.push('Main')
                    }
                  }}
                >
                  <TransactionDetailSaveButtonText>Save New Bill</TransactionDetailSaveButtonText>
                </TouchableScale>
              </ModalDarkBackground>
            </View>
          </LinearGradient>
        </Animated.TransactionDetailView>
      </ModalDarkBackground>
    </>
  )
}

TransactionDetail.sharedElements = (navigation, otherNavigation, showing) => {
  if (showing) {
    return [{ id: 'transaction', animation: 'move' }]
  }
}
