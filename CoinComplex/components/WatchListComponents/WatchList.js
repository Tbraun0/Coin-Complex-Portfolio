import React from 'react';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
import {
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Image,
  Component,
  View,
  Text,
  FlatList,
} from 'react-native';
import {dispatch} from 'redux';
import { connect } from 'react-redux'
import {List,ListItem} from 'react-native-elements';
import removeButtonIMG from '../../images/removebutton.png';
import WatchListRow from './WatchListRow';

import store from '../../store.js';


class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: store.getState().watchlist.list,
      refreshing: false,
      }
    };

  renderRow = (listItem) => {
    return ( 
      <WatchListRow listItem={listItem} />
    )
  }
/*
  componentWillRecieveProps(nextProps) {
    this.setState({dataSource: store.getState().watchlist.list});
  }
*/

  handleAddElement = (n) => {
    store.dispatch(addElement(n));
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
  }

  dataRefresh = () => {
    this.setState({refreshing: true});
    promise1.then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <View style={styles.WatchListPage}>
        <FlatList
          data={this.state.dataSource}
          refreshing={this.state.refreshing}
          onRefresh={() => this.dataRefresh()}
          renderItem={(item) => this.renderRow(item)}
          keyExtractor={item => item.name}/>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    dataSource: state.dataSource,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddElement: (n) => dispatch(addElement(n)),
    handleRemoveElement: (n) => dispatch(removeElement(n)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)

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
  inlineImg: {
    width:30,
    height:30,
    marginRight: 15,
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 18,
    marginLeft:15,
    letterSpacing:2,
    color:'#e9ebeb',
  },
});