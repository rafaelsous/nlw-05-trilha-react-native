import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { Button } from '../components/Button'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.emoji}>
            😄
          </Text>

          <Text style={styles.title}>
            Prontinho
          </Text>

          <Text style={styles.subTitle}>
            Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
          </Text>

          <View style={styles.footer}>
            <Button title="Começar" />
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    marginTop: 40,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 38,
    color: colors.heading,
    fontFamily: fonts.heading
  },
  subTitle: {
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    color: colors.heading
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50
  }
})