import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, YellowBox, Animated, Dimensions } from 'react-native';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import { Dropdown } from 'react-native-material-dropdown';
import { updateCurrency } from '../../actions/currencyOptionActions.js';
import axios from 'axios';
import { toggleFullPage } from '../../actions/fullPageGraphActions.js';
import { connect } from 'react-redux';
import Back_Arrow from '../../images/Back_Arrow.png';

import store from '../../store.js';


class ExplorePageFullPageTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoin: props.currentCoin,
      currencyPair: 'USD',
      currentPrice: props.currentCoin.price_usd,
    }
    this.getLatestPrice();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentCoin: nextProps.currentCoin, currencyPair: nextProps.currencyPair},() => this.getLatestPrice());
  }

  onChangeTextPair = (text) => {
    store.dispatch(updateCurrency(text));
  }

  getLatestPrice = () => {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=' + this.state.currentCoin.symbol + '&tsyms=USD,BTC,ETH,EUR')
      .then((res) => {
        let currentPair = this.state.currencyPair;
        this.setState({currentPrice: res.data[currentPair]});
      }).catch(() => {
        console.log('Fetch Failed');
      })
  }

  render() {
    const compareOptions = [{
      value: 'USD',
    }, {
      value: 'EUR',
    }];
    console.log(this.state.currentCoin);
    if (this.state.currentCoin.symbol != 'BTC') {
      compareOptions.push({value: 'BTC'});
    }
    if(this.state.currentCoin.symbol != 'ETH') {
      compareOptions.push({value: 'ETH'});
    }
    return (
      <View style={{height:90, width:'100%'}}>
        <View style={styles.topbarInfoContainer}>
          <View style={styles.topbarNameContainer}>
            <TouchableOpacity style={styles.touchableBackContainer} 
              onPress={() => {
                store.dispatch(toggleFullPage(false, this.state.currentCoin));
                this.props.changeSearchableMounted(true);
              }}>
              <Image source={Back_Arrow} style={styles.backImage}/>
            </TouchableOpacity>
          <Text style={styles.headerTextTitle}>{this.state.currentCoin.name}</Text>
          <Text style={styles.headerTextSymbol}>{'(' + this.state.currentCoin.symbol + ')'}</Text>
        </View>
          <Dropdown
            label='Currency'
            containerStyle={{width:100, borderRadius: 4,paddingHorizontal: 5}}
            textColor='#e9ebeb'
            baseColor='#e9ebeb'
            dropdownPosition={-4}
            dropdownOffset={{top:32, left:0}}
            value={this.state.currencyPair}
            onChangeText={this.onChangeTextPair}
            data={compareOptions}/>    
            </View>
        <View style={styles.topbarPriceContainer}>
          <Text style={styles.headerText}>{this.state.currentPrice + ' '}{this.state.currencyPair}</Text>
        </View>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currencyPair: state.currencyOption.currency,
    currentCoin: state.fullPage.currentCoin,
  }
}
export default connect (mapStateToProps)(ExplorePageFullPageTopBar)

const styles = StyleSheet.create({
  fullPageContainer: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  topbarNameContainer: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  touchableBackContainer: {
    width: 30,
    height: 30,
    marginLeft:15,
  },
  topbarInfoContainer: {
    width:'100%',
    height:45,
    marginTop:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  topbarPriceContainer: {
    width:'100%',
    height:40,
    display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
  },
  fullPageContentDisplayed: {
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    backgroundColor:'black',
    elevation: 3,
  },
  fullPageContentHidden: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'rgba(0,0,0,0)',
  },
  backImage: {
    width:30,
    height:30,
  },
  headerText: {
    fontFamily: 'avenirlight',
    fontSize: 16,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  headerTextTitle: {
    fontFamily: 'avenirlight',
    fontSize: 16,
    marginLeft:10,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  topbarButtonText: {
    fontFamily: 'avenirlight',
    fontSize: 14,
    letterSpacing:2,  
    padding:0,
    fontWeight:'normal', 
  },
  headerTextSymbol: {
    fontFamily: 'avenirlight',
    fontSize: 16,
    marginLeft:10,
    opacity:0.7,
    letterSpacing:2,
    color:'#e9ebeb',
  },
});