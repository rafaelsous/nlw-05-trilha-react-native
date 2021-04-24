import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../components/Header'
import { Spotlight } from '../components/Spotlight'
import { PlantCardSecondary } from '../components/PlantCardSecondary'

import { PlantProps, loadPlants } from '../libs/storage'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    async function loadStoragedPlants() {
      const storagedPlants = await loadPlants();

      const nextTime = formatDistance(
        new Date(storagedPlants[0].dateTimeNotification).getTime(),
        new Date(),
        {
          locale: ptBR
        }
      )

      setNextWatered(
        `Regue sua ${storagedPlants[0].name} daqui a ${nextTime} horas`
      )

      setPlants(storagedPlants)
      setLoading(false)
    }

    loadStoragedPlants()
  }, [])

  return (
    <View style={styles.container}>
      <Header
        primaryText="Minhas"
        secondaryText="Plantinhas"
      />

      {nextWatered && (
        <Spotlight
          text={nextWatered}
          customStyle={{
            bottom: 0,
            marginTop: 20,
          }}
        />
      )}

      <View style={styles.plantsContainer}>
        <Text style={styles.title}>Próximas regadas</Text>
        
        <FlatList
          data={plants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              key={item.id}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10 }} />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  plantsContainer: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    marginBottom: 16,
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    textAlign: 'left'
  },
})