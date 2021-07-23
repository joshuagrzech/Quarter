import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { MenuContainerView } from '../styled-components/View'
import { HomeSettingsLabel, ConfigTouchable } from 'styled_components'

export const Menu = (props) => {
  const { navigation } = props
  return (

    <MenuContainerView>
      <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ConfigTouchable friction={10} tension={300} onPress={() => navigation.push('ProfileSettings')} navigation={navigation} color="rgba(236, 204, 104,1.0)">
          <Icon name='user-cog' size={50} color='#2f3542'/>
        </ConfigTouchable> 
        <HomeSettingsLabel>Profile Settings</HomeSettingsLabel>
      </View>
      <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ConfigTouchable friction={10} tension={300} onPress={() => navigation.push('HomeSettings')} destination="HomeSettings" navigation={navigation} color="rgba(255, 165, 2,1.0)">
          <Icon name='house-user' size={50} color='#2f3542'/>
        </ConfigTouchable> 
        <HomeSettingsLabel>Home Settings</HomeSettingsLabel>
      </View>
      <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ConfigTouchable friction={10} tension={300} onPress={() => navigation.push('ShareSettings')} destination="ShareSettings" navigation={navigation} color="rgba(255, 165, 2,1.0)">
          <Icon name='users-cog' size={50} color='#2f3542'/>
        </ConfigTouchable> 
        <HomeSettingsLabel>Share Settings</HomeSettingsLabel>
      </View>
      <View style={{ bottom: '-75%', flex: 3, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: '75%'}}>
        <ConfigTouchable friction={10} tension={300} onPress={() => navigation.push('Support')} destination="HomeSettings" navigation={navigation} color="rgba(255, 165, 2,1.0)">
          <Icon name='question-circle' size={50} color='#2f3542'/>
        </ConfigTouchable> 
        <HomeSettingsLabel>Support</HomeSettingsLabel>
      </View>
    </MenuContainerView>

  )
}
