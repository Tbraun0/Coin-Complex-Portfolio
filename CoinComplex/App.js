import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topbar}></View>
        <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        <Text style={styles.text1}>Changes you make will automatically reload.</Text>
        <Text style={styles.text1}>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0c0c0c',
  },
  topbar: {
    backgroundColor: '#e9ebeb',
    width:'100%',
    height:50,
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 20,
    letterSpacing:2,
  	color: '#e9ebeb',
  },
  text1: {
    letterSpacing:4,
    color: '#e9ebeb',
  },
});
