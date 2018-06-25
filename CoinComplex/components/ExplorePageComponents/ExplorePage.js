import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, YellowBox, ActivityIndicator } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module react-native-material-dropdown']);
import UserInputSearch from '../UserInputSearch.js';
import searchIMG from '../../images/search.png';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
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
      responseJSON: {},
      currencyPair: 'USD',
      changePeriod: '24H',
      Allcoins: [],
      coins: [],
      isFetching: true,
      isFetchingMore: false,
      fullPageDisplaying: false,
      startingPoint: 0,
    }
  }

  componentDidMount() { 
    this.fetchNewData();
  }

  onRefresh = () => {
  	console.log('onRefreshCalled');
    this.setState({ isFetching: true}, () => this.fetchNewData());
  }

  //Load in all the data at once, it's kinda slow since you can only get one convert value at a time with the API
  fetchNewData = () => {
	  			console.log('FirstFetch Called');
			    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=25&sort=rank&convert=EUR')
			      .then((res) => {
			        this.setState({isFetching: false, coins:res.data, startingPoint: 25});
			      })
  }

  fetchMoreData = () => {
  	if (this.state.isFetchingMore) {
		    axios.get('https://api.coinmarketcap.com/v1/ticker/?start=' + this.state.startingPoint + '&limit=25&convert=EUR')
		      .then((res) => {
		      	console.log('SecondFetch Called');
		      	var newCoins = this.state.coins.concat(res.data);
		      	var newstart = this.state.startingPoint+25;
		        this.setState({isFetchingMore: false,coins:newCoins, startingPoint: newstart});
		      })  		
  	}
  }

  onChangeTextPair = (text) => {
    this.setState({currencyPair: text});
  }
  onChangeTextPeriod = (text) => {
    this.setState({changePeriod: text});
  }

  displayFullPageContent = () => {
    this.setState({fullPageDisplaying:true});
  }
  hideFullPageContent = () => {
    this.setState({fullPageDisplaying:false});
  }

  handleAddElement = (n) => {
    store.dispatch(addElement(n));
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
  }

  handleChangeText = (text) => {
    this.setState({searchTerm: text});
  }

  render() {
    var spinner;
    console.log(this.state.startingPoint);
    	if (this.state.isFetching) {
    		return (
	    		<View style={styles.container}>
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
		              value="USD"
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
		              value="24H"
		              onChangeText={this.onChangeTextPeriod}
		              data={changeOptions}
		            />
		        </View>
		        <SearchableFlatList
		          searchProperty={"name"}
		          searchProperty1={"symbol"}
		          searchTerm={this.props.searchTerm}
		          onEndReachedThreshold={0.5}
		          onEndReached={() => {
		          	if (!this.state.isFetching && !this.state.isFetchingMore) {
		          		this.setState({isFetchingMore: true}, () => {this.fetchMoreData()})
		          	}}}
		          data={this.state.coins}
		          showsVerticalScrollIndicator={true}
		          removeClippedSubviews={true}
		          keyExtractor={(item, index) => item.id}
		          renderItem={({item}) => (<ExplorePageRow displayFullPageContent={this.displayFullPageContent} coin={item} id={item.id} currencyPair={this.state.currencyPair} changePeriod={this.state.changePeriod}/> )}
		          ListFooterComponent={() => {
		          		return (
		                   this.state.isFetchingMore &&
			              <View style={{ flex: 1, padding: 10 }}>
			                <ActivityIndicator size="small" />
			              </View>
		          		);
		          }}
		          />
		          <ExplorePageContentSwitch style={styles.topContent} isDisplayed={this.state.fullPageDisplaying} hideFullPageContent={this.hideFullPageContent}/>
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
    position:'absolute',
    top:100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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