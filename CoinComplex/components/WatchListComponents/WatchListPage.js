import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as watchListActions from '../../actions/watchlistActions';
import WatchList from './WatchList.js';

//redux store
import store from '../../store.js';
store.dispatch(watchListActions.addElement({name: 'BTC'}));
//store.dispatch(addElement('ETH'));

export default class WatchListPage extends React.Component {
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
        <WatchList listItems={store.getState()} style={styles.listStyle}/>
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
  text: {
    fontFamily: 'avenirlight',
    margin:'auto',
    fontSize: 20,
    letterSpacing:2,
    color: '#e9ebeb',
  },
  listStyle: {
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});