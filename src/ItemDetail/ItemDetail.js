import React from 'react'
import XDate from 'xdate'
import { View, Animated, Alert } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BillType, IouType, TaskType } from './screens'
import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import { useDispatch, useSelector } from 'react-redux'
import { archiveItem } from 'redux-store/reducers/item'
import { styles } from 'assets/stylesheet.js'
import {TransactionAssignButton} from 'styled_components'
import { BillTypeContainer } from './styled-components/View'
import { ItemNameText, BillDueText, DueDateText } from './styled-components/Text'
import { MainContainer, DueDateContainer } from 'styled_components'
const ItemDetail = (props) => {
  const item = props.navigation.getParam('item')
  const home = useSelector((state) => state.home)

  const { navigation } = props
  const currentUser = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  const [eachTotalVisible, setEachTotalVisible] = React.useState(false)
  const user = useSelector((state) => state.user.username)
  const iconType = () => {
    if (item.type === 'bill') {
      return 'funnel-dollar'
    }
    if (item.type === 'iou') {
      return 'hand-holding-usd'
    }
    if (item.type === 'task') {
      return 'tasks'
    }
  }
  const colorFromType = () => {
    if (item.type === 'bill') {
      return '#34e89e'
    }
    if (item.type === 'iou') {
      return '#ff6a00'
    }
    if (item.type === 'task') {
      return '#ff00cc'
    }
    return '#0f3443'
  }

  const itemDetails = () => {
    if (item.type === 'bill') {
      return <BillType item={item} />
    }
    if (item.type === 'iou') {
      return <IouType item={item} />
    }
    if (item.type === 'task') {
      return <TaskType item={item} />
    }
  }
  const mainText = () => {
    if (item.type === 'bill') {
      return item.name
    }
    if (item.type === 'iou') {
      if (item.user === currentUser) {
        return `You Owe $${item.amount}`
      }
      return `${item.user} Owes ${item.createdBy === currentUser ? 'You' : item.createdBy}`
    }
    if (item.type === 'task') {
      return item.title
    }
  }
  const secondaryText = () => {
    if (item.type === 'bill') {
      if (item.shared === true) {
        return `$${Math.round(item.amount / (home.users.length + 1))}/ea`
      }
      return `$${item.amount}`
    }
    if (item.type === 'iou') {
      return `$${item.amount}`
    }
    if (item.type === 'task') {
      if (item.user === currentUser) {
        return 'You'
      }
      return item.user
    }
  }
  const daysUntilDue = Math.abs(Math.round(new XDate(item.due).diffDays(new XDate())))
  console.log(daysUntilDue)
  const cardViewHeight = React.useRef(new Animated.Value(1)).current
  const buttonOpacity = React.useRef(new Animated.Value(1)).current
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current
  Animated.spring(cardViewHeight, {
    toValue: 1,
    delay: 0,
    duration: 500,
    useNativeDriver: true
  }).start()
  Animated.spring(buttonOpacity, {
    toValue: 1,
    delay: 200,
    duration: 500,
    useNativeDriver: true
  }).start()
  Animated.timing(backgroundOpacity, {
    useNativeDriver: true,
    toValue: 0.95,
    duration: 200,
    delay: 500
  }).start()

  return (
    <>
      
    
      <SharedElement
        id={`${item.id}.background`}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Animated.View
          style={{
            transform: [{ scaleY: cardViewHeight }, { scaleX: cardViewHeight }],
            position: 'absolute',
            alignSelf: 'center',
            
            height: '100%',
            width: '100%',
            borderRadius: 10,
            justifyContent: 'center',
            shadowOffset: {
              width: 0,
              height: 0
            }
          }}
        >
          <LinearGradient
            colors={['#f1f2f6', '#dfe4ea']}
            style={{
              height: '100%',
              borderRadius: 20,
              justifyContent: 'center',
              backgroundColor: '#f1f2f6'
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                alignSelf: 'center',
                alignContent: 'center',
                borderRadius: 10,
                display: 'flex',
                marginTop: '25%'
              }}
            >
              <MainContainer>
      <BillTypeContainer>
      <SharedElement id={`${item.id}.text`}>
      <ItemNameText>{mainText()}</ItemNameText>
            </SharedElement>
        {item.shared ? (
          <>
            
              {!eachTotalVisible ? (
                <ItemNameText>${Math.round(item.amount / (home.users.length + 1))}</ItemNameText>
              ) : (
                <ItemNameText>${item.amount}</ItemNameText>
              )}
              <TransactionAssignButton color="#2f3542" onPress={() => setEachTotalVisible(!eachTotalVisible)}>
                <ItemNameText> {eachTotalVisible ? 'Total' : 'Each'}</ItemNameText>
              </TransactionAssignButton>
            
          </>
        ) : (
<SharedElement id={`${item.id}.text2`}>
              <ItemNameText>{secondaryText()}</ItemNameText>
            </SharedElement>        )}

        <BillDueText>
          Due in {daysUntilDue} Day{daysUntilDue === 1 ? (' ') : ('s')}
        </BillDueText>
        <DueDateContainer>
          <DueDateText>{new XDate(item.due).toLocaleDateString(new XDate())}</DueDateText>
        </DueDateContainer>
      </BillTypeContainer>
    </MainContainer>
              
            
            </View>
          </LinearGradient>
        </Animated.View>
      </SharedElement>
   
      <SharedElement
        id={`${item.id}.icon`}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: '5%'
        }}
      >
        <Icon
          name={iconType()}
          color={colorFromType()}
          style={{
            fontSize: 75
          }}
        />
      </SharedElement>
    </>
  )
}

ItemDetail.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam('item')
  if (showing) {
    return [
      { id: `${item.id}.background`, animation: 'fade' },
      { id: `${item.id}.icon`, animation: 'fade' },
      { id: `${item.id}.text`, animation: 'fade' },
      { id: `${item.id}.text2`, animation: 'fade' }
    ]
  }
}

export default ItemDetail
