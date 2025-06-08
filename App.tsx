// import './gesture-handler';
import { View, Text, Alert, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/Notification';
import { notifficationHandler } from './src/Notification';
import { initialisedNotification } from './src/Notification';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from './src/DashBoard';
import Auth from './src/Auth';

const Stack = createNativeStackNavigator();
const NAVIGATION_IDS = ['DashBoard', 'Auth'];
export default function App() {
  function buildDeepLinkFromNotificationData(data: any): any {
    console.log("-----checkout notification data", data)
    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId)
      return null;
    }
    if (navigationId === 'DashBoard') {
      return 'myawesomeproject://DashBoard';
    }
    console.log("----checkout naviagtionId",navigationId)
    if (navigationId === 'Auth') {
      return 'myawesomeproject://Auth';
    }
    const postId = data?.postId;
    if (typeof postId === 'string') {
      return `myawesomeproject://post/${postId}`
    }
    console.warn('Missing postId')
    return null
  }

  const linking: any = {
    prefixes: ['myawesomeproject://'],
    config: {
      screens: {
        DashBoard: 'DashBoard',
        Auth: 'Auth'

      }
    },
    async getInitialURL() {
      Linking.getInitialURL().then((url) => {
        if (typeof url === 'string') {
          return url;
        }
      });
    //  return 'myawesomeproject://Auth'
      //getInitialNotification: When the application is opened from a quit state.
   const message=  await messaging().getInitialNotification()
          const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
          if (typeof deeplinkURL === 'string') {
            return deeplinkURL;
          }
    },
    subscribe(listener: (url: string) => void) {

      const onReceiveURL = ({ url }: { url: string }) => listener(url);
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("----checkout when app is open", remoteMessage)
        const url = buildDeepLinkFromNotificationData(remoteMessage.data)
        if (typeof url === 'string') {
          listener(url)
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  }

  useEffect(() => {
    requestUserPermission()
    initialisedNotification()
    notifficationHandler()
  }, []);
  function RootStack() {
    return (
      <Stack.Navigator initialRouteName="DashBoard">
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    );
  }



  return (

    <NavigationContainer linking={linking} fallback={<ActivityIndicator animating />}>
      <RootStack />
    </NavigationContainer>


  )
}