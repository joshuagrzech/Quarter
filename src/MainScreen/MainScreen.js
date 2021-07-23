import React from 'react'
import { Alert, Animated } from 'react-native'
import { MinusToPlus } from 'assets/Images/lottiefiles'
import HomeTab from 'home-tab'
import LeftMenu from 'left-menu'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'
import { CloseButtonTouchableScale, MainContainer, AddItemButtonLottieView } from 'styled_components'
import { AddItemButtonView, MainScreenAddButtonContainer, TabContainer } from './styled-components/View'
import { isNullishCoalesce } from 'typescript'

const MainScreen = (props) => {
  const { navigation } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const addRemovePosition = React.useRef(new Animated.Value(0.25)).current
  const user = useSelector((state) => state.user)

  if (isOpen === true) {
    Animated.timing(addRemovePosition, {
      toValue: 0.25,
      duration: 500,
      useNativeDriver: true
    }).start()
  } else if (isOpen === false) {
    Animated.timing(addRemovePosition, {
      toValue: 0.25,
      duration: 500,
      useNativeDriver: true
    }).start()
  }
  const onPressClose = () => {
    if (isOpen === false) {
      Animated.timing(addRemovePosition, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true
      }).start()
      setIsOpen(true)
    }
    if (user.username === isNullishCoalesce) {
      Alert.alert('Please complete your profile before adding an item.', null, [
        {
          text: 'Take Me There',
          onPress: () => props.navigation.push('ProfileSettings')
        }
      ])
      setIsOpen(false)
    } else {
      navigation.push('NewItem', { toggleModal: props.toggleModal })
    }
  }

  return (
    <LeftMenu navigation={navigation} isModalOpen={isOpen}>
      <MainContainer>
        <TabContainer>
          <HomeTab navigation={navigation} />
        </TabContainer>
        <MainScreenAddButtonContainer>
          <AddItemButtonView>
            <AddItemButtonLottieView>
              <CloseButtonTouchableScale friction={10} tension={300} onPress={onPressClose}>
                <LottieView source={MinusToPlus} progress={addRemovePosition} />
              </CloseButtonTouchableScale>
            </AddItemButtonLottieView>
          </AddItemButtonView>
        </MainScreenAddButtonContainer>
      </MainContainer>
    </LeftMenu>
  )
}
export default MainScreen
