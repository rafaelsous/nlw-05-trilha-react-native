import React, { useState } from 'react'
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { format, isBefore } from 'date-fns'

import { Button } from '../components/Button'
import { Spotlight } from '../components/Spotlight'

import { ConfirmationParams } from './Confirmation'
import { PlantProps, savePlant } from '../libs/storage'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDateTimePicker, setShowDateTimePicker] = useState(Platform.OS === 'ios')
  const route =  useRoute();
  const { plant } = route.params as Params;
  const { navigate } = useNavigation()

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDateTimePicker(oldValue => !oldValue)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      return Alert.alert('Selecione um hoário horário futuro! ⏱️')
    }

    if (dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDateTimePicker(oldValue => !oldValue)
  }
  
  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      })

      navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextPage: 'MyPlants'
      } as ConfirmationParams)
    } catch (error) {
      Alert.alert('Não foi possível salvar sua plantinha 😢')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.name}>{plant.name}</Text>

          <Text style={styles.about}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <Spotlight text={plant.water_tips} />

          <Text style={styles.alertText}>
            Escolha o melhor horário para ser lembrado:
          </Text>
          
          {showDateTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )}

          <Button
            title="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  name: {
    paddingVertical: 16,
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    lineHeight: 32,
  },
  about: {
    marginBottom: 16,
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
    color: colors.heading,
  },
  controller: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
    backgroundColor: colors.white,
  },
  alertText: {
    marginTop: 40,
    fontFamily: fonts.complement,
    fontSize: 14,
    color: colors.heading,
    textAlign: 'center',
  },
  dateTimePicker: {
    width: '100%',
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    fontFamily: fonts.text,
    fontSize: 24,
    color: colors.heading,
  }
})