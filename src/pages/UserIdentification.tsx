import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View 
} from 'react-native'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  function handleInputBlur() {
    setIsFocused(false)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.emoji}>
              { isFilled ? '😄' : '😃' }
            </Text>

            <Text style={styles.title}>
              Como podemos {'\n'} chamar você?
            </Text>

            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && {
                  borderColor: colors.green
                }
              ]}
              placeholder="Digite um nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />

            <View style={styles.footer}>
              <Button
                title="Confirmar"
                disabled={!isFilled}
                active={isFilled}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54
  },
  emoji: {
    marginBottom: 24,
    fontSize: 44
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
    color: colors.heading
  },
  input: {
    width: '100%',
    marginTop: 40,
    padding: 10,
    fontFamily: fonts.complement,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 23,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  }
})