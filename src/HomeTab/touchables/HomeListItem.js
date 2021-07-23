import React from 'react'
import { SharedElement } from 'react-navigation-shared-element'
import { useSelector } from 'react-redux'
import TouchableScale from 'react-native-touchable-scale'
import { HomeListItemMainText, HomeListItemSecondaryText } from '../styled-components/Text'
import { HomeListItemSharedElementContainer, HomeListItemViewContainer } from 'styled_components'
import { HomeListItemContainer, HomeListItemIcon, RecentTransactionLinearGradient } from 'styled_components'

export const HomeListItem = (props) => {
  const home = useSelector((state) => state.home)
  const currentUser = useSelector((state) => state.user.username)
  const iconType = () => {
    if (props.item.type === 'bill') {
      return 'funnel-dollar'
    }
    if (props.item.type === 'iou') {
      return 'hand-holding-usd'
    }
    if (props.item.type === 'task') {
      return 'tasks'
    }
  }
  const colorFromType = () => {
    if (props.item.type === 'bill') {
      return '#34e89e'
    }
    if (props.item.type === 'iou') {
      return '#ff6a00'
    }
    if (props.item.type === 'task') {
      return '#ff00cc'
    }
    return '#0f3443'
  }
  const mainText = () => {
    if (props.item.type === 'bill') {
      return props.item.name
    }
    if (props.item.type === 'iou') {
      if (props.item.user === currentUser) {
        return `You Owe $${props.item.amount}`
      }
      return `${props.item.user} Owes ${props.item.createdBy === currentUser ? 'You' : props.item.createdBy}`
    }
    if (props.item.type === 'task') {
      return props.item.title
    }
  }
  const secondaryText = () => {
    if (props.item.type === 'bill') {
      if (props.item.shared === true) {
        return `$${Math.round(props.item.amount / (home.users.length + 1))}/ea`
      }
      return `$${props.item.amount}`
    }
    if (props.item.type === 'iou') {
      return `$${props.item.amount}`
    }
    if (props.item.type === 'task') {
      if (props.item.user === currentUser) {
        return 'You'
      }
      return props.item.user
    }
  }

  return (
    <>
      <HomeListItemViewContainer id={`${props.item.id}.background`}>
        <TouchableScale friction={10} tension={300}
          style={{ display: 'flex', shadowOffset: {height: 2, width: 2}, shadowRadius: 5, shadowColor: 'black', shadowOpacity: 0.25 }}
          onPress={() => props.navigation.push('Detail', { item: props.item })}
        >
          <HomeListItemSharedElementContainer>
            <SharedElement id={`${props.item.id}.icon`}>
              <HomeListItemIcon name={iconType()} size={40} color={colorFromType()} />
            </SharedElement>
          </HomeListItemSharedElementContainer>
          <SharedElement id={`${props.item.id}.background`}>
            <RecentTransactionLinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#f1f2f6', '#dfe4ea']}
            >
              <HomeListItemContainer>
                <SharedElement id={`${props.item.id}.text`}>
                  <HomeListItemMainText>{mainText()}</HomeListItemMainText>
                </SharedElement>
                <SharedElement id={`${props.item.id}.text2`}>
                  <HomeListItemSecondaryText>{secondaryText()}</HomeListItemSecondaryText>
                </SharedElement>
              </HomeListItemContainer>
            </RecentTransactionLinearGradient>
          </SharedElement>
        </TouchableScale>
      </HomeListItemViewContainer>
    </>
  )
}

