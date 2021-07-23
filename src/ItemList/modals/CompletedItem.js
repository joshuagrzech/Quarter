import React from 'react'
import { styles } from './styled-components/stylesheet.js.js'
import { TouchableOpacity } from 'react-native'

import Modal from 'react-native-modal'
import { CompletedItemMainText, CompletedItemButtonText } from '../styled-components/Text'
import { CompletedItemContainerView } from '../styled-components/View'

export const CompletedItem = (props) => {
  const mainText = () => {
    if (props.item.type === 'bill') {
      return 'Mark this bill as paid?'
    }
    if (props.item.type === 'iou') {
      return `You Owe $${props.item.amount}`
    }
    if (props.item.type === 'task') {
      return props.item.title
    }
  }

  const onPressConfirm = () => {}

  return (
    <Modal hasBackdrop backdropOpacity={0.5} isVisible={props.visible} onBackdropPress={props.toggle}>
      <View style={styles.style15}>
        <CompletedItemMainText>{mainText()}</CompletedItemMainText>
        <CompletedItemContainerView>
          <TouchableOpacity onPress={onPressConfirm()}>
            <View
              style={{
                marginRight: '5%',
                height: 50,
                width: 100,
                borderRadius: 10,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00b894'
              }}
            >
              <CompletedItemButtonText>Yes</CompletedItemButtonText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressConfirm()}>
            <View
              style={{
                marginLeft: '5%',
                height: 50,
                width: 100,
                borderRadius: 10,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#d63031'
              }}
            >
              <CompletedItemButtonText>No</CompletedItemButtonText>
            </View>
          </TouchableOpacity>
        </CompletedItemContainerView>
      </View>
    </Modal>
  )
}
