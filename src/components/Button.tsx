import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

export function Button({ title, active = true, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        {
          backgroundColor: active ? colors.green : colors.green_light
        }
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  title: {
    fontFamily: fonts.complement,
    fontSize: 17,
    color: colors.white,
  }
})