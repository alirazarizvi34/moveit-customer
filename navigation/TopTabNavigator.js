import React from 'react';
import {Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CompletedTrips from '../src/screens/CompletedTrips';
import {useTranslation} from 'react-i18next';
import Moving from '../src/screens/Moving';
import {THEME} from '../src/shared/theme';

const {colro5A3278, colorF7EDFF, color4E008A} = THEME.colors;

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = ({activeTab}) => {
  const {t, i18n} = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={activeTab&&activeTab=="relocation"?"Moving":"CompleteTrips"}
      screenOptions={{
        inactiveTintColor: 'blue',

        activeTintColor: 'red',
        tabStyle: {
          activeTintColor: 'red',
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colorF7EDFF,
        },
        tabBarActiveTintColor: colro5A3278,
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        style: {
          // backgroundColor: 'red',
        },
      }}>
      <Tab.Screen
        name="CompleteTrips"
        component={CompletedTrips}
        options={{
          tabBarLabel: t('book_truck_now'),
          tabBarActiveTintColor: colro5A3278,
          tabBarIndicatorStyle: {
            backgroundColor: color4E008A,
            height: 3,
          },
        }}
      />

      <Tab.Screen
        name="Moving"
        component={Moving}
        options={{
          tabBarLabel: t('relocations'),
          tabBarActiveTintColor: colro5A3278,
          // tabBarIndicatorContainerStyle: {
          //   backgroundColor: colorF7EDFF,
          // },
          tabBarIndicatorStyle: {
            backgroundColor: colro5A3278,
            height: 3,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
