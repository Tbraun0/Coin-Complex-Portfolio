import React from 'react';
import { StyleSheet, Text, TextInput, Image, View } from 'react-native';
import UserInputSearch from '../UserInputSearch.js';
import searchIMG from '../../images/search.png';
import { addElement, removeElement } from '../../actions/watchlistActions.js';
import addButtonIMG from '../../images/addbutton.png';
import ExplorePageRow from './ExplorePageRow.js';
import axios from 'axios';
import SearchableFlatList from "./SearchableFlatList.js";

import store from '../../store';
const items = [
{id:1, name:'Apples'}, {id:2, name:'Pie'}, {id:3, name:'Juice'}, {id:4, name:'Cake'}, {id:5, name: 'Nuggets'},{id:6, name: 'EOS'}, {id:7, name:'BTC'}, {id:8,name:'ETH'}, {id:9,name:'XRP'}
];

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

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	searchTerm: '',
      responseJSON: {},
      Allcoins: [],
      coins: [],
      isFetching: false,
    }
  }

  componentDidMount() { this.fetchData() }

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

  handleAddElement = (n) => {
    store.dispatch(addElement(n));
  }

  handleRemoveElement = (n) => {
    store.dispatch(removeElement(n));
  }

  render() {
    console.log(this.state.coins.length);
    return (
    	<View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarContainerInner}>     
            <Image source={require('../../images/search.png')} style={styles.searchImage}/>
            <TextInput
              placeholder="Search..."
              style={styles.sSearchBar}
              onChangeText={searchTerm => this.setState({ searchTerm })}
              underlineColorAndroid="transparent"
              placeholderTextColor="#e9ebeb"
              placeholderTextOpacity={0.7}
            />
          </View>
        </View>
        <SearchableFlatList
          onRefresh={this.onRefresh}
          searchProperty={"name"}
          searchProperty1={"symbol"}
          searchTerm={this.state.searchTerm}
          refreshing={this.state.isFetching}
          data={this.state.coins}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => (<ExplorePageRow coin={item} id={item.id} /> )}
          />
      </View>
    );
  }
}

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
    height:60,
    width:'100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchBarContainerInner: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ebeb',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    height:60,
    flex: 1,
    padding:3,
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
  sSearchBar: {
    paddingHorizontal: 10,
    paddingBottom:6,
    flex: 1,
    fontSize: 16,
    height:35,
    color: '#e9ebeb',
  },
});