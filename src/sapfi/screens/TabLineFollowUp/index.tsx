import * as React from 'react';
import styles from "./styles";

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabLineFollowUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar situação da fila</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}