import React from 'react'
import { Text } from 'react-native'
import Connection from 'assets/Images/lottiefiles'

import TouchableScale from 'react-native-touchable-scale'
import { ConnectionLottieView } from './styled-components/LottieView'
import { styles } from 'assets/stylesheet.js'
import { SearchingText } from './styled-components/Text'
import { PeerSearchContainer } from './styled-components/View'
import { ShadowButtonText } from 'styled_components'

export const PeerSearch = (props) => {
  const [searchForPeers, setSearchForPeers] = React.useState(true)
  const [foundPeers, setFoundPeers] = React.useState(null)

  return (
    <>
      <ConnectionLottieView autoPlay loop source={Connection} />
      <PeerSearchContainer>
        <SearchingText>Searching</SearchingText>
        <Text>{foundPeers}</Text>
        <TouchableScale friction={10} tension={300} onPress={() => setSearchForPeers(false)}>
          <View shadowColor="#2f3542" style={styles.style32}>
            <ShadowButtonText>Search For Existing Home</ShadowButtonText>
          </View>
        </TouchableScale>
      </PeerSearchContainer>
    </>
  )
}
