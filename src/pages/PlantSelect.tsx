import React, { useEffect, useState } from 'react'
import  { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Header } from '../components/Header'
import { EnvironmentButton } from '../components/EnvironmentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Loading } from '../components/Loading'

import { PlantProps } from '../libs/storage'

import api from '../services/api'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const [loadAll, setLoadAll] = useState(false)
  const { navigate } = useNavigation()

  useEffect(() => {
    async function loadEnvironments() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      
      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    loadEnvironments()
  }, [])

  useEffect(() => {
    loadPlants()
  }, [])

  async function loadPlants() {
    const { data, headers } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=6`)
    const totalCount = headers['x-total-count']

    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }

    setLoading(false)
    setLoadMore(false)
  }

  function handleSelectEnvironment(environmentKey: string) {
    setSelectedEnvironment(environmentKey)

    if (environmentKey === 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter(plant => plant.environments.includes(environmentKey))
    setFilteredPlants(filtered)
  }

  function handleLoadMore(distance: number) {
    if (distance < 1)
      return

    setLoadMore(true)
    setPage(oldValue => oldValue + 1)

    // TODO: Verificar o porquê de estar fazendo duas chamadas à API quando a lista é arrastada até o final
    loadPlants()
  }

  function handleSelectPlant(plant: PlantProps) {
    navigate('PlantSave', { plant })
  }

  return (loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.strongTitle}>
          Em qual ambiente
        </Text>

        <Text style={styles.title}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <EnvironmentButton
              key={item.key}
              title={item.title}
              onPress={() => handleSelectEnvironment(item.key)}
              active={item.key === selectedEnvironment}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              key={item.id} 
              data={item}
              onPress={() => handleSelectPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.plantList}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleLoadMore(distanceFromEnd)}
          ListFooterComponent={
            loadMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textContainer: {
    paddingHorizontal: 32,
  },
  strongTitle: {
    marginTop: 40,
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.heading,
  },
  title: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 23,
    color: colors.heading,
  },
  environmentList: {
    marginTop: 24,
    paddingHorizontal: 32,
  },
  plants: {
    flex: 1,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  plantList: {
    justifyContent: 'space-between',
  }
})