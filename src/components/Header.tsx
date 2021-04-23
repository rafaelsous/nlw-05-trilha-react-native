import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userImg from '../assets/rafael.jpeg'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export function Header() {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      
      if (user)
        setUserName(user)
    }

    loadStorageUserName()
  }, [])

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image style={styles.avatar} source={userImg} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontFamily: fonts.light,
    fontSize: 32,
    color: colors.heading,
  },
  userName: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 38,
    color: colors.heading,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  }
})