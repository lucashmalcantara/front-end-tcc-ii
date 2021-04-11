import * as React from 'react';
import styles from "./styles";

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabTicketFollowUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar pedido</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}