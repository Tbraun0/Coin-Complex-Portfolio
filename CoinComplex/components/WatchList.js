import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addElement, removeElement } from '../actions/watchlist.js';

export default class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleAddElement = (n) => {
    this.store.dispatch(addElement(n));
  }

  handleRemoveElement = (n) => {
    this.store.dispatch(removeElement(n));
  }

  render() {
    return (
      <View style={styles.WatchListPage}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WatchListPage: {
  	height:'100%',
  	width:'100%',
  },
  UserInput: {
  },
});