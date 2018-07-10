/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';
import Dimensions from 'Dimensions';
const ColorPropType = require('ColorPropType');
const Platform = require('Platform');
const React = require('React');
const PropTypes = require('prop-types');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TouchableNativeFeedback = require('TouchableNativeFeedback');
const TouchableHighlight = require('TouchableHighlight');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
import Ripple from 'react-native-material-ripple';
const invariant = require('fbjs/lib/invariant');
/**
 * A basic button component that should render nicely on any platform. Supports
 * a minimal level of customization.
 *
 * <center><img src="img/buttonExample.png"></img></center>
 *
 * If this button doesn't look right for your app, you can build your own
 * button using [TouchableOpacity](docs/touchableopacity.html)
 * or [TouchableNativeFeedback](docs/touchablenativefeedback.html).
 * For inspiration, look at the [source code for this button component](https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js).
 * Or, take a look at the [wide variety of button components built by the community](https://js.coach/react-native?search=button).
 *
 * Example usage:
 *
 * ```
 * import { Button } from 'react-native';
 * ...
 *
 * <Button
 *   onPress={onPressLearnMore}
 *   title="Learn More"
 *   color="#841584"
 *   accessibilityLabel="Learn more about this purple button"
 * />
 * ```
 *
 */

class LoginButton extends React.Component<{
  title: string,
  onPress: () => any,
  color?: ?string,
  hasTVPreferredFocus?: ?boolean,
  accessibilityLabel?: ?string,
  disabled?: ?boolean,
  testID?: ?string,
}> {
  static propTypes = {
    /**
     * Text to display inside the button
     */
    title: PropTypes.string.isRequired,
    /**
     * Text to display for blindness accessibility features
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Color of the text (iOS), or background color of the button (Android)
     */
    color: ColorPropType,

    TextColor: ColorPropType,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: PropTypes.bool,
    /**
     * TV preferred focus (see documentation for the View component).
     */
    hasTVPreferredFocus: PropTypes.bool,
    /**
     * Handler to be called when the user taps the button
     */
    onPress: PropTypes.func.isRequired,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: PropTypes.string,
  };
    constructor(props) {
      super(props);
      this.state = { pressStatus: false};
    }
    _onHideUnderlay() {
      this.setState({pressStatus: false});
    }
    _onShowUnderlay() {
      this.setState({ pressStatus: true});
    }
  render() {
    const {
      accessibilityLabel,
      color,
      TextColor,
      onPress,
      title,
      hasTVPreferredFocus,
      disabled,
      testID,
    } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    const buttonPressedStyles = [styles.buttonPress];

    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color: color});
      } else {
        buttonStyles.push({backgroundColor: color});
        textStyles.push({color: TextColor})
        buttonPressedStyles.push({backgroundColor: color});
      }
    }
    const accessibilityTraits = ['button'];
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityTraits.push('disabled');
    }
    invariant(
      typeof title === 'string',
      'The title prop of a Button must be a string',
    );
    const formattedTitle =
      Platform.OS === 'android' ? title : title;
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Ripple
        rippleColor='#e9ebeb'
        rippleOpacity={0.5}
        onPress={onPress}
        >
        <View style={styles.buttonPress}>
          <Text style={styles.textPress} disabled={disabled}>
            {formattedTitle}
          </Text>
        </View>
      </Ripple>
    );
  }
}

//const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 2,
      paddingLeft: 5,
      paddingRight: 5,
      width: 250,
    },
    android: {
      marginLeft: 'auto',
      marginRight: 'auto',
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#30a1ad',
      borderRadius: 2,
      borderWidth:1,
      paddingLeft: 5,
      paddingRight: 5,
      borderColor:'#30a1ad',
      width: 250,
    },
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#e9ebeb',
      fontFamily: 'avenirlight',
      backgroundColor:'rgba(0,0,0,0)',
      padding: 8,
      letterSpacing:2,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 16,
    },
    android: {
      color: '#e9ebeb',
      backgroundColor:'rgba(0,0,0,0)',
      padding: 8,
      fontSize:16,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: 'avenirlight',
      letterSpacing:2,
    },
  }),
  buttonDisabled: Platform.select({
    ios: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    android: {
      elevation: 0,
      backgroundColor: '#30a1ad',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
  textPress: Platform.select({
    ios: {
      color: '#0c0c0c',
      backgroundColor:'rgba(0,0,0,0)',
      fontFamily: 'avenirlight',
      padding: 8,
      letterSpacing:2,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 16,
    },
    android: {
      color:'#0c0c0c',
      backgroundColor:'rgba(0,0,0,0)',
      fontFamily: 'avenirlight',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 8,
      fontSize:16,
      letterSpacing:2,
    },
  }),
  buttonPress: Platform.select({
    ios: {
      borderWidth:1,
      borderColor:'#30a1ad',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 2,
      paddingLeft: 5,
      paddingRight: 5,
      width: 250,
    },
    android: {
      backgroundColor:'#30a1ad',
      borderWidth:1,
      borderColor:'#30a1ad',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 2,
      paddingLeft: 5,
      paddingRight: 5,
      width: 250,
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#30a1ad',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    android: {
      color: '#30a1ad',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
});

module.exports = LoginButton;