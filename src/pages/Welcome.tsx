import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>

      <Image source={wateringImg} style={styles.image} />

      <Text style={styles.subTitle}>
        Não esqueça mais de regar suas plantas.
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>
          >
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 38,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 42,
    textAlign: 'center',
    color: colors.heading
  },
  image: {
    width: 292,
    height: 284,
  },
  subTitle: {
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 18,
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
  buttonText: {
    fontSize: 24,
    color: colors.white
  }
})