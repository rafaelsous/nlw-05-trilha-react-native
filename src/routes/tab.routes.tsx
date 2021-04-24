import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

import fonts from '../styles/fonts'
import colors from '../styles/colors'

const { Navigator, Screen } = createBottomTabNavigator();

const AuthRoutes = () => (
  <Navigator
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.heading,
      labelPosition: 'beside-icon',
      style: {
        height: 88,
      },
      labelStyle: {
        fontSize: 16,
      }
    }}
  >
    <Screen
      name="Nova planta"
      component={PlantSelect}
      options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="add-circle-outline"
            size={size}
            color={color}  
          />
        ))
      }}
    />

    <Screen
      name="Minhas plantinhas"
      component={MyPlants}
      options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        )),
      }}
    />
  </Navigator>
)

export default AuthRoutes