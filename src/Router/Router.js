import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { createAppContainer } from 'react-navigation'
import { View } from 'react-native'
import MainScreen from 'main-screen'
import ItemDetail from 'item-detail'
import { TransitionPresets } from 'react-navigation-stack';
import { ProfileSettings, HomeSettings, ShareSettings, NowScreen, Support } from 'screens'
import { ConnectBank, RecentTransactionDetail, TransactionDetail, RecentTransactions } from 'api/plaid'
import { ConnectPeers } from 'api/nearby'
import NewItem from 'new-item'

export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 2000,
    damping: 2000,
    mass: 2,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

export const iosCloseTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 2000,
    damping: 1000,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 1,
    restSpeedThreshold: 1,
  },
};

const stackNavigator = createSharedElementStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        cardStyle: {
          backgroundColor: '#ffffff'
        },
      }
    },
    Detail: {
      screen: ItemDetail,
      navigationOptions: {
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosCloseTransitionSpec,
        },
      }
    },
    TransactionDetail: {
      screen: TransactionDetail,
    },
    RecentTransactionDetail: {
      screen: RecentTransactionDetail,
    },
    NewItem: {
      screen: NewItem,
      navigationOptions: {
        cardStyle: {

          backgroundColor: 'rgba(47, 53, 66,0.0)',
        },
        cardOverlayEnabled: true,
        cardShadowEnabled: true
      },
    },
    ProfileSettings: {
      screen: ProfileSettings,
    },
    HomeSettings: {
      screen: HomeSettings,
    },
    ShareSettings: {
      screen: ShareSettings,
    },
    NowScreen: {
      screen: NowScreen,
    },
    Support: {
      screen: Support,
    },
    ConnectBank: {
      screen: ConnectBank,
      gestureEnabled: false,
    },
    RecentTransactions: {
      screen: RecentTransactions,
      gestureEnabled: false
    },
    ConnectPeers: {
      screen: ConnectPeers,
      gestureEnabled: false
    }
  },
  {
    mode: 'modal',
    initialRouteName: 'Main',
    headerMode: 'none',
    defaultNavigationOptions: {

      ...TransitionPresets.ModalPresentationIOS,
      cardOverlayEnabled: true,
      cardShadowEnabled: true,
      cardStyle: {
        backgroundColor: 'rgba(47, 53, 66,0.0)',

      },





    },
  },
  {
    name: 'CoHabitatNav',
    debug: true
  }




)

export default createAppContainer(stackNavigator)
