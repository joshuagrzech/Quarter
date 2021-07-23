import React from 'react'

import XDate from 'xdate'
import TouchableScale from 'react-native-touchable-scale'
import { RecentTransactionSharedElement } from '../styled-components/SharedElementViewContainer'
import { Text, View } from 'react-native'
import { RecentTransactionDateContainer } from '../styled-components/View'
import { RecentTransactionDateText } from '../styled-components/Text'
import { styles } from 'assets/stylesheet.js'

export const RecentTransaction = (props) => {
  const { item } = props
  const name = item.merchant_name || item.name

  const onPressTransaction = () => {
    props.navigation.push('RecentTransactionDetail', { item })
  }

  return (
    <>
      <RecentTransactionSharedElement id="transaction">
        <TouchableScale friction={10} tension={300} onPress={onPressTransaction}>
          <View style={styles.style18}>
            <Text>{name}</Text>
            <View>
              <RecentTransactionDateContainer>
                <RecentTransactionDateText>
                  {XDate(item.date).toString('MMM')} {XDate(item.date).toString('dd')}
                </RecentTransactionDateText>
              </RecentTransactionDateContainer>
            </View>
            <Text>${item.amount}</Text>
          </View>
        </TouchableScale>
      </RecentTransactionSharedElement>
    </>
  )
}
