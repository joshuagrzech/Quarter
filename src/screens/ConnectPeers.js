import { modalCloseAnimations, modalOpenAnimations } from 'animations'
import { Connection, MinusToPlus } from 'assets/Images/lottiefiles'
import React from 'react'
import { FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'

import TouchableScale from 'react-native-touchable-scale'
import Icon from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { updateConnectedMembers } from 'redux-store/reducers/home'
import { styles } from 'assets/stylesheet.js'
import * as Animated from 'react-native-reanimated'
import { LottieCloseButton, ConnectionLottieView } from './styled-components/LottieView'
import { CloseButtonTouchableScale } from './styled-components/Touchables'
import { ExistingText, ConnectText, MemberNameText } from './styled-components/Text'
import {
  SearchStartContainer,
  LottieCloseContainerView,
  LottieCloseContainer,
  ExistingTextContainer,
  PeerSearchContainer
} from './styled-components/View'
import { ProfileCompleteTouchable, ShadowButtonText } from 'styled-components'
export const ConnectPeers = (props) => {
  const { navigation } = props
  const cardViewHeight = React.useRef(new Animated.Value(0)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const addRemovePosition = React.useRef(new Animated.Value(0)).current
  const home = useSelector((state) => state.home)
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.user)
  const [members] = React.useState([])

  const isAdmin = async () => {
    return
  }

  modalOpenAnimations(cardViewHeight, buttonOpacity, buttonOpacity)

  const memberStatus = (member) => {
    if (home.connectedMembers.length === 0) {
      return (
        <TouchableScale friction={10} tension={300} onPress={() => dispatch(updateConnectedMembers(member))}>
          <ConnectText>Connect</ConnectText>
        </TouchableScale>
      )
    }
    return home.connectedMembers.map((existingMember) => {
      if (member.id === existingMember.id) {
        return (
          <ExistingTextContainer>
            <ExistingText>You Have Already Connected With This Roommate</ExistingText>
          </ExistingTextContainer>
        )
      }
      return (
        <TouchableScale friction={10} tension={300} onPress={() => dispatch(updateConnectedMembers(member))}>
          <ConnectText>Connect</ConnectText>
        </TouchableScale>
      )
    })
  }
  const renderMember = (item) => {
    const memberName = item.item.name ? item.item.name : null
    const member = item.item
    return (
      <>
        {' '}
        <TouchableScale friction={10} tension={300}>
          <Animatable.View
            animation="pulse"
            duration={2500}
            useNativeDriver
            iterationCount="infinite"
            shadowColor="#2f3542"
          >
            <Icon name="user" size={50} />
            <MemberNameText>{memberName}</MemberNameText>
          </Animatable.View>
          <Animated.View206>
            <View style={styles.style95}>{memberStatus(member)}</View>
          </Animated.View206>
        </TouchableScale>
      </>
    )
  }

  const searchStart = () => {
    if (profile === undefined || profile === null) {
      return (
        <>
          {' '}
          <TouchableScale friction={10} tension={300} onPress={() => navigation.push('ProfileSettings')}>
            <ProfileCompleteTouchable> Please Complete Your Profile</ProfileCompleteTouchable> 
            <View shadowColor="#2f3542">
              <ShadowButtonText>Take Me to Set Up</ShadowButtonText>
            </View>
          </TouchableScale>
        </>
      )
    }
    isAdmin(false)
    return (
      <>
        <PeerSearchContainer>
          <FlatList
            data={members}
            renderItem={(item) => renderMember(item)}
            style={styles.style351}
            key="name"
            keyExtractor={(item) => item.name}
            contentInset={{ top: 20 }}
            refreshing
            extraData={members}
            showsVerticalScrollIndicator={false}
          />
        </PeerSearchContainer>
      </>
    )
  }

  return (
    <>
      {' '}
      <Animated.ModalDarkBackground />
      <ConnectionLottieView autoPlay loop source={Connection} />
      <SearchStartContainer>{searchStart()}</SearchStartContainer>
      <Animated.ConnectPeersCloseButtonView>
        <CloseButtonTouchableScale friction={10} tension={300}
          onPress={() => {
            modalCloseAnimations(cardViewHeight, buttonOpacity, addRemovePosition)
            isAdmin(true)
            navigation.goBack()
          }}
        >
          <LottieCloseContainer>
            <LottieCloseContainerView id="plus_button">
              <LottieCloseButton source={MinusToPlus} progress={addRemovePosition} />
            </LottieCloseContainerView>
          </LottieCloseContainer>
        </CloseButtonTouchableScale>
      </Animated.ConnectPeersCloseButtonView>
    </>
  )
}
