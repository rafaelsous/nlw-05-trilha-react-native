import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface ButtonProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export function PlantCardSecondary({ data, ...rest }: ButtonProps) {
  return (
    <RectButton
      style={styles.container}
      { ...rest }
    >
      <SvgFromUri
        uri={data.photo}
        width={50}
        height={50}
      />

      <Text style={styles.title}>{data.name}</Text>

      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.time}>{data.hour}</Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.shape,
    borderRadius: 16,
  },
  title: {
    flex: 1,
    marginLeft: 25,
    fontFamily: fonts.heading,
    fontSize: 15,
    lineHeight: 25,
    color: colors.body_dark,
  },
  details: {
    paddingHorizontal: 5,
  },
  timeLabel: {
    fontFamily: fonts.text,
    fontSize: 13,
    color: colors.body_light
  },
  time: {
    fontFamily: fonts.heading,
    fontSize: 15,
    lineHeight: 20,
    color: colors.body_dark,
    textAlign: 'right',
  }
})