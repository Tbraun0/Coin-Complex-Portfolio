/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */
 import {Image} from 'react-native';

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

class NavBarButton extends React.Component<{
  title: string,
  onPress: () => any,
  currentlySelected?: ?string,
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

    currentlySelected: PropTypes.string,
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
      onPress,
      title,
      hasTVPreferredFocus,
      disabled,
      testID,
      currentlySelected,
    } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    const buttonPressStyles = [styles.buttonPress];

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

    var componentOpacity;
    var componentTopBorder;
    (this.props.currentlySelected == this.props.title) ? componentOpacity = 1 : componentOpacity = 0.7;
    (this.props.currentlySelected == this.props.title) ? componentTopBorder = '#30a1ad' : componentTopBorder = 'rgba(0,0,0,0)';

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
        style={{opacity: componentOpacity, flexDirection: 'row',justifyContent: 'space-between', borderTopWidth: 1,borderTopColor:componentTopBorder, borderBottomWidth: 1,borderBottomColor:componentTopBorder}}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
        >
        <View style={styles.buttonFlex}>
          <Image source={this.props.image} style={styles.ImageStyle}/>
          <Text style={ styles.text } disabled={disabled}>
            {formattedTitle}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  HighlightButton: Platform.select({
    ios: {},
    android: {
      width:'25%',
    },
  }), 
  buttonFlex: {
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  ImageStyle: {
    marginTop:6,
    width:17,
    height:17,
  },
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#30a1ad',
      borderRadius: 0,
      borderTopWidth:1,
      borderBottomWidth:1,
      borderTopColor:'#30a1ad',
      borderBottomColor:'#30a1ad',
      display:'flex',
      alignItems: 'center',
    },
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#30a1ad',
      textAlign: 'center',
      fontFamily: 'avenirlight',
      padding: 8,
      letterSpacing:2,
      fontSize: 10,
      display:'flex',
      alignItems: 'center',
    },
    android: {
      color: '#30a1ad',
      textAlign: 'center',
      padding: 8,
      fontSize:10,
      fontFamily: 'avenirlight',
      letterSpacing:2,
      display:'flex',
      alignItems: 'center',
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
      color: '#30a1ad',
      fontFamily: 'avenirlight',
      textAlign: 'center',
      padding: 8,
      letterSpacing:2,
      fontSize: 10,
    },
    android: {
      color:'#30a1ad',
      fontFamily: 'avenirlight',
      padding: 8,
      textAlign: 'center',
      fontSize:10,
      letterSpacing:2,
    },
  }),
  buttonPress: Platform.select({
    ios: {
      display:'flex',
      alignItems: 'center',
      borderTopWidth:1,
      borderBottomWidth:1,
      borderTopColor:'#30a1ad',
      borderBottomColor:'#30a1ad',
    },
    android: {
      backgroundColor:'#30a1ad',
      display:'flex',
      alignItems: 'center',
      borderTopWidth:1,
      borderBottomWidth:1,
      borderTopColor:'#30a1ad',
      borderBottomColor:'#30a1ad',
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

module.exports = NavBarButton;