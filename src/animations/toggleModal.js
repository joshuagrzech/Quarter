import Animated from 'react-native-reanimated'

export const toggleModal = (addRemovePosition, isOpen) => {
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
}
