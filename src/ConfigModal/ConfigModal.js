/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Animated } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import LottieView from 'lottie-react-native'
import { MinusToPlus } from 'assets/Images/lottiefiles'
const ConfigModal = (props) => {
  const { navigation, children, addRemovePosition } = props
  const cardViewHeight = React.useRef(new Animated.Value(0)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current

  Animated.spring(buttonOpacity, {
    toValue: 1,
    delay: 200,
    duration: 500,
    useNativeDriver: true
  }).start()
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current

  return (
    <>
     

      <View
        style={{
          alignSelf: 'center',
          borderRadius: 20,
  
          width: '90%',
          height: '80%',
          top: '5%',
          
        }}
      >
        <View style={{ height: '100%', width: '100%', display: 'flex' }}>{children}</View>
      </View>
      <Animated.View
        style={{
          height: 75,
          width: 75,
          position: 'absolute',
          top: `1%`,
          left: -5,
          alignSelf: 'flex-start',
          transform: [{ scaleY: buttonOpacity }, { scaleX: buttonOpacity }]
        }}
      >
        <TouchableScale friction={10} tension={300}
          onPress={() => {
    
            Animated.spring(buttonOpacity, {
              toValue: 0,

              duration: 50,
              useNativeDriver: true
            }).start()

            navigation.goBack()
          }}
          style={{ flex: 1, alignItems: 'center' }}
        >
          
        </TouchableScale>
      </Animated.View>
    </>
  )
}

export default ConfigModal
