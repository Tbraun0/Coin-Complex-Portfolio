import React from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, YellowBox, Animated, Dimensions } from 'react-native';
import Back_Arrow from '../../images/Back_Arrow.png';
import { LineChart, Grid } from 'react-native-svg-charts';

const Screen = Dimensions.get('window');
const FinalAnimationVal = Screen.width;

export default class ExplorePageContentSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayed: false,
      animation: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.animation.setValue(0);
    this.setState({isDisplayed: nextProps.isDisplayed});
  }

  renderFullPage = () => {
    return (
        <View style={styles.fullPageContainer}>
            <TouchableOpacity style={styles.touchableBackContainer} 
              onPress={() => {
                this.state.animation.setValue(0);
                Animated.timing(
                  this.state.animation,
                  {
                    toValue: FinalAnimationVal
                  }
                ).start(() => this.props.hideFullPageContent());
              }}>
              <Image source={Back_Arrow} style={styles.backImage}/>
            </TouchableOpacity>
        </View>
      );
  }

  toggleDisplayed = () => {
    this.setState({isDisplayed: !this.state.isDisplayed});
  }

  render() {
    var fullPage;
    var fullPageStyle;
    var pointerEvents;
    this.state.isDisplayed ? fullPage = this.renderFullPage() : fullPage = <View></View>
    this.state.isDisplayed ? fullPageStyle = {position:'absolute', top:0, bottom:0,right:0,left:this.state.animation, backgroundColor:'#0c0c0c',elevation:3} : fullPageStyle = styles.fullPageContentHidden;
    this.state.isDisplayed ? pointerEvents = 'auto' : pointerEvents = 'none';   
    return (
    	<Animated.View  style={fullPageStyle} pointerEvents={pointerEvents}>
        {fullPage}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  fullPageContainer: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  touchableBackContainer: {
    width: 40,
    height: 40,
  },
  fullPageContentDisplayed: {
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    backgroundColor:'black',
    elevation: 3,
  },
  fullPageContentHidden: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'rgba(0,0,0,0)',
  },
  backImage: {
    width:40,
    height:40,
  },
});