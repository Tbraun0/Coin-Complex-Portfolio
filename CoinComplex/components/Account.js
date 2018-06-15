import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginButton from './LoginButton.js';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.Account}>
        <Text style={styles.text}>
          This is the Account Page!
        </Text>
        <LoginButton title="Logout"
                color="rgb(0,0,0)"
                TextColor="#e9ebeb"
                style={styles.loginButtonStyle}
                onPress={this.props.handleLogout}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Account: {
    flex:1,
    backgroundColor: '#0c0c0c',
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 20,
    letterSpacing:2,
    color: '#e9ebeb',
  },
});