import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, YellowBox, ActivityIndicator } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module react-native-material-dropdown']);
import UserInputSearch from '../UserInputSearch.js';
import searchIMG from '../../images/search.png';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
import { changeGlobalPercent } from '../../actions/globalPercentChangeActions.js';
import addButtonIMG from '../../images/addbutton.png';
import ExplorePageRow from './ExplorePageRow.js';
import axios from 'axios';
import SearchableFlatList from "./SearchableFlatList.js";
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import store from '../../store';
import ExplorePageContentSwitch from './ExplorePageContentSwitch.js';
var Spinner = require('react-native-spinkit');
/*
Taking API's from https://coinmarketcap.com/api/#endpoint_ticker_specific_cryptocurrency
These API's allow you to query from a start point and set a limit. 
The explore page will display cryptocurrencies in increments of 50 in order to 
not slow down the app. 
When the page is scrolled to the bottom, the API is called again, and the app
loads in more currencies.
*/

//ADDRESS TO SEND THE BTC TO
//3BWUqePT5fHwUyusYAJ2fPpe3Zq7tT5anR
//0.01717000 BTC
//We recommend including a TX fee of at least 0.00013575 BTC for quick payment confirmation.

/*
https://dev-blog.apollodata.com/loading-data-into-react-natives-flatlist-9646fa9a199b
Here is another reference as well
*/

//https://streetsmartdev.com/migrating-react-native-listview-new-flatlist-infinite-scroll/
//Maybe this shit will work?

//https://www.prisma.io/forum/t/fetchmore-query-randomly-fetches-duplicates-items/2020


//Cryptocompare API
//https://medium.com/@galea/cryptocompare-api-quick-start-guide-ca4430a484d4

const currencies = ["BTC", "ETH", "XRP", "LTC", "BCH", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

const currencyOptions = [{
    value: 'USD',
}, {
   value: 'BTC',
}, {
   value: 'EUR'
}];

const changeOptions = [{
    value: '1H',
}, {
   value: '24H',
}, {
   value: '7D'
}];

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      currencyPair: 'USD',
      changePeriod: '24H',
      Allcoins: [],
      coins: [],
      isFetching: true,
      isFetchingMore: false,
      startingPoint: 0,
    }
  }
  componentDidMount() {
    this.setState({isMounted: true});
  }

  componentWillMount() { 
    this.fetchNewData(this.state.currencyPair);
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  onRefresh = () => {
    this.setState({ isFetching: true}, () => this.fetchNewData(this.state.currencyPair));
  }

  //Load in all the data at once, it's kinda slow since you can only get one convert value at a time with the API
  fetchNewData = (tradingPair) => {
    console.log('NewData Fetching');
			    axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array&convert=' + tradingPair)
			      .then((res) => {
		              if (this.state.isMounted) {
					         this.setState({canFetchMore: true, isFetching: false, coins:res.data.data, startingPoint: 100, currencyPair: tradingPair});
		              }
			      }).catch(() => {
			      	console.log('Failed');
			      }) 
  }

  fetchMoreData = () => {
  	if (this.state.isFetchingMore) {
		    axios.get('https://api.coinmarketcap.com/v2/ticker/?start=' + (this.state.startingPoint+1) + '&limit=100&structure=array&convert=' + this.state.currencyPair)
		      .then((res) => {
		      	var newCoins = this.state.coins.concat(res.data.data);
		      	var newstart = this.state.startingPoint+100;
		            if (this.state.isMounted) {
				          this.setState({isFetchingMore: false,coins:newCoins, startingPoint: newstart});
		            }
		      }).catch(() => {
		      	console.log('Failed');
		      }) 		
  	}
  }

  onChangeTextPair = (text) => {
    console.log("Changed pair to " + text);
    this.setState({isFetching: true});
    this.fetchNewData(text);
  }
  onChangeTextPeriod = (text) => {
    store.dispatch(changeGlobalPercent(text));
  }

  handleAddElement = (n) => {
    store.dispatch(addElement(n));
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
  }

  getItemLayout = (data, index) => (
  	{length: 50, offset: 50 * index, index}
  )

  EndReached = () => {
		          	if (!this.state.isFetching && !this.state.isFetchingMore) {
		          		this.setState({isFetchingMore: true}, () => {this.fetchMoreData()})
		          	}
		          }

  render() {
    var spinner;
    	if (this.state.isFetching) {
    		return (
	    		<View style={styles.spinnerContainer}>
	    			<Spinner size={100} style={styles.spinnerStyle} isVisible={true} type={'Pulse'} color={'#30a1ad'}/>
	    		</View>
    		);
    	}
    	else {
    		return (
		    	<View style={styles.container}>
		        <View style={styles.searchBarContainer}>
		            <Dropdown
		              ref={this.currencyRef}
		              label='Currency'
		              containerStyle={{width:100, borderRadius: 4,paddingHorizontal: 5}}
		              textColor='#e9ebeb'
		              baseColor='#e9ebeb'
		              dropdownPosition={-4}
		              dropdownOffset={{top:32, left:0}}
		              value={this.state.currencyPair}
		              onChangeText={this.onChangeTextPair}
		              data={currencyOptions}
		            />
		            <Dropdown
		              label='ChangePeriod'
		              containerStyle={{width:100, borderRadius: 4,paddingHorizontal: 5}}
		              textColor='#e9ebeb'
		              baseColor='#e9ebeb'
		              dropdownPosition={-4}
		              dropdownOffset={{top:32, left:0}}
		              value={this.state.changePeriod}
		              onChangeText={this.onChangeTextPeriod}
		              data={changeOptions}
		            />
		        </View>
		        <SearchableFlatList
		          searchProperty={"name"}
		          searchProperty1={"symbol"}
		          searchTerm={this.props.searchTerm}
              refreshing={this.state.isFetching}
              onRefresh={() => this.onRefresh()}
              getItem={(data, index) => { return data[index]}}
              getItemCount={(data) => data.length}
		          data={this.state.coins}
		          removeClippedSubviews={true}
		          getItemLayout={this.getItemLayout}
		          keyExtractor={(item, index) => item.id.toString()}
		          renderItem={({item}) => (<ExplorePageRow displayFullPageContent={(coin) => {this.displayFullPageContent(coin)}} 
								                coin={item} id={item.id} 
                                currencyPair={this.state.currencyPair} 
								                changePeriod={this.state.changePeriod}
								                changeSearchableMounted={(changeTo) => this.props.changeSearchableMounted(changeTo)}/> )}
		          />
		          <ExplorePageContentSwitch style={styles.topContent} 
                changeSearchableMounted={(changeTo) => this.props.changeSearchableMounted(changeTo)}/>
		      </View>
	      );
  		}
  }
}

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm.searchTerm
  }
}

export default connect(mapStateToProps)(ExplorePage)

const styles = StyleSheet.create({
  MainPage: {
  },
  searchImage: {
    width:20,
    height:20,
    opacity:0.7,
  },
  spinnerStyle: {
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0c0c0c',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#0c0c0c',
  },
  inlineImg: {
  	width:30,
  	height:30,
  	marginRight: 15,
  },
  dropdownContainer: {
    width:150,
    height:50,
    display:'flex',
    backgroundColor:'blue',
  },
  topContent: {
    elevation: 3,
  },
  searchBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
    elevation: 2,
    height:50,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listRow: {
    paddingVertical: 12,
    backgroundColor: '#0c0c0c',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  	width:'100%',
  	display:'flex',
  	justifyContent: 'space-between',
  	flexDirection:'row',
  	alignItems:'center',
  },
  listItem: {
    marginLeft: 15,
    fontFamily: 'avenirlight',
    color: '#e9ebeb',
    fontSize: 18,
  },
});