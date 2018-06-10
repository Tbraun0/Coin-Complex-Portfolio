import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as watchListActions from '../../actions/watchlistActions';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
import WatchList from './WatchList.js';
import { TouchableHighlight, TouchableOpacity, Image, Component} from 'react-native';
import removeButtonIMG from '../../images/removebutton.png';
//redux store
import store from '../../store.js';

export default class WatchListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: true,
      pressStatus: false,
    }
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
    this.setState({rendered: false});
  }

  renderRow = (listItem) => {
    var itemName = listItem.item.name;
    return ( 
      <View style={styles.row}>
          <Text style={styles.text}> {itemName} </Text>
          <TouchableOpacity onPress={() => this.handleRemoveElement({name: itemName})}>
            <Image source={removeButtonIMG} style={styles.inlineImg}/>
          </TouchableOpacity>
      </View>
    )
  }

    _onHideUnderlay() {
      this.setState({pressStatus: false});
    }
    _onShowUnderlay() {
      this.setState({ pressStatus: true});
    }
    handlePress = () => {
      console.log('Pressed');
    }

  render() {
    let watchRow;
    this.state.rendered ? watchRow = <TouchableHighlight style={styles.rowWrap} activeOpacity={.5} onPress={this.handlePress} underlayColor='#30a1ad'>{this.renderRow(this.props.listItem)}</TouchableHighlight> : watchRow = <View></View>;
    return (
      <View>
        {watchRow}
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
  rowWrap: {
    height:45,
    width:'100%',
    backgroundColor: '#0c0c0c',
    display:'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
  row: {
    width: '100%',
    height:'100%',
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
  inlineImg: {
    width:30,
    height:30,
    marginRight: 15,
  },
  listStyle: {
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});