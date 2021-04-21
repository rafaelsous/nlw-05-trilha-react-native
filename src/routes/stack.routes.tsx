import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator();

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';

import colors from '../styles/colors'

const AppRoutes: React.FC = () => (
  /*
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  */
  <Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <Screen name="Welcome" component={Welcome} />
    <Screen name="UserIdentification" component={UserIdentification} />
    <Screen name="Confirmation" component={Confirmation} />
  </Navigator>
)

export default AppRoutes;