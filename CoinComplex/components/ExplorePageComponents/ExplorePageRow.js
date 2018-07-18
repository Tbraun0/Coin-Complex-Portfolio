import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import * as watchListActions from '../../actions/watchlistActions';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
import { toggleFullPage } from '../../actions/fullPageGraphActions.js';
import WatchList from '../WatchListComponents/WatchList.js';
import { TouchableHighlight, TouchableOpacity, Image, Component} from 'react-native';
import addButtonIMG from '../../images/addbutton.png';
import addButtonIMGPressed from '../../images/addbuttonPressed.png';
import ExplorePageRowPercentChange from './ExplorePageRowPercentChange.js';
import Ripple from 'react-native-material-ripple';

//redux store
import store from '../../store.js';

export default class ExplorePageRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: true,
      pressStatus: false,
      priceIn: props.currencyPair,
    }
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
    this.setState({rendered: false});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({priceIn: nextProps.currencyPair});
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.currencyPair === this.state.priceIn && nextProps.changePeriod ===this.state.changePeriod) {
      return false;
    }
    else {
      return true;
    }
  }

  handleAddElement = (n) => {
    store.dispatch(addElement(n));
  }

  renderRow = (listItem) => {
    var itemTicker = listItem.symbol;
    console.log(this.state.priceIn);
    console.log(listItem);
    var itemName = listItem.name;
    var price = parseFloat(listItem.quotes[this.props.currencyPair].price).toFixed(2);
    var addButton;
    if (store.getState().watchlist.list.has(listItem.symbol) || this.state.pressStatus) {
      addButton = <View style={{width:30,height:30,marginRight:15}}>
              		<Image source={addButtonIMGPressed} style={styles.inlineImg}/>
      			</View>          
      		}
    else {
      addButton = <TouchableOpacity style={styles.elevate} 
      				onPress={() => {
      					this.handleAddElement(itemTicker);
      					this.setState({pressStatus: true});
      				}
      			}>
              <Image source={addButtonIMG} style={styles.inlineImg}/>
            </TouchableOpacity>;
    }
    return ( 
      <View style={styles.row} id={this.props.id}>
          <View style={styles.halfRow}>
            <Text style={styles.rankText}>{listItem.rank}</Text>
            <View style={styles.halfRowFlex}>
              <View style={styles.halfRowSplit}>
                <Text style={styles.text}> {itemTicker} </Text>
              </View>
              <View style={styles.halfRowSplit}>
                <Text style={styles.text1}> {itemName} </Text>
              </View>
            </View>
          </View>
          <View style={styles.halfRowAlign}>
            {addButton}
            <View style={styles.halfRowFlex}>
              <ExplorePageRowPercentChange coin={this.props.coin} currencyPair={this.props.currencyPair}/>
	            <View style={styles.halfRowSplitRight}>
	            	<Text style={styles.textChange}>{price}{' '+this.props.currencyPair}</Text>
	            </View>
            </View>
          </View>
      </View>
    )
  }

  render() {
    let watchRow;
    this.state.rendered ? watchRow = 
    <TouchableHighlight style={styles.rowWrap}
      onPress={() => {
        store.dispatch(toggleFullPage(true, this.props.coin));
        this.props.changeSearchableMounted(false);
      }} 
      >{this.renderRow(this.props.coin)}</TouchableHighlight> 
      : watchRow = <View></View>;
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
  halfRow: {
    width:'50%',
    height:50,
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
  },
  fullPageView: {
  	position: 'absolute',
  	top:0,
  	bottom:0,
  	left:0,
  	right:0,
  },
  elevate: {
    width:30,
    height:30,
    marginRight:15,
    elevation: 6,
  },
  halfRowAlign: {
    width:'50%',
    height:50,
    display:'flex',
    alignItems:'center',
    flexDirection:'row-reverse',
  },
  halfRowFlex: {
  	flexDirection: 'column',
  },	
  halfRowSplitRight: {
  	height:25,
  	marginRight: 5,
    display:'flex',
    justifyContent:'center',
  },
  halfRowSplit: {
    height:25,
    marginLeft:5,
    display:'flex',
    justifyContent:'center',
  },
  UserInput: {
  },
  rowWrap: {
    height:50,
    width:'100%',
    backgroundColor: '#141313',
    display:'flex',
    elevation:1,
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
  row: {
    width: '100%',
    display:'flex',
    elevation:0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 15,
    marginLeft:5,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  text1: {
    fontFamily: 'avenirlight',
    fontSize: 13,
    marginLeft:5,
    letterSpacing:2,
    opacity:0.8,
    color:'#e9ebeb',
  },
   textChange: {
    fontFamily: 'avenirlight',
    fontSize: 13,
    textAlign: 'right',
    marginRight:5,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  rankText: {
    fontSize: 15,
    color:'#e9ebeb',
    marginLeft:15,
    letterSpacing:2,
    fontFamily: 'avenirlight',
  },
  inlineImg: {
    width:30,
    height:30,
  },
  listStyle: {
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});