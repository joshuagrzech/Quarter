import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { View, Animated, TextInput, ScrollView } from 'react-native'

import XDate from 'xdate'
import { useDispatch, useSelector } from 'react-redux'
import TouchableScale from 'react-native-touchable-scale'
import { addItem } from 'redux-store/reducers/item'
import { modalOpenAnimations } from 'animations'
import { ConnectBankSharedElementDecoy } from '../../../styled-components/SharedElementViewContainer'
import {
  SharedDetailContainer,
  ConnectBankContainer,
  TransactionEditContainer,
  TransactionAssignContainer,
  TransactionAssignButtonContainer
} from '../../../styled-components/View'
import { RecentTransactionLinearGradient } from 'styled_components'
import {
  TransactionSaveButtonText,
  TransactionAssignInstructionText,
  TransactionAmountText,
  InstructionText
} from '../../../styled-components/Text'
import { TransactionAssignButton } from '../../../styled-components/Touchables'

export const RecentTransactionDetail = (props) => {
  const item = props.navigation.getParam('item')
  const home = useSelector((state) => state.home)
  const userName = useSelector((state) => state.user.username)
  const { navigation } = props
  const [assigned, setAssigned] = React.useState()
  const [newName, setNewName] = React.useState()
  const dispatch = useDispatch()
  const cardViewHeight = React.useRef(new Animated.Value(0.75)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const [amountSelected, setAmountSelected] = React.useState()
  const [nameSelected, setNameSelected] = React.useState()
  const [amount, setAmount] = React.useState()
  const [shared, setShared] = React.useState(false)
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current
  modalOpenAnimations(cardViewHeight, buttonOpacity, backgroundOpacity)

  return (
    <>
      {' '}
      <View>
        <SharedDetailContainer id="transaction">
          <ConnectBankSharedElementDecoy />
        </SharedDetailContainer>
      </View>
      <Animated.ModalDarkBackground />
      <ConnectBankContainer>
        <Animated.TransactionDetailView>
          <RecentTransactionLinearGradient colors={['#ee0947', '#b50736']}>
            <View style={styles.style12}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentInset={{ top: 150, left: 0, bottom: 200, right: 0 }}
                contentstyle={styles.newBillScrollContainer}
              >
                <TransactionEditContainer>
                  <View shadowColor={nameSelected ? 'green' : '#2f3542'} style={styles.style230}>
                    <TextInput
                      returnKeyType="go"
                      value={newName}
                      onChangeText={(text) => setNewName(text)}
                      placeholder={item.merchant_name}
                      placeholderTextColor="gray"
                      autoCapitalize="words"
                      autoCorrect
                      onFocus={() => setNameSelected(true)}
                      onEndEditing={() => setNameSelected(false)}
                    />
                  </View>
                  <TransactionAmountText>${item.amount}</TransactionAmountText>
                  <View shadowColor={amountSelected ? 'green' : '#2f3542'} style={styles.style233}>
                    <TextInput
                      returnKeyType="go"
                      style={styles.newItemTextInput}
                      value={amount}
                      keyboardType="number-pad"
                      onChangeText={(text) => setAmount(text)}
                      placeholder={`$${item.amount} Due`}
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onFocus={() => setAmountSelected(true)}
                      onEndEditing={() => setAmountSelected(false)}
                    />
                  </View>
                  <TransactionAssignContainer>
                    <TransactionAssignInstructionText>Tap to Assign</TransactionAssignInstructionText>

                    <TransactionAssignButtonContainer>
                      {home.users.map((member) => (
                        <TransactionAssignButton
                          onPress={() => {
                            setAssigned(member.name)
                            setShared(true)
                          }}
                        >
                          <InstructionText>{member.name}</InstructionText>
                        </TransactionAssignButton>
                      ))}
                    </TransactionAssignButtonContainer>
                  </TransactionAssignContainer>
                </TransactionEditContainer>

                <TouchableScale friction={10} tension={300}
                  onPress={() => {
                    const newItemObj = {
                      type: 'iou',
                      due: new XDate(),
                      shared,
                      id: item.transaction_id,
                      baseTransaction: item,
                      user: assigned,
                      name: newName || item.merchant_name,
                      amount: amount || item.amount,
                      createdBy: userName
                    }
                    dispatch(addItem(newItemObj))
                    navigation.push('Main')
                  }}
                >
                  <TransactionSaveButtonText>Save New IOU</TransactionSaveButtonText>
                </TouchableScale>
              </ScrollView>
            </View>
          </RecentTransactionLinearGradient>
        </Animated.TransactionDetailView>
      </ConnectBankContainer>
    </>
  )
}

RecentTransactionDetail.sharedElements = (navigation, otherNavigation, showing) => {
  if (showing) {
    return [{ id: 'transaction', animation: 'move' }]
  }
}
