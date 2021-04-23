import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({ title, active = false, ...rest }: EnvironmentButtonProps) {
  
  function handleSelectEnvironment() {

  }
  
  return (
    <RectButton 
      style={[
        styles.button,
        active && styles.activeButton,
      ]}
      { ...rest }
    >
      <Text 
        style={[
          styles.buttonText,
          active && styles.activeButtonText,
        ]}
      >
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 76,
    height: 40,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.shape,
  },
  buttonText: {
    fontFamily: fonts.complement,
    fontSize: 14,
    color: colors.heading,
  },
  activeButton: {
    backgroundColor: colors.green_light,
  },
  activeButtonText: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
})