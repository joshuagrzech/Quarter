import React from 'react'
import { Animated } from 'react-native'
import SideMenu from 'react-native-side-menu-updated'
import { SideMenuContainer, SideMenuView } from './styled-components/View'
import { Menu } from './screens'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { HamburgerButton } from 'assets/Images/lottiefiles'
import { HamburgerButtonLottieViewContainer } from './styled-components/View'
import { CloseButtonTouchableScale, LottieHamburger } from 'styled_components'
const LeftMenu = (props) => {
  const { navigation } = props
  const [isSideOpen, setIsSideOpen] = React.useState(false)
  const hamburger = React.useRef(new Animated.Value(0)).current
  const menu = <Menu navigation={navigation} />
  const menuOpenClose = (open) => {
    if (!open) {
      Animated.timing(hamburger, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        setIsSideOpen(false)
      })
    }
  }
  const onPressHamburger = () => {
    if (isSideOpen === true) {
      Animated.timing(hamburger, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
      setIsSideOpen(false)
    } else if (isSideOpen === false) {
      Animated.timing(hamburger, {
        toValue: 41,
        duration: 500,
        useNativeDriver: true
      }).start()
      setIsSideOpen(true)
    }
  }
  return (
    <SideMenu
      menu={menu}
      disableGestures={props.isModalOpen}
      isOpen={isSideOpen}
      autoClosing={false}
      useNativeDriver
      onChange={(event) => menuOpenClose(event)}
      onSliding={(event) => hamburger.setValue(event, 0.025)}
      navigation={navigation}
    >
      <SideMenuContainer>
        <SideMenuView>
          <CloseButtonTouchableScale friction={10} tension={300} onPress={onPressHamburger}>
            <HamburgerButtonLottieViewContainer>
              <LottieHamburger style={{opacity: 0.88}} progress={hamburger} useNativeDriver source={HamburgerButton} />
            </HamburgerButtonLottieViewContainer>
          </CloseButtonTouchableScale>
          <CloseButtonTouchableScale friction={10} tension={300}
            onPress={() => {
              navigation.navigate('ProfileSettings')
            }}
          >
            <Icon name="user" color={'rgba(47, 53, 66,1.0)'} size={45} style={{opacity: 1}}/>
          </CloseButtonTouchableScale>
        </SideMenuView>
        {props.children}
      </SideMenuContainer>
    </SideMenu>
  )
}

export default LeftMenu
