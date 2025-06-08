import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { globalStyle } from './GlobalStyle';

export default function DashBoard() {
    const navigation=useNavigation()
    const screenHandler=()=>{
        navigation.navigate("Auth")
    }
  return (
    <View style={globalStyle.centreStyle}>
      <TouchableOpacity style={globalStyle.centreStyle}  onPress={screenHandler}>
          <Text>next screen</Text>
      </TouchableOpacity>
    </View>
  )
}