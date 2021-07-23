import React from 'react'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addTransactions } from 'redux-store/reducers/user'

import Plaid from 'api/plaid'
import XDate from 'xdate'
import { RecentTransaction } from '../../../styled-components/Touchables'
import LottieView from 'lottie-react-native'
import TouchableScale from 'react-native-touchable-scale'
import LinearGradient from 'react-native-linear-gradient'
import AnimatedFlatlist from 'react-native-animated-flatlist'
import { SharedElement } from 'react-navigation-shared-element'
import { Loading, MinusToPlus } from 'assets/Images/lottiefiles'
import { modalOpenAnimations } from 'animations/modalAnimations'
import {
  ConnectBankSharedElementContainer,
  ConnectBankContainer,
  PlaidInfoContainer,
  TransactionListContainer,
  LottieCloseContainerView
} from '../../../styled-components/View'
import { LottieCloseContainer } from 'styled_components'
import { styles } from 'assets/stylesheet.js'
import { PlaidInfoBigText, PlaidInfoText } from '../../../styled-components/Text'
import { LottieCloseButton } from '../../../styled-components/LottieView'
import { ConnectBankSharedElementDecoy } from '../../../styled-components/SharedElementViewContainer'

export const RecentTransactions = (props) => {
  const dispatch = useDispatch()
  const plaidData = useSelector((state) => state.user.plaidData)
  const [refreshing, setRefresing] = React.useState(false)
  const today = new XDate()
  const threeDays = today.addDays(-3).toISOString().split('T')[0]
  const todayString = today.toISOString().split('T')[0]
  const [loading, setLoading] = React.useState(true)
  const { navigation } = props
  const [recentTransactions, setRecentTransactions] = React.useState()

  const loadTransactions = async () => {
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
        startDate: threeDays,
        end: todayString
      })
    })
      .then((data) => data.json())
      .then((json) => {
        return json.transactions
      })
    const recentTransactionsArray = response.filter((object) => {
      if (object !== undefined) {
        return object
      }
    })
    dispatch(
      addTransactions({
        transactions: {
          recentTransactionsArray,
          access_token: plaidData.accessToken
        }
      })
    )
    setRefresing(false)
    return true
  }

  const renderItem = (item) => {
    const thisItem = item.item
    return <RecentTransaction navigation={navigation} item={thisItem} />
  }

  setTimeout(() => {
    setLoading(false)
    if (plaidData) {
      if (plaidData.transactions !== null && plaidData.transactions !== undefined) {
        setRecentTransactions(plaidData.transactions.recentTransactions)
      }
    }
  }, 2000)

  const cardViewHeight = React.useRef(new Animated.Value(0)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const addRemovePosition = React.useRef(new Animated.Value(0)).current
  modalOpenAnimations(cardViewHeight, addRemovePosition, buttonOpacity)

  return (
    <>
      {' '}
      <ConnectBankSharedElementContainer>
        <SharedElement id="connect_bank">
          <ConnectBankSharedElementDecoy />
        </SharedElement>
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
                        items={recentTransactions}
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
            Animated.spring(cardViewHeight, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true
            }).start()
            Animated.timing(buttonOpacity, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true
            }).start()
            Animated.spring(addRemovePosition, {
              toValue: 0,

              duration: 50,
              useNativeDriver: true
            }).start()

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
RecentTransactions.sharedElements = (navigation, otherNavigation, showing) => {
  if (showing) {
    return [{ id: 'connect_bank', animation: 'fade' }]
  }
}
