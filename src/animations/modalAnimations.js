import Animated from 'react-native-reanimated'

export const modalCloseAnimations = (cardViewHeight, backgroundOpacity, buttonOpacity) => {
  Animated.spring(cardViewHeight, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true
  }).start()
  Animated.timing(backgroundOpacity, {
    toValue: 0,
    duration: 5,
    useNativeDriver: true
  }).start()
  Animated.spring(buttonOpacity, {
    toValue: 0,
    duration: 50,
    useNativeDriver: true
  }).start()
}

export const modalOpenAnimations = (cardViewHeight, buttonOpacity, backgroundOpacity) => {
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
}
