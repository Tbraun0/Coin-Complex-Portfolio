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

class Button extends React.Component<{
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

    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color: color});
      } else {
        buttonStyles.push({backgroundColor: color});
        textStyles.push({color: TextColor})
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
      <TouchableHighlight
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        hasTVPreferredFocus={hasTVPreferredFocus}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
        <View style={this.state.pressStatus ? styles.buttonPress : buttonStyles }>
          <Text style={this.state.pressStatus ? styles.textPress : textStyles } disabled={disabled}>
            {formattedTitle}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      borderRadius: 2,
    },
    android: {
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#30a1ad',
      borderRadius: 2,
      borderWidth:1,
      borderColor:'#e9ebeb',
      marginRight: 5,
    },
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#e9ebeb',
      textAlign: 'center',
      fontFamily: 'avenirlight',
      padding: 8,
      letterSpacing:2,
      fontSize: 20,
    },
    android: {
      color: '#e9ebeb',
      textAlign: 'center',
      padding: 8,
      fontSize:20,
      fontFamily: 'avenirlight',
      letterSpacing:2,
    },
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#30a1ad',
    },
  }),
  textPress: Platform.select({
    ios: {
      color: '#0c0c0c',
      fontFamily: 'avenirlight',
      textAlign: 'center',
      padding: 8,
      letterSpacing:2,
      fontSize: 20,
    },
    android: {
      color:'#0c0c0c',
      fontFamily: 'avenirlight',
      padding: 8,
      fontSize:20,
      letterSpacing:2,
    },
  }),
  buttonPress: Platform.select({
    ios: {
      borderWidth:1,
      borderColor:'#30a1ad',
      borderRadius: 2,
    },
    android: {
      backgroundColor:'#30a1ad',
      marginRight: 5,
      borderWidth:1,
      borderColor:'#30a1ad',
      borderRadius: 2,
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#30a1ad',
    },
  }),
});

module.exports = Button;