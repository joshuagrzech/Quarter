import React from 'react'
import { styles } from 'assets/stylesheet.js'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, resetUser, saveNewAuthUser } from 'redux-store/reducers/user'
import { View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ConfigModal from 'config-modal'
import { ProfileExtraInfo, HomeSettingsContainer } from './styled-components/View'
import { HomeSettingsLabel } from './styled-components/Text'
import { TextInput } from 'react-native'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { ConfigTouchable } from 'styled_components'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import TouchableScale from 'react-native-touchable-scale'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { resetHome } from 'redux-store/reducers/home'
import { resetItems } from 'redux-store/reducers/item'
import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from 'apollo/user'

export const ProfileSettings = (props) => {
  const { navigation } = props
  const [createUser, { data }] = useMutation(CREATE_USER_MUTATION)
  const [initializing, setInitializing] = React.useState(true);
  const profile = useSelector((state) => state.user)
  const [nameSelected, setNameSelected] = React.useState(false)
  const dispatch = useDispatch()
  const [user, setUser] = React.useState(auth().currentUser ? auth().currentUser : null)

  function onAuthStateChanged(user) {
    setUser(user);

    if (auth().currentUser !== null && profile.id === null) {
      let profileObject = {}
      profileObject["provider"] = user.providerData[0].providerId
      profileObject["id"] = user.uid
      profileObject["username"] = profile.username
      console.log(profileObject)
      createUser({
        variable: {
          "createUserInput": {
            "id": profileObject.id,
            "provider": profileObject.provider,
            "username": profileObject.username
          }
        }
      }).then((result) => {
        dispatch(updateUser(profileObject))
      }).catch((error) => {
        //alert with the error message
        Alert.alert(
          'Error',
          error.message
        )
      })

      if (initializing) setInitializing(false);
    }
  }
    React.useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    async function onAppleButtonPress() {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      return auth().signInWithCredential(appleCredential);
    }
    const signOut = async () => {
      //sign out of firebase but first, alert for sign out confirmation
      const confirm = await Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out? You will need to sign back in to access your data.',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'Sign Out', onPress: () => {
              auth().signOut();
              dispatch(resetHome())
              dispatch(resetItems())
              dispatch(resetUser())
              navigation.goBack()
            }
          }]
      );
    }
    const deleteAccount = async () => {
      const confirm = await Alert.alert(
        'Delete User Profile',
        'Are you sure you want delete all of your data? This won\`t delete your data with our partners.',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'Delete', onPress: () => {
              auth().currentUser.delete()
              dispatch(resetHome())
              dispatch(resetItems())
              dispatch(resetUser())
              navigation.navigate('MainScreen')
            }
          }]
      );
    }

    const signInButton = () => {
      if (user !== null) {
        return (
          <>
            <View style={{ flex: 2, marginTop: '5%' }}>
            </View>
            <View style={{ marginTop: '5%', alignItems: 'center', alignSelf: 'center', width: '100%', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 1 }}>
                <HomeSettingsLabel style={{ fontSize: 18, color: 'black' }}>Sign Out</HomeSettingsLabel>
                <ConfigTouchable onPress={signOut} friction={10} tension={300} >
                  <Icon name="sign-out-alt" color={'black'} size={35} />

                </ConfigTouchable>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <HomeSettingsLabel onPress={deleteAccount} style={{ fontSize: 18, color: 'red' }}>Delete User</HomeSettingsLabel>
                <ConfigTouchable friction={10} tension={300} style={{}}>
                  <Icon name="user-slash" color={'red'} size={35} />

                </ConfigTouchable>
              </View>


            </View>

          </>
        )
      } else {
        return (
          <>
            <TouchableScale friction={10} style={{ marginHorizontal: '15%', marginTop: '5%', flex: 1 }} tension={300}>

              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.CONTINUE}
                style={{
                  flex: 1
                }}
                onPress={() => profile !== undefined ? onAppleButtonPress().then(() => console.log('Apple sign-in complete!')) :
                  //alert to tell user to fill out their name first
                  Alert.alert('Missing Name', 'Before you sign in, please enter your name.', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                  ])}
              />
            </TouchableScale>
            <View style={{ flex: 5, marginTop: '5%' }}>
              <HomeSettingsLabel style={{ margin: 'auto', fontSize: 18, opacity: 0.75 }}>Once you're signed in, you can:</HomeSettingsLabel>
              <View style={{ flex: 1, backgroundColor: '#000', shadowColor: '#000', alignItems: 'center', marginHorizontal: '5%', marginVertical: '1%', borderRadius: 5, flexDirection: 'row', shadowOffset: { height: 1, width: 2 }, shadowOpacity: 0.5, shadowRadius: 2 }}>
                <HomeSettingsLabel style={{ fontSize: 18, flex: 1, color: 'white' }}>Connect with other users</HomeSettingsLabel>
                <Icon name={'share-square'} size={30} style={{ flex: 0.25, color: 'white' }} />
              </View>
              <View style={{ flex: 1, backgroundColor: '#000', shadowColor: '#000', alignItems: 'center', marginHorizontal: '5%', marginVertical: '1%', borderRadius: 5, flexDirection: 'row', shadowOffset: { height: 1, width: 2 }, shadowOpacity: 0.5, shadowRadius: 2 }}>
                <HomeSettingsLabel style={{ fontSize: 18, flex: 1, color: 'white' }}>Sync your bank account</HomeSettingsLabel>
                <Icon name={'university'} size={30} style={{ flex: 0.25, color: 'white' }} />
              </View>
              <View style={{ flex: 1, backgroundColor: '#000', shadowColor: '#000', alignItems: 'center', marginHorizontal: '5%', marginVertical: '1%', borderRadius: 5, flexDirection: 'row', shadowOffset: { height: 1, width: 2 }, shadowOpacity: 0.5, shadowRadius: 2 }}>
                <HomeSettingsLabel style={{ fontSize: 18, flex: 1, color: 'white' }}>Easily pay other users</HomeSettingsLabel>
                <Icon name={'money-bill-wave'} size={30} style={{ flex: 0.25, color: 'white' }} />
              </View>
              <View style={{ flex: 1, backgroundColor: '#000', shadowColor: '#000', alignItems: 'center', marginHorizontal: '5%', marginVertical: '1%', borderRadius: 5, flexDirection: 'row', shadowOffset: { height: 1, width: 2 }, shadowOpacity: 0.5, shadowRadius: 2 }}>
                <HomeSettingsLabel style={{ fontSize: 18, flex: 1, color: 'white' }}>Backup your profile</HomeSettingsLabel>
                <Icon name={'sync-alt'} size={30} style={{ flex: 0.25, color: 'white' }} />
              </View>
              <ProfileExtraInfo />
            </View>
          </>
        )
      }
    }
    return (
      <ConfigModal navigation={navigation} height={60}>
        <HomeSettingsContainer>
          <HomeSettingsLabel style={{ fontSize: 20, opacity: 0.75 }}>Your Name</HomeSettingsLabel>
          <View style={{ flex: 0.5 }}>
            <TextInput
              returnKeyType="go"
              style={{ fontSize: 35, textAlign: 'center', flex: 1 }}
              value={profile ? profile.username : null}
              onChangeText={(text) => dispatch(updateProfile({ userObject: { username: text } }))}
              placeholder={profile.username === undefined ? 'John Doe' : profile.displayName}
              placeholderTextColor="rgba(47, 53, 66,0.30)"
              autoCapitalize="words"
              autoCorrect
              onFocus={() => setNameSelected(true)}
              onEndEditing={() => setNameSelected(false)}
            />
          </View>
          <HomeSettingsLabel style={{ fontSize: 20, opacity: 0.75 }}>{user !== null && user.uid ? ('You\'re logged in as ' + user.uid) : ('Create an account?')} </HomeSettingsLabel>
          {signInButton()}
        </HomeSettingsContainer>
      </ConfigModal >
    )
  }

