/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { homeItemList } from './screens/homeItemList'
import { totalAmountOwnBills, totalAmountSharedBills, totalOwed, totalToMe, itemSort } from './functions'
import { styles } from 'assets/stylesheet.js'
import { HomeListItemIcon } from 'styled_components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AnimatedNumbers from 'react-native-animated-numbers'

// eslint-disable-next-line no-undef
const HomeTab = (props) => {
  const { navigation } = props
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', icon: 'layer-group', title: 'All', color: '#1e90ff' },
    { key: 'second', icon: 'funnel-dollar', title: 'Bills', color: '#34e89e' },
    { key: 'third', icon: 'tasks', title: 'Tasks', color: '#ff00cc' },
    { key: 'fourth', icon: 'hand-holding-usd', title: 'IOUs', color: '#ff6a00' }
  ])
  const stateItems = useSelector((state) => state.items)
  const items = stateItems.filter((item) => item.archived === undefined && item.type !== 'iou')
  const profile = useSelector((state) => state.user)
  const tasks = items.filter((item) => item.type === 'task')
  const bills = items.filter((item) => item.type === 'bill')
  const iouOwed = items.filter((item) => item.type === 'iou' && item.user === profile.name)
  const iouToMe = items.filter((item) => item.type === 'iou' && item.createdBy === profile.name)
  const homeMembers = useSelector((state) => state.home.users)

  const printObj = {}
  const [refreshing] = React.useState(false)
  const totalAmountShared = totalAmountSharedBills(items, homeMembers)
  const totalAmountOwn = totalAmountOwnBills(items)
  const totalTo = totalOwed(stateItems, profile)
  const totalOwe = totalToMe(stateItems, profile)
  const whichTotal = (key) => {
    switch (key) {
      case 'first':
        return null
      case 'second':
        return Math.round(totalAmountShared.amount + totalAmountOwn.amount)
      case 'third':
        return tasks.length
      case 'fourth':
        return Math.round(totalOwe.amount - totalTo.amount)
      default:
        break
    }
  }
  const dollarSign = (route) => {
    if (route.key === 'fourth' || route.key === 'second') {
      return (
        <Text
          style={{
            ...styles.totalsTextTotal,

            fontSize: 20,
            color: whichTotal(route.key) > 0 ? route.color : 'rgba(164, 176, 190,1.0)'
          }}
        >
          $
        </Text>
      )
    }
  }
  const tabBarIcon = (route) => {
    if (route.key === 'third' || route.key === 'fourth' || route.key === 'second') {
      return (
        <>
          {dollarSign(route)}
          <AnimatedNumbers
            includeComma
            animateToNumber={whichTotal(route.key)}
            fontStyle={{
              ...styles.totalsTextTotal,
              color: whichTotal(route.key) > 0 ? route.color : '#a4b0be'
            }}
          />
        </>
      )
    } else if (route.key === 'first') {
      return (
        <Icon name='layer-group' color='#1e90ff' size={45} style={{ alignSelf: 'center', height: 50, width: 50 }} />
      )
    }
  }
  const renderTabBar = (props) => (
    <TabBar
      {...props}

      renderIcon={({ route, focused }) => {
        return (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {tabBarIcon(route)}
          </View>
        )
      }
      }
      indicatorStyle={{
        backgroundColor: 'rgba(206, 214, 224,0.5)',
        borderColor: routes[index].color,
        borderWidth: 5,
        width: '25%',
        borderRadius: 20,
        height: '100%',
        position: 'absolute'
      }}
      style={{
        backgroundColor: 'rgba(47, 53, 66,1.0)',
        width: '95%',
        alignSelf: 'center',
        shadowColor: 'rgba(47, 53, 66,1.0)',
        shadowRadius: 5,
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 1,
        borderRadius: 20,
        marginTop: '2%',
        height: 100
      }}
    />
  )
  const renderScene = SceneMap({
    first: () => homeItemList(itemSort(refreshing, items), printObj, navigation, index),
    second: () => homeItemList(itemSort(refreshing, bills), printObj, navigation, index),
    third: () => homeItemList(itemSort(refreshing, tasks), printObj, navigation, index),
    fourth: () => homeItemList(itemSort(refreshing, [...iouOwed, ...iouToMe]), printObj, navigation, index)
  })
  return (
    <TabView
      lazy
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => {
        setIndex(index)
      }}
      swipeEnabled={false}
      
    />
  )
}

export default HomeTab
