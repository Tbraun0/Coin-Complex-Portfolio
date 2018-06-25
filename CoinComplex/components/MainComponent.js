import React from 'react';
import { StyleSheet, Text, View , Image, TextInput, Animated, Dimensions, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Account from './Account.js';
import Interactable from 'react-native-interactable';
import MainPage from './MainPage.js';
import {updateSearch} from '../actions/searchActions.js';
import Button from './Button.js';
import Icon from 'react-native-vector-icons/FontAwesome'

import store from '../store';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
      //The state of this determines whether the search bar should be displayed.
      this.state= {
        searchableMounted: true,
      }
  }

  onPressMenu = () => {
    this.props.navigation.navigate('DrawerOpen')
  }
  
  onPressBack = () => {
    this.props.navigation.goBack()
  }

  handleSearchTextChange = (newText) => {
    
  }

  //Displays or hides the searchbar at the top of the app
  changeSearchableMounted = (boolean) => {
    this.setState({searchableMounted: boolean});
  }

  renderTopSearchBar = () => {
    return (
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarContainerInner}>     
            <TextInput
              placeholder="Search..."
              style={styles.sSearchBar}
              onChangeText={(searchText) => {store.dispatch(updateSearch(searchText))}}
              underlineColorAndroid="transparent"
              placeholderTextColor="#e9ebeb"
              placeholderTextOpacity={0.7}
            />
          </View>
        </View>
      );
  }


  render() {
    var searchBar = <View></View>;
    if (this.state.searchableMounted) {
      searchBar = this.renderTopSearchBar();
    };

    return (
      <View style={styles.outer}>
          <View style={styles.topbar}>
            <SvgUri width="45" height="45" style={{marginLeft: 10}} source={require('../images/logo.svg')}/>
              <View style={styles.searchBarDisplay}>
                {searchBar}
              </View>

            <TouchableOpacity style={ styles.menuAccount } onPress={this.props.onMenuPress}>
              <Image source={require('../images/hamburger.png')} style={styles.hamburgerStyle} />
            </TouchableOpacity>
          </View>
          <MainPage currentlySelected={this.props.currentlySelected} 
                    switchSelect={(selection) => this.props.switchSelect(selection)}
                    changeSearchableMounted={(changeTo) => this.changeSearchableMounted(changeTo)}
                    />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  outer: {
    flex:1,
    position: 'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
    backgroundColor: '#0c0c0c',
  },
  searchBarDisplay: {
    flex:1,
    height: '100%',
  },
  hamburgerStyle: {
    width: 35,
    height:35,
  },
  accountButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
  },
  searchImage: {
    width:20,
    height:20,
    opacity:0.7,
  },
  topbar: {
    backgroundColor: '#0c0c0c',
    width:'100%',
    height:60,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
  searchBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
    elevation: 2,
    height:60,
    width:'100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchBarContainerInner: {
  	backgroundColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    borderRadius: 2,
    alignItems:'center',
    justifyContent: 'center',
    height:60,
    flex: 1,
    padding:3,
    paddingHorizontal: 10,
  },
  sSearchBar: {
    paddingHorizontal: 10,
    paddingBottom:6,
    flex: 1,
    display:'flex',
    alignItems:'center',
    fontSize: 16,
    height:35,
    color: '#e9ebeb',
  },
  menuAccount: {
    marginRight: 10,
  }
});