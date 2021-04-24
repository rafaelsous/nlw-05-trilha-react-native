import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { Button } from '../components/Button'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export interface ConfirmationParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug' | 'smiley';
  nextPage: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄',
  smiley: '😃'
}

export function Confirmation() {
  const { navigate } = useNavigation()
  const route = useRoute();
  const { title, subtitle, buttonTitle, icon, nextPage } = route.params as ConfirmationParams;

  function handleMoveOn() {
    navigate(nextPage)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.emoji}>
            {emojis[icon]}
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subTitle}>
            {subtitle}
          </Text>

          <View style={styles.footer}>
            <Button
              title={buttonTitle}
              onPress={handleMoveOn}
            />
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
    fontSize: 18,
    lineHeight: 25,
    color: colors.heading
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50
  }
})