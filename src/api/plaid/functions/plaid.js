// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react'
import { PlaidLink } from 'react-native-plaid-link-sdk'
import { useDispatch } from 'react-redux'
import { addPlaidData } from 'redux-store/reducers/user'

import { styles } from 'assets/stylesheet.js'
import { PeerFinderText } from 'styled_components'

export const Plaid = (props) => {
  const [linkToken, setLinkToken] = useState(null)
  const dispatch = useDispatch()

  const generateToken = async () => {
    const response = await fetch('http://192.168.1.191:2798/api/create_link_token', {
      method: 'POST'
    })

    const data = await response.json()

    setLinkToken(data.link_token)
  }

  useEffect(() => {
    generateToken()
  }, [])
  const getItemToken = async (publicToken) => {
    const response = await fetch('http://192.168.1.191:2798/api/set_access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ public_token: publicToken })
    })

    const data = await response.json()

    dispatch(addPlaidData({ plaidData: data }))
  }
  return linkToken != null ? (
    <PlaidLink
      tokenConfig={{
        token: linkToken
      }}
      onSuccess={(success) => {
        getItemToken(success.publicToken)
      }}
      onExit={(exit) => {}}
    >
      <View shadowColor="#2f3542" style={styles.style367}>
        <PeerFinderText>Add Account</PeerFinderText>
      </View>
    </PlaidLink>
  ) : (
    <></>
  )
}
