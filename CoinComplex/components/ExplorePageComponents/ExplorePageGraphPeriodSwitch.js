import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, YellowBox, Animated, Dimensions } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { changePeriod } from '../../actions/graphPeriodActions.js';
import store from '../../store';
//https://min-api.cryptocompare.com/

//https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=7
//7 Day price history for Bitcoin

export default class ExplorePageGraphPeriodSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '7D',
    }
  }


  setDomain = (time) => {
    store.dispatch(changePeriod(time));
    this.setState({domain: time});
  }


  render() {
      var HourButton = <RaisedTextButton onPress={() => this.setDomain('1H')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1H'/>;
      var DayButton = <RaisedTextButton onPress={() => this.setDomain('1D')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1D'/>;
      var SevenDayButton = <RaisedTextButton onPress={() => this.setDomain('7D')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='7D'/>;
      var MonthButton = <RaisedTextButton onPress={() => this.setDomain('1M')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1M'/>;
      var SixMonthButton = <RaisedTextButton onPress={() => this.setDomain('6M')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='6M'/>;
      var YearButton = <RaisedTextButton onPress={() => this.setDomain('1Y')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1Y'/>;
      var AllButton = <RaisedTextButton onPress={() => this.setDomain('ALL')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='ALL'/>;
      switch(this.state.domain) {
        case '1H':
          HourButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('1H')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1H'/>;
          break;
        case '1D':
          DayButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('1D')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1D'/>;
          break;
        case '7D':
          SevenDayButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('7D')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='7D'/>;
          break;
        case '1M':
          MonthButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('1M')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1M'/>;
          break;
        case '6M':
          SixMonthButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('6M')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='6M'/>;
          break;
        case '1Y':
          YearButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('1Y')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='1Y'/>;
          break;
        case 'ALL':
          AllButton = <RaisedTextButton disabled={true} disabledColor='rgba(255,255,255,0.7)' onPress={() => this.setDomain('ALL')} style={styles.button} titleColor='#e9ebeb' color='#0c0c0c' titleStyle={styles.topbarButtonText} rippleColor='#30a1ad' shadeColor='rgba(0,0,0,0)' title='ALL'/>;
          break;
      }
    return (
      <View style={styles.topbarButtonContainer}>
          {HourButton}
          {DayButton}
          {SevenDayButton}
          {MonthButton}
          {SixMonthButton}
          {YearButton}
          {AllButton}
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  button: {
    minWidth:50,
    paddingHorizontal: 6,
    width:50,
  },
  topbarButtonContainer: {
    width:'100%',
    height:40,
    padding: 5,
    flexWrap:'wrap',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  topbarButtonText: {
    fontFamily: 'avenirlight',
    fontSize: 14,
    letterSpacing:2,  
    padding:0,
    fontWeight:'normal', 
  },
});