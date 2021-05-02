import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import useColorScheme from "../hooks/useColorScheme";
import TabLineFollowUp from "../screens/TabLineFollowUp/index";
import TabTicketFollowUp from "../screens/TabTicketFollowUp/index";
import { colors } from "../styles";

import {
  BottomTabParamList,
  TabTicketFollowUpParamList,
  TabLineFollowUpParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabTicketFollowUp"
      tabBarOptions={{
        activeTintColor: colors.primary,
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTab.Screen
        name="TabTicketFollowUp"
        component={TabTicketFollowUpNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="fastfood" color={color}  />,
          tabBarLabel: "Acompanhar pedido"
        }}
      />
      <BottomTab.Screen
        name="TabLineFollowUp"
        component={TabLineFollowUpNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="store" color={color} />,
          tabBarLabel: "Situação da fila"
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
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
        options={{ headerTitle: "Acompanhar pedido" }}
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
        options={{ headerTitle: "Situação da fila" }}
      />
    </TabLineFollowUpStack.Navigator>
  );
}
