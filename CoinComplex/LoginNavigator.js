import React from 'react';
import watchlist from './reducers/watchlist';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button.js';
import App from './App.js';
import LoginPage from './components/LoginPage.js';
import {createStore} from 'redux';


export default class LoginNavigator extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      store: createStore(watchlist),
    }
  }

  handleLogin = (uname, psswrd) => {
    this.setState({loggedIn: true});
  }
  handleLogout = () => {
    this.setState({loggedIn: false});
  }

  render() {
    var MainAppContent;

    if (this.state.loggedIn) {
      MainAppContent = <App
        store={this.state.store}
        handleLogout={this.handleLogout}
        />;
    }
    else {
      MainAppContent = <LoginPage
        store={this.state.store}
        style={styles.LoginOuter}
        handleLogin={this.handleLogin}
        />
    }

    return (
      <View style={styles.outer}>
        {MainAppContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c0c0c', 
  },
  LoginOuter: {
  },
});