import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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
    console.log(this.state.coins);
    return (
    	<View style={styles.container}>
        <TextInput
          placeholder={"Search"}
          style={styles.sSearchBar}
          onChangeText={searchTerm => this.setState({ searchTerm })}
        />
        <SearchableFlatList
          onRefresh={() => this.onRefresh()}
          searchProperty={"name"}
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
  sContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  sTextItem: {
    height: 50,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    color: '#e9ebeb',
  },
  sSearchBar: {
    paddingHorizontal: 10,
    margin: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
    color: '#e9ebeb',
  },
});