import React from 'react'
import { Image, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'

import waterDropImg from '../assets/waterdrop.png'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface SpotlightProps {
  text: string;
  customStyle?: StyleProp<ViewStyle>
}

export function Spotlight({ text, customStyle }: SpotlightProps) {
  return (
    <View
      style={[
        styles.container,
        customStyle,
      ]}
    >
      <Image
        source={waterDropImg}
        style={styles.image}
      />

      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 70,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 24,
  },
  text: {
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 23,
    color: colors.blue,
  },
})