import { View, Text,Alert } from 'react-native'
import React,{useEffect} from 'react'
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/Notification';
import { notifficationHandler } from './src/Notification';
import { initialisedNotification } from './src/Notification';


export default function App() {
  

  useEffect(() => {
    requestUserPermission()
    initialisedNotification()
    notifficationHandler()
  }, []);
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}