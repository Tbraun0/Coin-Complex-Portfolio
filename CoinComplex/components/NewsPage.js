import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, Image, View } from 'react-native'
import UserInputSearch from './UserInputSearch.js';
import searchIMG from '../images/search.png';
import { addElement, removeElement } from '../actions/watchlist.js';
import addButtonIMG from '../images/addbutton.png';
const items = ['Apples', 'Pie', 'Juice', 'Cake', 'Nuggets', 'EOS', 'BTC', 'ETH', 'XRP'];

export default class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	search: '',
    }
  }

	getCoinsFromApiAsync = () => {
	  return fetch('https://facebook.github.io/react-native/movies.json')
	    .then((response) => response.json())
	    .then((responseJson) => {
	      return responseJson.movies;
	    })
	    .catch((error) => {
	      console.error(error);
	    });
	}

  handleAddElement = (n) => {
    this.store.dispatch(addElement(n));
  }

  handleRemoveElement = (n) => {
    this.store.dispatch(removeElement(n));
  }

  render() {
    return (
    	<SafeAreaView style={styles.container}>
    		<UserInputSearch
				source={searchIMG}
				placeholder="Search"
				autoCapitalize={'none'}
				returnKeyType={'done'}
				onChangeText={( search) => this.setState({search})}
				autoCorrect={false}/>
    		<ScrollView contentContaienrStyle={{flex: 1}}>

	          {items
	            .filter(a => a.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
	            .map(a => (
	            	<View style={styles.listRow} key={a}>
		              <Text style={styles.listItem}>
		                {a}
		              </Text>
		              <Image source={addButtonIMG} style={styles.inlineImg}/>
		            </View>
	            ))}

      		</ScrollView>
      </SafeAreaView>
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
  	paddingTop: 15,
  	paddingRight: 12,
  },
  listRow: {
  	width:'100%',
  	display:'flex',
  	justifyContent: 'space-between',
  	flexDirection:'row',
  	alignItems:'center',
  },
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: 'avenirlight',
    fontSize: 18,
    color: '#e9ebeb',
    backgroundColor: '#0c0c0c',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
});