import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View 
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()
  const { navigate } = useNavigation()

  function handleInputBlur() {
    setIsFocused(false)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  async function handleConfirm() {
    if (name) {
      try {
        await AsyncStorage.setItem('@plantmanager:user', name)
        navigate('Confirmation')
      } catch (error) {
        Alert.alert('Não foi possível salvar o seu nome 😢')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1, flexDirection: 'row', width: '100%' }}
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
                  onPress={handleConfirm}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    fontSize: 18,
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