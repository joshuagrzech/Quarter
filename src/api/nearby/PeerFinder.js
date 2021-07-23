import React from 'react'
import { Text, View } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import TouchableScale from 'react-native-touchable-scale'
import { styles } from 'assets/stylesheet.js'
import { PeerFinderContainer } from './styled-components/View'
import { ShadowButtonText, PeerFinderText } from 'styled_components'
export const PeerFinder = () => {
  const [searching, setSearching] = React.useState(undefined)

  return (
    <>
      {searching === undefined ? (
        <PeerFinderContainer>
          <Text>Tell your roomate to open their Home Settings</Text>

          <TouchableScale friction={10} tension={300} onPress={() => setSearching(true)}>
            <View shadowColor="#2f3542" style={styles.style25}>
              <LinearGradient colors={['#0984e3', '#106eb6']} />

              <ShadowButtonText>Search For New Residents</ShadowButtonText>
            </View>
          </TouchableScale>

          <PeerFinderText>OR</PeerFinderText>
          <PeerFinderText>Tell your Admin to open their Home Settings</PeerFinderText>
          <TouchableScale friction={10} tension={300} onPress={() => setSearching(false)}>
            <View shadowColor="#2f3542" style={styles.style365}>
              <LinearGradient colors={['#0984e3', '#106eb6']} />

              <ShadowButtonText>Search For Existing Home</ShadowButtonText>
            </View>
          </TouchableScale>
        </PeerFinderContainer>
      ) : (
        <View />
      )}
    </>
  )
}
