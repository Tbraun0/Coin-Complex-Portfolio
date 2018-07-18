import React from 'react';
import { StyleSheet, Text, View, Image, findNodeHandle } from 'react-native';
import LoginButton from './LoginButton.js';
import SvgUri from 'react-native-svg-uri';
import UserInput from './UserInput.js';
import { BlurView } from 'react-native-blur';
import backGroundImage from '../images/loginBackground.jpg';


import usernameIMG from '../images/username.png';
import passwordIMG from '../images/password.png';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
  }

  showPass = () => {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  render() {
    return (
      <View styles={styles.container}>
        <Image
          source={backGroundImage}
          style={styles.absolute}
        />
        <View style={styles.loginpageFull}>
          <View style={styles.loginPageFlex}>
            <SvgUri width="125" height="125" source={require('../images/logo.svg')}  style={{marginBottom: 20, marginLeft: 'auto', marginRight:'auto'}}/>
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
                    color="#30a1ad"
                    TextColor="#e9ebeb"
                    style={styles.loginButtonStyle}
                    onPress={this.props.handleLogin}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  loginButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
  },
  loginpageFull: {
    width:'100%',
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  loginPageFlex: {

  },
});