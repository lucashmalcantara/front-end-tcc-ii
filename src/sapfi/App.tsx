import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import React from "react";

import { UserProvider } from "./contexts/User";
import { Root } from "native-base";

export default function App() {
  const isReady = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isReady) {
    return null;
  } else {
    return (
      <Root>
        <SafeAreaProvider>
          <UserProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </UserProvider>
        </SafeAreaProvider>
      </Root>
    );
  }
}
