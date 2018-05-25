import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';

export default class UserInputSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image source={this.props.source} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

UserInputSearch.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftWidth: 1,
    borderLeftColor: '#e9ebeb',
    borderRightWidth: 1,
    borderRightColor: '#e9ebeb',
    width: DEVICE_WIDTH - 50,
    height: 40,
    marginHorizontal: 20,
    fontFamily: 'avenirlight',
    letterSpacing: 2,
    marginLeft:'auto',
    marginRight:'auto',
    paddingLeft: 45,
    fontSize:16,
    borderRadius: 2,
    color: '#ffffff',
  },
  inputWrapper: {
    marginTop: 5,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});
