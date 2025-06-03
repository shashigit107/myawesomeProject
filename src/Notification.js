import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidColor } from '@notifee/react-native';
import { onMessage } from '@react-native-firebase/messaging';
import { getMessaging,getToken } from '@react-native-firebase/messaging';


import { Alert } from 'react-native';
let channelId;

async function initialisedNotification(){
    await notifee.requestPermission()
    // Create a channel (required for Android)
     channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
}


async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();


    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
          });
        getFcmToken()
    }
}

const getFcmToken = async () => {
    let token = await AsyncStorage.getItem("fcmToken")
    console.log("----old token", token)
    if (!token) {
        try {
            await messaging().registerDeviceForRemoteMessages();
            const fcmToken = await messaging().getToken();
            console.log("-fcm token", fcmToken)
            await AsyncStorage.setItem("fcmToken", fcmToken)
            console.log("-----checkout new token", await AsyncStorage.getItem("fcmToken"))
        } catch (error) {
            console.log("--checkout----error", error)
        }

    }
}


async function notifficationHandler() {
    messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        console.log("-------checkfcm token",remoteMessage)
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
              channelId,
            //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
              // pressAction is needed if you want the notification to open the app when pressed
              pressAction: {
                id: 'default',
              },
            },
          });

       
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
    const message = await messaging().getInitialNotification();
    console.log("---checkjout message", message)
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("--whern app is open ")
    });
}



export { requestUserPermission, notifficationHandler,initialisedNotification }