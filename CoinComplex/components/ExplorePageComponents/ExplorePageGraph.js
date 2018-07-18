import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { LineChart, AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import axios from 'axios';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import ExplorePageGraphPeriodSwitch from './ExplorePageGraphPeriodSwitch.js';
import dateFns from 'date-fns';
var Spinner = require('react-native-spinkit');

//https://min-api.cryptocompare.com/

//https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=7
//7 Day price history for Bitcoin

const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

class ExplorePageGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoin: this.props.currentCoin,
      domain: '7D',
      isMounted: false,
      currencyPair: 'USD',
      data: [],
      isLoading: true,
      graphMin: 0,
      graphMax: 0,
    }
  }
/*
  componentWillReceiveProps(nextProps) {
    console.log('GraphPagePropsRecieved');
    this.setState({ currentCoin: nextProps.currentCoin}, ()=>this.getDailyHistoricalData());
  }
*/

  componentDidMount() {
  this.setState({isMounted: true});
	this.getWeeklyHistoricalData();
  }
  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.domain === '7D') {
      this.setState({isLoading: true, data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.getWeeklyHistoricalData(nextProps.domain));
      return;
    }
    else if(nextProps.domain === '1D') {
    this.setState({isLoading: true,  data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.getDailyHistoricalData(nextProps.domain));
      return;
    }
    else if (nextProps.domain === '1H') {
    	this.setState({isLoading: true,  data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.getHourHistoricalData(nextProps.domain));
      return;
    }
    else if (nextProps.domain === '1M') {
    	this.setState({isLoading: true,  data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.getMonthlyHistoricalData(nextProps.domain));
      return;
    }
    else if (nextProps.domain === '6M') {
    	this.setState({isLoading: true,  data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.get6MonthHistoricalData(nextProps.domain));
      return;
    }
    else if (nextProps.domain === '1Y') {
    	this.setState({isLoading: true,  data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.getYearlyHistoricalData(nextProps.domain));
      return;
    }
    else if (nextProps.domain === 'ALL') {
    	this.setState({isLoading: true,  data:[],currentCoin:nextProps.currentCoin, currencyPair: nextProps.currencyPair}, () => this.getAllHistoricalData(nextProps.domain));
      return;
    }
    if (nextProps.currencyPair !== '') {
      this.setState({isLoading: true, data:[],currentCoin:nextProps.currentCoin,  currencyPair: nextProps.currencyPair}, () => this.switchHistoricalDataAfterStateSet(this.state.domain));
      return;
    }
    else {
      this.setState({isLoading: true, data:[],currentCoin:nextProps.currentCoin}, () => this.switchHistoricalDataAfterStateSet(this.state.domain));
      return;
    }
  }

  switchHistoricalDataAfterStateSet = (domain) => {
      switch (domain){
        case '1H':
          this.getHourHistoricalData();
          break;
        case '1D':
          this.getDailyHistoricalData();
          break;
        case '7D':
          this.getWeeklyHistoricalData();
          break;
        case '1M':
          this.getMonthlyHistoricalData();
          break;
        case '6M':
          this.get6MonthHistoricalData();
          break;
        case '1Y':
          this.get6MonthHistoricalData();
          break;
        case 'ALL':
          this.getAllHistoricalData();
          break;
        default:
          this.getWeeklyHistoricalData();
          break;
      }    
  }

/*
We must give a margin on the top and bottom of the graphs, for which we need to know the
highest and lowest price point of the given data array
*/
  getWeeklyHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=168')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=1) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}


            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        }).catch(() => {
        	console.log("Error logged");
        })
    }  
  }

  getHourHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=60')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=1) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}

            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        })  
    }  
  }

  getDailyHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=24')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=1) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}

            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        })  
    }  
  }

  getMonthlyHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=720')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=3) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}

            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        })  
    }  
  }

  get6MonthHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=180')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=3) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}

            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        })  
    }  
  }
  getYearlyHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=365')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=4) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}

            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        })  
    }  
  }
  getAllHistoricalData = (switchTo) => {
    if(this.state.currentCoin) {
      var currCoin = this.state.currentCoin.symbol;
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=' + currCoin + '&tsym=' + this.state.currencyPair + '&limit=1&aggregate=1&allData=true')
        .then((res) => {
          var resDat = res.data.Data;
          var newData = [];
          var lowestPoint = resDat[0]['close'];
          var highestPoint = resDat[0]['close'];
          for (var i=0;i<resDat.length;i+=2) {
          	 if (resDat[i]['close'] < lowestPoint) { lowestPoint = resDat[i]['close'];}
          	 if (resDat[i]['close'] > highestPoint) { highestPoint = resDat[i]['close'];}

            var newObject= {price:0, date: null};
            newObject.price = (resDat[i]['close']);
            let newDate = new Date(resDat[i]['time'] * 1000);
            newObject.date = newDate;
            newData.push(newObject);
          }
          if (this.state.isMounted) {
            this.setState({data: newData, domain: switchTo, isLoading: false, graphMin: lowestPoint, graphMax: highestPoint});
          }
        })  
    }  
  }

  render() {
    var graphHeight = (this.state.graphMax - this.state.graphMin);
    var yMin = (this.state.graphMin)-(graphHeight/5);
    if (yMin < 0) {yMin = 0;}
    var yMax = (this.state.graphMax)+(graphHeight/5);
    if (!this.state.isLoading) {
      return (
        <View style={{height:300, width:'100%'}}>
            <View style={{padding:20, height:300, flexDirection:'row'}}>
              <View style={{flex:1, marginRight: 10}}>
                <AreaChart
                  style={{flex:1}}
                  data={ this.state.data }
                  yAccessor={ ({item}) => item.price }
                  xAccessor={ ({item}) => item.date }
                  xScale={ scale.scaleTime}
                  yMin={yMin}
                  yMax={yMax}
                  svg={{ fill: '#295b61',stroke: '#30a1ad' }}
                  contentInset={verticalContentInset}>
                  <Grid svg={{stroke:'rgba(255,255,255,0.2)'}}/>
                </AreaChart>
                <XAxis
                  style={{ marginTop:5,marginHorizontal: -10, height:xAxisHeight}}
                  data={ this.state.data }
                  xAccessor={({item}) => item.date}
                  scale={scale.scaleTime}
                  numberOfTicks={ 5 }
                  contentInset={{ left: 10, right: 10 }}
                  formatLabel={ (value) => {
                    if (this.state.domain === '1H') {
                       return dateFns.format(value, 'mm');
                    }
                    else if ( this.state.domain === '1Y' || this.state.domain === 'ALL') {
                       return dateFns.format(value, 'MM/YYYY');
                    }
                    else {
                      return dateFns.format(value, 'MM/DD');
                    }
                  } }
                  svg={{ fontSize: 11, fill: '#e9ebeb' }}/>
              </View>
              <YAxis
                data={ this.state.data }
                yAccessor={({item}) => item.price}
                svg={{
                  fill: '#e9ebeb',
                  fontSize: 10,
                }}
                min={yMin}
                max={yMax}
                numberOfTicks={ 6 }
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                formatLabel={ value => `${value} ${this.state.currencyPair}` }
                />
            </View>
        </View>
      );
    }
    else {
      return(<View style={{height:300, padding:20, width:'100%'}}>
      	<View style={styles.outerSpinnerStyle}>
                	<Spinner size={50} style={styles.spinnerStyle} isVisible={true} type={'Circle'} color={'#30a1ad'}/>
                </View>
      </View>);
    }
}}

const mapStateToProps = state => {
  return {
    domain: state.graphPeriod.changePeriod,
    currencyPair: state.currencyOption.currency,
    currentCoin: state.fullPage.currentCoin,
  }
}

export default connect(mapStateToProps)(ExplorePageGraph)


const styles=StyleSheet.create({
	outerSpinnerStyle: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems:'center',
		top:0,
		bottom:0,
		left:0,
		right:0,
	},
	spinnerStyle: {
  	},
});