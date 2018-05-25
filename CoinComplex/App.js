import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button.js';
import SvgUri from 'react-native-svg-uri';
import MainPage from './components/MainPage.js';
import Account from './components/Account.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      accountShow: false
    }
  }

  handleClick = () => {
    this.setState({accountShow: this.state.accountShow ? false : true});
  }

  render() {
    var appContent;
    var AccountColor;
    var AccountTextColor;
    if (this.state.accountShow) {
      appContent = <Account       handleLogout = {this.props.handleLogout} />;
      AccountColor = '#30a1ad';
      AccountTextColor = '#0c0c0c';
    }
    else {
      appContent= <MainPage/>
      AccountColor = "rgba(0,0,0,0)";
      AccountTextColor = '#e9ebeb';
    }
    return (
      <View style={styles.outer}>
        <View style={styles.container}>
          <View style={styles.topbar}>
            <SvgUri style={styles.logotop} width="45" height="45" source={require('./images/logo.svg')}/>
            <Button title="Account"
                    color={AccountColor}
                    TextColor={AccountTextColor}
                    style={styles.accountButtonStyle}
                    onPress={this.handleClick}/>
          </View>
          {appContent}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  outer: {
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  accountButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
  },
  container: {
    backgroundColor: '#0c0c0c',
  },
  logotop: {
    marginLeft:5,
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
  text: {
    fontFamily: 'avenirlight',
    fontSize: 20,
    letterSpacing:2,
  	color: '#30a1ad',
  },
  text1: {
    letterSpacing:4,
    color: '#30a1ad',
  },
});
