import React from 'react'
import { styles } from 'assets/stylesheet.js'

import XDate from 'xdate'
import { SharedElement } from 'react-native-shared-element'
import TouchableScale from 'react-native-touchable-scale'
import LinearGradient from 'react-native-linear-gradient'
import RNFetchBlob from 'rn-fetch-blob'
import {
  RecentTransactionDateText,
  TransactionNumberText,
  TransactionDetailText,
  TransactionDetailNumberText
} from '../styled-components/Text/components'
import { RecentTransactionDateContainer } from '../styled-components/View'
import { HomeListItemContainer } from 'styled_components'
export const Transaction = (props) => {
  const recObject = props.item.reocurringData
  const { item } = props
  const name = item.merchant_name || item.name
  const { fs } = RNFetchBlob

  if (item.logo) {
    let imagePath = null
    RNFetchBlob.config({ fileCache: true })
      .fetch('GET', `${item.logo}`)
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path()
        return resp.readFile('base64')
      })
      .then((base64Data) => {
        fs.unlink(imagePath)
      })
  }
  const onPressTransaction = () => {
    props.navigation.push('TransactionDetail', { item })
  }
  let average
  Object.keys(recObject).forEach((key) => {
    if (key === 'times' || key === 'dates') {
      return
    }
    if (average !== undefined) {
      average += recObject[key]
    } else {
      average = recObject[key]
    }
  })
  const roundAaverage = parseInt(average / recObject.times)

  if (Math.sign(average) === -1) {
    return null
  }
  if (average > 50) {
    return (
      <>
        {' '}
        <SharedElement id="transaction">
          <TouchableScale friction={10} tension={300} onPress={onPressTransaction}>
            <View style={styles.style333}>
              <RecentTransactionDateText>{name}</RecentTransactionDateText>

              <HomeListItemContainer>
                <RecentTransactionDateContainer>
                  <TransactionNumberText>
                    {XDate(item.reocurringData.dates[0]).toString('MMM')}{' '}
                    {XDate(item.reocurringData.dates[0]).toString('dd')}
                  </TransactionNumberText>
                </RecentTransactionDateContainer>
                <RecentTransactionDateContainer>
                  <TransactionNumberText>
                    {XDate(item.reocurringData.dates[1]).toString('MMM')}{' '}
                    {XDate(item.reocurringData.dates[1]).toString('dd')}
                  </TransactionNumberText>
                </RecentTransactionDateContainer>
                <RecentTransactionDateContainer>
                  <TransactionNumberText>
                    {XDate(item.reocurringData.dates[2]).toString('MMM')}{' '}
                    {XDate(item.reocurringData.dates[2]).toString('dd')}
                  </TransactionNumberText>
                </RecentTransactionDateContainer>
              </HomeListItemContainer>
              <TransactionNumberText>${roundAaverage} avg</TransactionNumberText>
            </View>
          </TouchableScale>
          <RecentTransactionDateContainer>
            <LinearGradient colors={['#b0191b', '#d63031']}>
              <TransactionDetailText>Paid</TransactionDetailText>
              <TransactionDetailNumberText>{recObject.times}x</TransactionDetailNumberText>
            </LinearGradient>
          </RecentTransactionDateContainer>
        </SharedElement>
      </>
    )
  }
  const subObj = item.subscription
  let subs = []
  Object.keys(subObj).forEach((subscription) => {
    if (subObj[subscription] === false) {
      return null
    }
    subs = [...subs, subscription]
  })
  if (subs) {
    return subs.map((sub) => (
      <>
        {' '}
        <SharedElement id="transaction">
          <TouchableScale friction={10} tension={300} onPress={onPressTransaction}>
            <View style={styles.style349}>
              <RecentTransactionDateContainer>
                <RecentTransactionDateContainer>
                  <TransactionNumberText>{name}</TransactionNumberText>
                  <TransactionNumberText>$ {sub}/mo</TransactionNumberText>
                </RecentTransactionDateContainer>
              </RecentTransactionDateContainer>
            </View>

            <RecentTransactionDateContainer>
              <LinearGradient colors={['#b0191b', '#d63031']}>
                <TransactionNumberText>Sub</TransactionNumberText>
              </LinearGradient>
            </RecentTransactionDateContainer>
          </TouchableScale>
        </SharedElement>
      </>
    ))
  }
}
