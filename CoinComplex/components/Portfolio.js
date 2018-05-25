import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Text>
          This is the Portfolio Page!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainPage: {
  },
});