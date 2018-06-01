import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Text>
          This is the Settings Page!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainPage: {
  },
});