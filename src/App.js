import 'react-native-gesture-handler'
import React from 'react'
import Router from 'router'
import { LogBox, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from 'redux-store/store'
import { persistStore } from 'redux-persist'
import { setCustomText, setCustomTextInput } from 'react-native-global-props'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import auth from '@react-native-firebase/auth';
import AnimatedSplash from "react-native-animated-splash-screen";



LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  'Encountered two children with the same key',
  'Animated.event now requires a second argument for options',
  'Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'componentWillMount',
  'Require cycle',
  '`setTranslucent` is only available on Android',
  '`setBackgroundColor` is only available on Android',
  'A non-serializable value was detected in an action',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use.',
  'It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens'
])

StatusBar.setTranslucent(true)

StatusBar.setBackgroundColor('transparent')

const App = (props) => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  const [loaded, setIsLoaded] = React.useState(false);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    ;
  }, []);
  const client = new ApolloClient({
    uri: 'https://us-central1-cohabitat.cloudfunctions.net/habitatapi/graphql',
    cache: new InMemoryCache()
  });
  const customTextProps = {
    style: {
      fontFamily: 'DINCondensed-Bold'
    }
  }
  setCustomText(customTextProps)
  setCustomTextInput(customTextProps)
  persistor = persistStore(store)

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AnimatedSplash
          translucent={false}
          isLoaded={loaded}
          logoImage={require("./assets/Images/AppLogo.png")}
          backgroundColor={"#262626"}
          logoHeight={300}
          logoWidth={300}
        >
          <Router />
        </AnimatedSplash>
      </Provider>
    </ApolloProvider>
  )
}

export default App
