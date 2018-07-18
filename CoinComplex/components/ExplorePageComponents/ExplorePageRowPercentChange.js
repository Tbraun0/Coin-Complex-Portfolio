import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import WatchList from '../WatchListComponents/WatchList.js';
import { connect } from 'react-redux';

//redux store
import store from '../../store.js';

class ExplorePageRowPercentChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceIn: props.currencyPair,
      changePeriod: '24H'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({changePeriod: nextProps.changePeriod, priceIn:nextProps.currencyPair});
  }

  render() {
    var changeString = "percent_change_" + (this.state.changePeriod.toLowerCase());
    var percentChange = this.props.coin.quotes[this.props.currencyPair][changeString];
    var plus;
     var changeColorStyle;
    parseFloat(percentChange) < 0 ? changeColorStyle='#ea1c37' : changeColorStyle='#1fe518';
    parseFloat(percentChange) < 0 ? plus='' : plus='+';
    return ( 
     <View style={styles.halfRowSplitRight}>
       <Text style={[styles.textChange, {color: changeColorStyle}]}>{plus}{percentChange}%</Text>
     </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    changePeriod: state.globalPercent.globalPercentChange,
  }
}
export default connect(mapStateToProps)(ExplorePageRowPercentChange)

const styles = StyleSheet.create({
    halfRowSplitRight: {
    height:25,
    marginRight: 5,
    display:'flex',
    justifyContent:'center',
  },
   textChange: {
    fontFamily: 'avenirlight',
    fontSize: 13,
    textAlign: 'right',
    marginRight:5,
    letterSpacing:2,
    color:'#e9ebeb',
  },
})