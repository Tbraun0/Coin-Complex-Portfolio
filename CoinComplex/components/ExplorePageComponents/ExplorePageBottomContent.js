import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

/*
https://api.coinmarketcap.com/v2/ticker/?structure=array
In order of market cap
*/

class ExplorePageBottomContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoin: {},
      currencyPair: 'USD',
      currentPrice: 0,
      isMounted: false,
    }
  }

  componentDidMount() {
  	this.setState({isMounted: true});
  }
  componentWillUnmount() {
  	this.setState({isMounted: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyPair !== this.state.currencyPair) {
      var ID = this.state.currentCoin.id;
        axios.get('https://api.coinmarketcap.com/v2/ticker/' + ID + '/?convert=' + this.state.currencyPair)
          .then((res) => {
            var newCoin = res.data;
            if (this.state.isMounted) {
            	this.setState({currentCoin: newCoin, currencyPair: nextProps.currencyPair});
        	}
          }).catch(() => {
            console.log('Fetch Failed');
          })
    } else {
    	if (this.state.isMounted) {
    		this.setState({currentCoin: nextProps.currentCoin, currencyPair: nextProps.currencyPair});
    	}
  	}	
  }

  render() {
    var marketCapString = 'market_cap_' + this.state.currencyPair.toLowerCase();
    return (
      <View>
        <View style={styles.fullWidthBar}>
          <Text style={styles.leftText}>Market Cap:</Text>
          <Text style={styles.rightText}>{' ' + this.state.currentCoin[marketCapString] + ' ' + this.state.currencyPair}</Text>
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
export default connect (mapStateToProps)(ExplorePageBottomContent)

const styles = StyleSheet.create({
  fullWidthBar: {
    height: 30,
    width:'100%',
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
  },
  leftText: {
    fontFamily: 'avenirlight',
    marginLeft:15,
    fontSize: 14,
    color:'#e9ebeb',
    letterSpacing: 2,
  },
  rightText: {
    fontFamily: 'avenirlight',
    marginLeft:15,
    fontSize: 14,
    color:'#e9ebeb',
    letterSpacing: 2,
    opacity:0.8,
  },
});