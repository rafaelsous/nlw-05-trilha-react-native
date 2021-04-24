import React, { useState } from 'react'
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { format, isBefore } from 'date-fns'

import { Button } from '../components/Button'

import { PlantProps, savePlant, loadPlants } from '../libs/storage'

import waterDropImg from '../assets/waterdrop.png'

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
    } catch (error) {
      Alert.alert('Não foi possível salvar sua plantinha 😢')
    }
  }

  return (
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
        <View style={styles.tipContainer}>
          <Image
            source={waterDropImg}
            style={styles.tipImage}  
          />

          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>

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
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    position: 'relative',
    bottom: 70,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
  },
  tipImage: {
    width: 56,
    height: 56,
    marginRight: 24,
  },
  tipText: {
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 23,
    color: colors.blue,
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