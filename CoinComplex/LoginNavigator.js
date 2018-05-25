import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button.js';
import App from './App.js';
import LoginPage from './components/LoginPage.js';

export default class LoginNavigator extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      store: this.props.store,
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
        store={this.store}
        handleLogout={this.handleLogout}
        />;
    }
    else {
      MainAppContent = <LoginPage
        store={this.store}
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