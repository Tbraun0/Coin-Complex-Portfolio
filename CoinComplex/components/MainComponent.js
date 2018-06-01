import React from 'react';
import { StyleSheet, Text, View , Animated, Dimensions, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Account from './Account.js';
import Interactable from 'react-native-interactable';
import MainPage from './MainPage.js';
import Button from './Button.js';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state= {
      }
  }

  onPressMenu = () => {
    this.props.navigation.navigate('DrawerOpen')
  }
  
  onPressBack = () => {
    this.props.navigation.goBack()
  }
  render() {

    return (
      <View style={styles.outer}>
          <View style={styles.topbar}>
            <SvgUri width="45" height="45" style={{marginLeft: 10}} source={require('../images/logo.svg')}/>
            <TouchableOpacity style={ styles.menuAccount } onPress={this.props.onMenuPress}>
              <Icon name='bars' color={'#e9ebeb'} size={35} />
            </TouchableOpacity>
          </View>
          <MainPage currentlySelected={this.props.currentlySelected} switchSelect={(selection) => this.props.switchSelect(selection)}/>
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
  accountButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
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
  menuAccount: {
    marginRight: 10,
  }
});