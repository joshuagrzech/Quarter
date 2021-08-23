import React from "react";
import { styles } from "assets/stylesheet.js";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, resetUser } from "redux-store/reducers/user";
import { View, Alert } from "react-native";
import ConfigModal from "config-modal";
import {
  ProfileExtraInfo,
  HomeSettingsContainer,
} from "./styled-components/View";
import { HomeSettingsLabel } from "./styled-components/Text";
import { TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import { ConfigTouchable, ProfileCompleteTouchable } from "styled_components";
import Icon from "react-native-vector-icons/FontAwesome5";
import { resetHome } from "redux-store/reducers/home";
import { resetItems } from "redux-store/reducers/item";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "apollo/user";
import TextInputMask from "react-native-text-input-mask";
export const ProfileSettings = (props) => {
  const { navigation } = props;
  const [createUser, { data }] = useMutation(CREATE_USER_MUTATION);
  const [initializing, setInitializing] = React.useState(true);
  const profile = useSelector((state) => state.user);
  const [nameSelected, setNameSelected] = React.useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    auth().currentUser ? auth().currentUser : null
  );
  const [phone, setPhone] = React.useState("");
  console.log(profile.username);
  function onAuthStateChanged(user) {
    setUser(user);

    if (auth().currentUser !== null && profile.id === null) {
      let profileObject = {};
      profileObject["provider"] = user.providerData[0].providerId;
      profileObject["id"] = user.uid;
      profileObject["username"] = profile.username;
      console.log(profileObject);
      setTimeout(async () => {
        const initialCall = await createUser({
          variables: {
            createUserInput: {
              id: profileObject.id,
              username: profile.username,
            },
          },
        });
        
      }, 5000);
      dispatch(updateProfile({ id: user.uid, provider: user.providerData[0].providerId, houseId: user.uid, apiConnected: true }));
      if (initializing) setInitializing(false);
    }
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signOut = async () => {
    //sign out of firebase but first, alert for sign out confirmation
    const confirm = await Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out? You will need to sign back in to access your data.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => {
            auth().signOut();
            dispatch(resetHome());
            dispatch(resetItems());
            dispatch(resetUser());
            navigation.goBack();
          },
        },
      ]
    );
  };
  const deleteAccount = async () => {
    const confirm = await Alert.alert(
      "Delete User Profile",
      "Are you sure? This will delete your data with our partners & on your device.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            auth().currentUser.delete();
            dispatch(resetHome());
            dispatch(resetItems());
            dispatch(resetUser());
            navigation.goBack();
          },
        },
      ]
    );
  };

  const [confirm, setConfirm] = React.useState(null);

  const [code, setCode] = React.useState("");

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    if (profile.username === undefined || profile.username === "") {
      //alert for missing name
      Alert.alert(
        "Missing Name",
        "Please enter your name before attempting to sign in.",
        [
          {
            text: "OK",
            onPress: () => {
              setConfirm(null);
            },
          },
        ]
      );
    } else {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  const signInButton = () => {
    if (user !== null) {
      return (
        <>
          <View style={{ flex: 2, marginTop: "15%" }}></View>
          <View
            style={{
              marginTop: "15%",
              alignItems: "center",
              alignSelf: "center",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                flex: 1,
              }}
            >
              
              <ConfigTouchable onPress={signOut} friction={10} tension={300}>
                <>
                <HomeSettingsLabel style={{ fontSize: 18, color: "black" }}>
                Sign Out
              </HomeSettingsLabel>
              
                <Icon name="sign-out-alt" style={{alignSelf: 'center'}} color={"black"} size={35} />
              </>
              </ConfigTouchable>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ConfigTouchable friction={10} onPress={deleteAccount} tension={300} style={{}}>
                <>
                  <HomeSettingsLabel
                    
                    style={{ fontSize: 18, color: "red" }}
                  >
                    Delete User
                  </HomeSettingsLabel>
                  <Icon name="user-slash" color={"red"} size={35} style={{alignSelf: 'center'}}/>
                </>
              </ConfigTouchable>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          {!confirm ? (
            <>
              <View style={{ flex: 0.5, marginTop: "0%" }}>
                <TextInputMask
                  mask={"+1 ([000]) [000] [0000]"}
                  returnKeyType="done"
                  value={phone}
                  style={{ fontSize: 40, textAlign: "center", flex: 1 }}
                  keyboardType="phone-pad"
                  onChangeText={(formatted, extracted) => setPhone(formatted)}
                  placeholder="Enter Phone Number"
                  placeholderTextColor="rgba(47, 53, 66,0.30)"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <ProfileCompleteTouchable
                disabled={phone ? (profile.username ? false : true) : true}
                onPress={() => signInWithPhoneNumber(phone)}
                color={"black"}
                style={{
                  opacity: phone ? (profile.username ? 1 : 0.25) : 0.25,
                  padding: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                }}
              >
                <HomeSettingsLabel
                  style={{ fontSize: 20, opacity: 0.75, color: "white" }}
                >
                  Sign In
                </HomeSettingsLabel>
              </ProfileCompleteTouchable>
            </>
          ) : (
            <>
              <TextInputMask
                mask={"[0][0][0][0][0][0]"}
                returnKeyType="done"
                value={code}
                style={{ fontSize: 40, textAlign: "center", flex: 1 }}
                keyboardType="phone-pad"
                onChangeText={(formatted, extracted) => setCode(extracted)}
                placeholder="Input Code"
                placeholderTextColor="rgba(47, 53, 66,0.30)"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <ProfileCompleteTouchable
                disabled={code ? false : true}
                onPress={() => confirmCode(code)}
                color={"black"}
                style={{
                  opacity: code ? 1 : 0.5,
                  padding: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                }}
              >
                <HomeSettingsLabel
                  style={{ fontSize: 20, opacity: 0.75, color: "white" }}
                >
                  Confirm Code
                </HomeSettingsLabel>
              </ProfileCompleteTouchable>
            </>
          )}
          <View
            style={{
              flex: 3,
              alignSelf: "center",
              width: "75%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HomeSettingsLabel
              style={{ margin: "auto", fontSize: 18, opacity: 0.75 }}
            >
              Once you're signed in, you can:
            </HomeSettingsLabel>
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
                shadowColor: "#000",
                alignItems: "center",
                marginHorizontal: "5%",
                marginVertical: "1%",
                borderRadius: 5,
                flexDirection: "row",
                shadowOffset: { height: 1, width: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <HomeSettingsLabel
                style={{ fontSize: 18, flex: 1, color: "white", padding: "1%" }}
              >
                Connect with other users
              </HomeSettingsLabel>
              <Icon
                name={"share-square"}
                size={30}
                style={{ flex: 0.25, color: "white" }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
                shadowColor: "#000",
                alignItems: "center",
                marginHorizontal: "5%",
                marginVertical: "1%",
                borderRadius: 5,
                flexDirection: "row",
                shadowOffset: { height: 1, width: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <HomeSettingsLabel
                style={{ fontSize: 18, flex: 1, color: "white", padding: "1%" }}
              >
                Sync your bank account
              </HomeSettingsLabel>
              <Icon
                name={"university"}
                size={30}
                style={{ flex: 0.25, color: "white" }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
                shadowColor: "#000",
                alignItems: "center",
                marginHorizontal: "5%",
                marginVertical: "1%",
                borderRadius: 5,
                flexDirection: "row",
                shadowOffset: { height: 1, width: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <HomeSettingsLabel
                style={{ fontSize: 18, flex: 1, color: "white", padding: "1%" }}
              >
                Easily pay other users
              </HomeSettingsLabel>
              <Icon
                name={"money-bill-wave"}
                size={30}
                style={{ flex: 0.25, color: "white" }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
                shadowColor: "#000",
                alignItems: "center",
                marginHorizontal: "5%",
                marginVertical: "1%",
                borderRadius: 5,
                flexDirection: "row",
                shadowOffset: { height: 1, width: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <HomeSettingsLabel
                style={{ fontSize: 18, flex: 1, color: "white", padding: "1%" }}
              >
                Backup your profile
              </HomeSettingsLabel>
              <Icon
                name={"sync-alt"}
                size={30}
                style={{ flex: 0.25, color: "white" }}
              />
            </View>
            <ProfileExtraInfo />
          </View>
        </>
      );
    }
  };
  return (
    <ConfigModal navigation={navigation} height={60}>
      <HomeSettingsContainer>
        <HomeSettingsLabel style={{ fontSize: 20, opacity: 0.75 }}>
          Your Profile
        </HomeSettingsLabel>
        <View style={{ flex: 0.5 }}>
          <TextInput
            returnKeyType="go"
            style={{ fontSize: 40, textAlign: "center", flex: 1 }}
            value={profile ? profile.username : null}
            onChangeText={(text) =>
              dispatch(updateProfile({ username: text } ))
            }
            placeholder={
              profile.displayName === undefined
                ? "Enter Your Name"
                : profile.displayName
            }
            placeholderTextColor="rgba(47, 53, 66,0.30)"
            autoCapitalize="words"
            autoCorrect
            onFocus={() => setNameSelected(true)}
            onEndEditing={() => setNameSelected(false)}
          />
        </View>
        <HomeSettingsLabel style={{ fontSize: 20, opacity: 0.75 }}>
          {profile.apiConnected ? (`You're signed-in! Edit your settings below:`) : ('Would you like to Sign In?')}
        </HomeSettingsLabel>
        {signInButton()}
      </HomeSettingsContainer>
    </ConfigModal>
  );
};
