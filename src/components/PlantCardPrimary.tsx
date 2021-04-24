import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface ButtonProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({ data, ...rest }: ButtonProps) {
  return (
    <RectButton
      style={styles.button}
      { ...rest }
    >
      <SvgFromUri
        uri={data.photo}
        width={70}
        height={70}
      />

      <Text style={styles.buttonText}>{data.name}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: '47%',
    height: 154,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.shape,
    borderRadius: 20,
  },
  buttonText: {
    marginVertical: 16,
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.green_dark,
  }
})