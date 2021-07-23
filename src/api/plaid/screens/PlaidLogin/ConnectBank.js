/* eslint-disable no-shadow */
// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React from 'react'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addTransactions } from 'redux-store/reducers/user'

import {
  ConnectBankSharedElementContainer,
  PlaidInfoContainer,
  TransactionListContainer,
  ConnectBankSharedElementDecoy,
  ConnectBankContainer
} from '../../styled-components/View'
import { PlaidInfoBigText, PlaidInfoText } from '../../styled-components/Text'

import { Plaid, parseReocurringTransactions } from '../../functions/plaid'
import XDate from 'xdate'
import Transaction from '../../Touchables'
import LottieView from 'lottie-react-native'
import TouchableScale from 'react-native-touchable-scale'
import LinearGradient from 'react-native-linear-gradient'
import AnimatedFlatlist from 'react-native-animated-flatlist'
import { Loading, MinusToPlus } from 'assets/Images/lottiefiles'
import { modalCloseAnimations, modalOpenAnimations } from 'animations'
import { styles } from 'assets/stylesheet.js'
import { LottieCloseButton } from '../../styled-components/LottieView'
import { LottieCloseContainer, LottieCloseContainerView } from 'styled_components'
export const ConnectBank = (props) => {
  const dispatch = useDispatch()
  const plaidData = useSelector((state) => state.user.plaidData)
  const [refreshing, setRefresing] = React.useState(false)
  const today = new XDate()
  const sixMonths = today.addMonths(-6).toISOString().split('T')[0]
  const todayString = today.toISOString().split('T')[0]
  const [loading, setLoading] = React.useState(true)
  const { navigation } = props
  const [reocurringItems, setReocurringItems] = React.useState()

  const printedRec = {}
  const printedSubs = {}

  const loadTransactions = async () => {
    setReocurringItems([])
    setRefresing(true)
    setTimeout(() => {
      setRefresing(false)
    }, 2000)
    const response = await fetch('http://192.168.1.191:2798/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: plaidData.access_token,
        startDate: sixMonths,
        end: todayString
      })
    })
      .then((data) => data.json())
      .then((json) => {
        return parseReocurringTransactions(json.transactions)
      })

    const reocurringItems = response.filter((object) => {
      if (object !== undefined) {
        return object
      }
    })
    dispatch(
      addTransactions({
        transactions: {
          data: reocurringItems,
          access_token: plaidData.accessToken
        }
      })
    )
    setRefresing(false)
    return true
  }

  const renderItem = (item) => {
    const thisItem = item.item
    return <Transaction navigation={navigation} item={thisItem} printedRec={printedRec} printedSubs={printedSubs} />
  }

  setTimeout(() => {
    setLoading(false)
    if (plaidData) {
      if (plaidData.transactions !== null && plaidData.transactions !== undefined) {
        setReocurringItems(plaidData.transactions.data)
      }
    }
  }, 2000)

  const cardViewHeight = React.useRef(new Animated.Value(0)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const addRemovePosition = React.useRef(new Animated.Value(0)).current
  modalOpenAnimations(cardViewHeight, buttonOpacity, addRemovePosition)

  return (
    <>
      {' '}
      <ConnectBankSharedElementContainer>
        <ConnectBankSharedElementDecoy />
      </ConnectBankSharedElementContainer>
      <Animated.ModalDarkBackground />
      <ConnectBankContainer>
        <Animated.ConnectBankModalContainer>
          <LinearGradient colors={['#00cec9', '#74b9ff']}>
            <View style={styles.style248}>
              {plaidData === null || plaidData === undefined ? (
                <PlaidInfoContainer>
                  <PlaidInfoBigText>Automatically Add Monthly Expenses From Your Bank </PlaidInfoBigText>

                  <Plaid />

                  <PlaidInfoText>
                    We use Plaid™ to connect. None of your data will leave your device, except for Plaid authentication.{' '}
                  </PlaidInfoText>
                  <PlaidInfoText>To learn more about Plaid, visit </PlaidInfoText>
                  <PlaidInfoText>plaid.com</PlaidInfoText>
                </PlaidInfoContainer>
              ) : (
                <LottieCloseContainer>
                  {loading === true ? (
                    <LottieView autoPlay loop source={Loading} />
                  ) : (
                    <TransactionListContainer>
                      <AnimatedFlatlist
                        items={reocurringItems}
                        id="name"
                        refreshing={refreshing}
                        onRefresh={() => loadTransactions()}
                        inAnimation="bounceIn"
                        outAnimation="bounceOut"
                        rowItem={(item) => renderItem(item)}
                        style={styles.style257}
                      />
                    </TransactionListContainer>
                  )}
                </LottieCloseContainer>
              )}
            </View>
          </LinearGradient>
        </Animated.ConnectBankModalContainer>
      </ConnectBankContainer>
      <Animated.View258>
        <TouchableScale friction={10} tension={300}
          onPress={() => {
            modalCloseAnimations(cardViewHeight, buttonOpacity, addRemovePosition)
            navigation.goBack()
          }}
        >
          <LottieCloseContainer>
            <LottieCloseContainerView id="plus_button">
              <LottieCloseButton source={MinusToPlus} progress={addRemovePosition} />
            </LottieCloseContainerView>
          </LottieCloseContainer>
        </TouchableScale>
      </Animated.View258>
    </>
  )
}
ConnectBank.sharedElements = (navigation, otherNavigation, showing) => {
  if (showing) {
    return [{ id: 'connect_bank', animation: 'fade' }]
  }
}
