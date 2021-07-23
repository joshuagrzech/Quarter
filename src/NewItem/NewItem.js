/* eslint-disable no-shadow */
import React from 'react'
import { View, Animated } from 'react-native'
import { styles } from 'assets/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import ConfigModal from 'config-modal'
import { NewBill, NewTask, NewIou } from './screens'
import { NewItemTabLabel } from './styled-components/Text/components'
import TouchableScale from 'react-native-touchable-scale'
import LottieView from 'lottie-react-native'
import { MinusToPlus } from 'assets/Images/lottiefiles'
const NewItem = (props) => {
  const [index, setIndex] = React.useState(0)
  const toggleModal = props.navigation.getParam('toggleModal', () => null)
  const [routes] = React.useState([
    { key: 'first', icon: 'funnel-dollar', title: 'Bill', color: '#34e89e' },
    { key: 'second', icon: 'tasks', title: 'Task', color: '#ff00cc' },
    { key: 'third', icon: 'hand-holding-usd', title: 'IOU', color: '#ff6a00' }
  ])


  const FirstRoute = () => <NewBill navigation={navigation} toggle={props.toggleModal} />
  const SecondRoute = () => <NewTask navigation={navigation} toggle={props.toggleModal} />
  const ThirdRoute = () => <NewIou navigation={navigation} toggle={props.toggleModal} />
  const { navigation, children, addRemovePosition } = props
  const cardViewHeight = React.useRef(new Animated.Value(0)).current
  const buttonOpacity = React.useRef(new Animated.Value(0)).current
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  })
  Animated.spring(buttonOpacity, {
    toValue: 1,
    delay: 200,
    duration: 500,
    useNativeDriver: true
  }).start()
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <NewItemTabLabel
          style={{
            textShadowRadius: 0.5,
            textShadowColor: 'rgba(47, 53, 66,1.0)',
            color: 'rgba(47, 53, 66,1.0)',
            fontSize: 18,
            
          }}
        >
          New {route.title}
        </NewItemTabLabel>
      )}
      renderIcon={({ route, focused }) => (
        <Icon name={route.icon} color={!focused ? 'rgba(47, 53, 66,1.0)' : route.color} size={30} />
      )}
      indicatorStyle={{
        backgroundColor: 'rgba(255, 255, 255,0.75)',
        borderColor: routes[index].color,
        borderWidth: 5,
        width: '33.333333333333%',
        borderRadius: 20,
        height: '100%',
        position: 'absolute',
        shadowOpacity: 0.25,
        shadowOffset: {height: 2, width: 2}
      }}
      style={{
        backgroundColor: "rgba(223, 228, 234,1)",
        width: '98%',
        alignSelf: 'center',
        shadowColor: '#2f3542',
        shadowRadius: 5,
        shadowOpacity: 0.75,
        borderRadius: 20,
        marginBottom: '-10%',
        height: 80,
        marginTop: '2%',
        shadowOffset: {height: 2, width: 2}
      }}
    />
  )

  return (
    <>
      <View
        style={{
          alignSelf: 'center',
          borderRadius: 20,

          width: '100%',
          height: '100%',
          top: `2.5%`
        }}
      >
        <View style={{ height: '100%', width: '100%', display: 'flex', borderRadius: 20, }}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(index) => {
              setIndex(index)
            }}
           
            sceneContainerStyle={{ borderRadius: 20, height: '150%', borderRadius: 20, shadowOpacity: 0.75, shadowOffset: {height: 2, width: 2}
,            shadowRadius: 6}}
          />
        </View>
      </View>
    


    </>
  )
}

export default NewItem
