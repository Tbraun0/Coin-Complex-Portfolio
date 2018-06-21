import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, YellowBox } from 'react-native';
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
/*
Taking API's from https://coinmarketcap.com/api/#endpoint_ticker_specific_cryptocurrency
These API's allow you to query from a start point and set a limit. 
The explore page will display cryptocurrencies in increments of 50 in order to 
not slow down the app. 
When the page is scrolled to the bottom, the API is called again, and the app
loads in more currencies.
*/

/*
https://dev-blog.apollodata.com/loading-data-into-react-natives-flatlist-9646fa9a199b
Here is another reference as well
*/

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responseJSON: {},
      currencyPair: 'USD',
      changePeriod: '24h',
      Allcoins: [],
      coins: [],
      isFetching: false,
    }
  }

//Might need this later
/*
  componentWillRecieveProps(nextProps) {
    this.setState({searchTerm: nextProps.searchTerm});
  }
  */

  componentDidMount() { 
    this.fetchData();
  }

  onRefresh = () => {
    this.setState({ isFetching: true }, function() { this.fetchData() });
  }

  fetchData = () => {
    var that = this;
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=50&sort=rank')
      .then((res) => {
        that.setState({ coins: res.data, isFetching: false });
        //that.props.dispatch(StoryActions.setStories(res.data))
      })
  }

  onChangeTextPair = (text) => {
    this.setState({currencyPair: text});
  }
  onChangeTextPeriod = (text) => {
    this.setState({changePeriod: text});
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

    console.log(this.state.currencyPair);
    let currencyOptions = [{
      value: 'USD',
    }, {
      value: 'BTC',
    }];

    let changeOptions = [{
      value: '1H',
    }, {
      value: '24H',
    }, {
      value: '7D',
    }];
    return (
    	<View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Dropdown
            ref={this.currencyRef}
            label='Currency'
            containerStyle={{width:100, borderRadius: 2,paddingHorizontal: 5, height:50,backgroundColor:'rgba(255,255,255,0.05)'}}
            textColor='#e9ebeb'
            value="USD"
            onChangeText={this.onChangeTextPair}
            baseColor='#e9ebeb'
            data={currencyOptions}
          />
        </View>
        <SearchableFlatList
          onRefresh={this.onRefresh}
          searchProperty={"name"}
          searchProperty1={"symbol"}
          searchTerm={this.props.searchTerm}
          refreshing={this.state.isFetching}
          data={this.state.coins}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (<ExplorePageRow coin={item} id={item.id} currencyPair={this.state.currencyPair}/> )}
          />
      </View>
    );
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
  searchBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
    elevation: 2,
    height:50,
    width:'100%',
    display:'flex',
    justifyContent:'center',
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