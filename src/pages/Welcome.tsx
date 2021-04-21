import React from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}suas plantas de {'\n'}forma fácil
        </Text>

        <Image 
          source={wateringImg}
          style={styles.image} 
          resizeMode='contain'
        />

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    marginTop: 38,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 34,
    color: colors.heading,
    fontFamily: fonts.heading
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 25,
    color: colors.heading
  },
  button: {
    width: 56,
    height: 56,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.green,
  },
  buttonIcon: {
    fontSize: 26,
    color: colors.white
  }
})