import { Ionicons  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabLineFollowUp from '../screens/TabLineFollowUp/index';
import TabTicketFollowUp from '../screens/TabTicketFollowUp/index';

import { BottomTabParamList, TabTicketFollowUpParamList, TabLineFollowUpParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabTicketFollowUp"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabTicketFollowUp"
        component={TabTicketFollowUpNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="people-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabLineFollowUp"
        component={TabLineFollowUpNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="business-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabTicketFollowUpStack = createStackNavigator<TabTicketFollowUpParamList>();

function TabTicketFollowUpNavigator() {
  return (
    <TabTicketFollowUpStack.Navigator>
      <TabTicketFollowUpStack.Screen
        name="TabTicketFollowUp"
        component={TabTicketFollowUp}
        options={{ headerTitle: 'Acompanhar pedido' }}
      />
    </TabTicketFollowUpStack.Navigator>
  );
}

const TabLineFollowUpStack = createStackNavigator<TabLineFollowUpParamList>();

function TabLineFollowUpNavigator() {
  return (
    <TabLineFollowUpStack.Navigator>
      <TabLineFollowUpStack.Screen
        name="TabLineFollowUp"
        component={TabLineFollowUp}
        options={{ headerTitle: 'Situação da fila' }}
      />
    </TabLineFollowUpStack.Navigator>
  );
}
