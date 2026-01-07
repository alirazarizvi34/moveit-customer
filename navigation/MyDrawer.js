import * as React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import {useTranslation} from 'react-i18next';

export default function MyDrawer({navigation}) {
  const Drawer = createDrawerNavigator();
  const {t, i18n} = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: '70%',
        marginTop: 72,
      }}>
      {/* <Drawer.Screen
        name="CorporateForms"
        component={CorporateForms}
        options={{
          headerShown: true,
          title: t('Corporate Solution'),
          headerStyle: {backgroundColor: '#633C7D'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: '600'},
        }}
      /> */}
    </Drawer.Navigator>
  );
}
