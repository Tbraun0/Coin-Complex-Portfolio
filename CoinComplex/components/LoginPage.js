import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginButton from './LoginButton.js';
import SvgUri from 'react-native-svg-uri';
import UserInput from './UserInput.js';

import usernameIMG from '../images/username.png';
import passwordIMG from '../images/password.png';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    }

  }

  showPass = () => {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  handleClick = () => {

  }

  render() {
    return (
      <View styles={styles.outer}>
        <SvgUri style={styles.logotop} width="150" height="150" source={require('../images/logo.svg')}/>
        <UserInput
          source={usernameIMG}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          source={passwordIMG}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <LoginButton title="Login"
                color="rgba(0,0,0,0)"
                TextColor="#e9ebeb"
                style={styles.loginButtonStyle}
                onPress={this.props.handleLogin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logotop: {
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  outer: {
  },
  loginButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
  },
});