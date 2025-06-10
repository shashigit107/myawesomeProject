import { View, Text, Alert, SafeAreaView, StatusBar, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/Notification';
import { notifficationHandler } from './src/Notification';
import { initialisedNotification } from './src/Notification';
import { ActivityIndicator, FlatList, Button } from 'react-native';
import i18n  from './src/language/Service';
import {useTranslation} from 'react-i18next';

import { languageResource } from './src/language/Service';

export default function App() {
  const {t} = useTranslation();
  const [language, setLanguage]=useState("en")
  console.log("checkout previos log",t)
 
  useEffect(() => {
    requestUserPermission()
    initialisedNotification()
    notifficationHandler()
  }, []);

  const ChangeLanguageHandler=(item :any)=>{
console.log("-----checkout l;aguage",item)
    i18n
      .changeLanguage(item)
      .then(() => setLanguage(item))
      .catch(err => console.log(err));

  }

  const renderItemHamdler=({item }:any)=>{
    return(
        <TouchableOpacity onPress={()=>ChangeLanguageHandler(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>

    )
  }

  return (

    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={false}
        translucent={false}
      />
      <FlatList
      contentContainerStyle={{flex:1,justifyContent:'center',alignItems:"center"}}
      data={Object.keys(languageResource)}
      renderItem={renderItemHamdler}

      />

      <Text>{t('hello')}</Text>
      <Text>{language}</Text>
      </View>
    </SafeAreaView>



  );
}