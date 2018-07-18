import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class GraphsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
//https://medium.com/the-react-native-log/animated-charts-in-react-native-using-d3-and-art-21cd9ccf6c58
  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the Graphs Page!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainPage: {
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0c0c0c',
  },
});