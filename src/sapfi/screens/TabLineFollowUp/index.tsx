import React, { Component } from "react";
import styles from "./styles";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";

export default function TabLineFollowUp() {
  return (
    <Container>
    <Content padder>
      <Card>
        <CardItem header bordered>
          <Text>NativeBase</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>
              NativeBase is a free and open source framework that enable
              developers to build
              high-quality mobile apps using React Native iOS and Android
              apps
              with a fusion of ES6.
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Text>GeekyAnts</Text>
        </CardItem>
      </Card>
    </Content>
  </Container>
  );
}