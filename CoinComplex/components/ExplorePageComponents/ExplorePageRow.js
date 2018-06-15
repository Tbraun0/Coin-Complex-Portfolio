import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import * as watchListActions from '../../actions/watchlistActions';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
import WatchList from '../WatchListComponents/WatchList.js';
import { TouchableHighlight, TouchableOpacity, Image, Component} from 'react-native';
import addButtonIMG from '../../images/addbutton.png';
//redux store
import store from '../../store.js';

export default class ExplorePageRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: true,
      pressStatus: false,
      expanded: false,
      animation: new Animated.Value(),
    }
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
    this.setState({rendered: false});
  }

  toggleExpand = () => {
  	let initialVal = this.state.expanded? 180 : 60;
  	let finalVal = this.state.expanded? 60: 180;

  	this.setState( {expanded: !this.state.expanded} );

  	this.state.animation.setValue(initialVal);

  	Animated.spring(
  		this.state.animation,
  		{
  			toValue: finalVal
  		}
  	).start();
  }


  handleAddElement = (n) => {
    store.dispatch(addElement(n));
  }

  renderRow = (listItem) => {
    var itemTicker = listItem.symbol;
    var itemName = listItem.name;
    var dayChange = listItem.percent_change_24h;
    var changeColorStyle;
    var plus;
    parseFloat(dayChange) < 0 ? changeColorStyle='#ea1c37' : changeColorStyle='#1fe518';
    parseFloat(dayChange) < 0 ? plus='' : plus='+';
    return ( 
      <View style={styles.row} id={this.props.id}>
          <View style={styles.halfRow}>
            <View style={styles.halfRowSplit}>
              <Text style={styles.text}> {itemTicker} </Text>
            </View>
            <View style={styles.halfRowSplit}>
              <Text style={styles.text1}> {itemName} </Text>
            </View>
          </View>
          <View style={styles.halfRowAlign}>
            <TouchableOpacity onPress={() => this.handleAddElement({name: itemTicker})}>
              <Image source={addButtonIMG} style={styles.inlineImg}/>
            </TouchableOpacity>
            <View>
            	<Text style={[styles.textChange, {color: changeColorStyle}]}>{plus}{dayChange}%</Text>
            </View>
          </View>
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
    this.state.rendered ? watchRow = <TouchableHighlight style={styles.rowWrap} activeOpacity={.5} onPress={this.toggleExpand} underlayColor='#30a1ad'>{this.renderRow(this.props.coin)}</TouchableHighlight> : watchRow = <View></View>;
    return (
      <Animated.View style={[styles.rowExpand, {height:this.state.animation}]}>
        {watchRow}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  WatchListPage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0c0c0c',
  },
  halfRow: {
    paddingTop:5,
    width:'50%',
    height:60,
  },
  halfRowAlign: {
    width:'50%',
    height:60,
    display:'flex',
    alignItems:'center',
    flexDirection:'row-reverse',
  },
  halfRowSplit: {
    height:30,
    width:'100%',
  },
  UserInput: {
  },
  rowExpand: {

  },
  rowWrap: {
    height:60,
    width:'100%',
    backgroundColor: '#141313',
    display:'flex',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
  row: {
    width: '100%',
    display:'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 18,
    marginLeft:15,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  text1: {
    fontFamily: 'avenirlight',
    fontSize: 16,
    marginLeft:15,
    letterSpacing:2,
    opacity:0.8,
    color:'#e9ebeb',
  },
   textChange: {
    fontFamily: 'avenirlight',
    fontSize: 16,
    marginRight:5,
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