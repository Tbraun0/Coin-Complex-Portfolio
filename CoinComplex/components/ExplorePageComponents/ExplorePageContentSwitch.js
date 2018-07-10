import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, YellowBox, Animated, Dimensions } from 'react-native';
import Back_Arrow from '../../images/Back_Arrow.png';
import { LineChart, AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import axios from 'axios';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import ExplorePageGraphPeriodSwitch from './ExplorePageGraphPeriodSwitch.js';
import ExplorePageGraph from './ExplorePageGraph.js';
import ExplorePageFullPageTopBar from './ExplorePageFullPageTopBar.js';
import { Dropdown } from 'react-native-material-dropdown';
import { changePeriod } from '../../actions/graphPeriodActions.js';
import store from '../../store.js';
const Screen = Dimensions.get('window');
const FinalAnimationVal = Screen.width;

//https://min-api.cryptocompare.com/

//https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=7
//7 Day price history for Bitcoin

export default class ExplorePageContentSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayed: false,
      animation: new Animated.Value(0),
      currentCoin: null,
      displayedCurrency: 'USD',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.animation.setValue(0);
    this.setState({isDisplayed: nextProps.isDisplayed, currentCoin: nextProps.currentSelectedCoin});
  }

  renderFullPage() {
    return (
        <View style={styles.fullPageContainer}>
            <ExplorePageFullPageTopBar hidePageContent={this.hidePageContent} currentCoin={this.state.currentCoin}/>
            <ExplorePageGraphPeriodSwitch />
            <ExplorePageGraph currentCoin={this.state.currentCoin}/>
        </View>
      );
  }

  hidePageContent = () => {
    this.state.animation.setValue(0);
    Animated.timing(
      this.state.animation,
      {
        toValue: FinalAnimationVal
      }
    ).start(() => {
    	this.props.hideFullPageContent();
    	store.dispatch(changePeriod('7D'));
    });
  }

  toggleDisplayed = () => {
    this.setState({isDisplayed: !this.state.isDisplayed});
  }

  render() {
    var fullPage;
    var fullPageStyle;
    var pointerEvents;
    this.state.isDisplayed ? fullPage = this.renderFullPage() : fullPage = <View></View>
    this.state.isDisplayed ? fullPageStyle = {position:'absolute', top:0, bottom:0,width: FinalAnimationVal, left:this.state.animation, backgroundColor:'#0c0c0c',elevation:3} : fullPageStyle = styles.fullPageContentHidden;
    this.state.isDisplayed ? pointerEvents = 'auto' : pointerEvents = 'none';   
    return (
    	<Animated.View  style={fullPageStyle} pointerEvents={pointerEvents}>
        {fullPage}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  fullPageContainer: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  touchableBackContainer: {
    width: 40,
    height: 40,
    marginLeft:10,
  },
  topbarInfoContainer: {
    width:'100%',
    height:60,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  topbarPriceContainer: {
    width:'100%',
    height:40,
    display:'flex',
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
    width:40,
    height:40,
  },
  headerText: {
    fontFamily: 'avenirlight',
    fontSize: 18,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  headerTextTitle: {
    fontFamily: 'avenirlight',
    fontSize: 18,
    marginLeft:10,
    letterSpacing:2,
    color:'#e9ebeb',
  },
  topbarButtonText: {
    fontFamily: 'avenirlight',
    fontSize: 16,
    letterSpacing:2,  
    padding:0,
    fontWeight:'normal', 
  },
  headerTextSymbol: {
    fontFamily: 'avenirlight',
    fontSize: 18,
    marginLeft:10,
    opacity:0.7,
    letterSpacing:2,
    color:'#e9ebeb',
  },
});