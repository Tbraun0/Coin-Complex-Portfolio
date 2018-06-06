import React from 'react';
import { addElement, removeElement } from '../actions/watchlistActions.js';
import {
  TouchableHighlight,
  StyleSheet,
  Component,
  View,
  Text,
  FlatList,
} from 'react-native';
import {List,ListItem} from 'react-native-elements';

import store from '../store.js';
var dataSource =  [{name: 'BTC'}, {name: 'ETH'}, {name: 'LTC'}];
export default class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: store.getState().watchlist.list,
      }
    };

  renderRow = (listItem) => {
    return ( 
      <View style={styles.row}>
        <Text style={styles.text}> {listItem.item.name} </Text>
      </View>
    )
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
        <FlatList
          data={this.state.dataSource}
          renderItem={(item) => this.renderRow(item)}
          keyExtractor={item => item.name}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WatchListPage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0c0c0c',
  },
  UserInput: {
  },
  listStyle: {
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  row: {
    paddingVertical: 12,
    backgroundColor: '#0c0c0c',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
    width: '100%',
    display:'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:'center',
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 18,
    marginLeft:15,
    letterSpacing:2,
    color:'#e9ebeb',
  },
});