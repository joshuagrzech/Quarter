import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { TextInput, View } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { HomeSettingsRommatesLabel, HomeSettingsLabel } from './styled-components/Text'
import { HomeSettingsConnectionLottieContainer, HomeSettingsContainer } from './styled-components/View'
import { useDispatch, useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'
import { editHomeNickname, updateMembers, removeMember, updateMember } from 'redux-store/reducers/home'
import ConfigModal from 'config-modal'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { MinusToPlus } from 'assets/Images/lottiefiles'
import * as Animated from 'react-native-reanimated'
import { Easing } from 'react-native-reanimated'
import { DeleteRoomateLottieView, LottieCloseButton } from './styled-components/LottieView'
import { AddItemButtonView } from './styled-components/View'
export const Support = (props) => {
  const { navigation } = props
  const cardViewHeight = React.useRef(new Animated.Value(0)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const home = useSelector((state) => state.home)
  const members = useSelector((state) => state.home.users)
  const [name] = React.useState()
  const dispatch = useDispatch()
  const [nameSelected, setNameSelected] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const myuuid = uuidv4()

  setTimeout(() => {
    if (refreshing === true) {
      setRefreshing(false)
    }
  }, 500)
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
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current
  Animated.timing(backgroundOpacity, {
    useNativeDriver: true,
    toValue: 0.75,
    duration: 500,
    delay: 200,
    easing: Easing.ease
  }).start()

  const renderMember = (item) => {
    const memberName = item.name ? item.name : null

    return (
      <View style={{marginTop: '8%', padding: '2%', alignItems: 'center', flexDirection: 'row-reverse'}}>
        <View shadowColor="#2f3542" style={{flex: 1, backgroundColor: '#3742fa', borderRadius: 50, width: '75%', shadowColor: 'black', shadowRadius: 6, shadowOpacity: 0.25, shadowOffset: {height: 2, width: 4}}}>
          <TextInput
            returnKeyType="go"
            value={memberName}
            onChangeText={(text) => dispatch(updateMember({ id: item.id, name: text }))}
            placeholder="Edit Name"
            placeholderTextColor="gray"
            autoCapitalize="words"
            autoCorrect
            style={{fontSize: 25, textAlign: 'center', flex: 1, margin: '5%', color: 'white'}}

          />
        </View>
        <TouchableScale friction={10} tension={300}
          onPress={() => {
            dispatch(removeMember(item.id))
            setRefreshing(true)
          }}
          style={{shadowColor: 'black', shadowRadius: 1, shadowOpacity: 0.25, shadowOffset: {height: 1, width: 2}}}
        >
            <DeleteRoomateLottieView source={MinusToPlus} progress={0} />
      
        </TouchableScale>
      </View>
    )
  }

  return (
    <>
 
      <ConfigModal navigation={navigation} height={60}>
        <HomeSettingsContainer>
          <HomeSettingsLabel>Home Name</HomeSettingsLabel>
          <View style={{flex: 0.3}}>
            <TextInput
              returnKeyType="go"
              value={home.homeNickname ? home.homeNickname : name}
              onChangeText={(text) => dispatch(editHomeNickname({ homeNickname: text }))}
              placeholder="Tap To Edit"
              placeholderTextColor="gray"
              style={{fontSize: 35, textAlign: 'center', flex: 1}}
              autoCapitalize="words"
              autoCorrect
              onFocus={() => setNameSelected(true)}
              onEndEditing={() => setNameSelected(false)}
            />
          </View>
          <HomeSettingsRommatesLabel>Roommates</HomeSettingsRommatesLabel>
          <View style={styles.style130}>
            <KeyboardAvoidingScrollView >
              <View behavior="padding" style={{display: 'flex'}}>{members.map((item) => renderMember(item))}</View>
            </KeyboardAvoidingScrollView>
          </View>
          <TouchableScale friction={10} tension={300}
            onPress={() => {
              const memberObject = { id: myuuid, name: null }

              dispatch(
                updateMembers({
                  memberObject
                })
              )
            }}
          >
            <AddItemButtonView>
              <View id="plus_button">
                <LottieCloseButton source={MinusToPlus} progress={0.25} />
              </View>
            </AddItemButtonView>
          </TouchableScale>
        </HomeSettingsContainer>
      </ConfigModal>
    </>
  )
}
