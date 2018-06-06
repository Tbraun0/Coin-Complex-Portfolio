import React from 'react';
import { StyleSheet, Text, View , Animated, Dimensions, Platform} from 'react-native';
import Button from './components/Button.js';
import SvgUri from 'react-native-svg-uri';
import MainPage from './components/MainPage.js';
import Account from './components/Account.js';
import Interactable from 'react-native-interactable';
import Menu from './components/SideMenu.js';
import MainComponent from './components/MainComponent.js';
import { BlurView, VibrancyView } from 'react-native-blur';

const Screen = Dimensions.get('window')
const SideMenuWidth = 250
const RemainingWidth = Screen.width - SideMenuWidth

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      deltaX: new Animated.Value(-SideMenuWidth),
      menuOpened: false,
      accountShow: false,
      currentlySelected: 'Explore',
      viewRef: null,
    }
    this.deltaX = new Animated.Value(0);
    this.backgroundOpacity = new Animated.Value(0);

    this.toggleBackgroundColor = this.toggleBackgroundColor.bind(this);
  }

  toggleBackgroundColor() {
    Animated.timing(this.backgroundOpacity, {
      toValue: this.state.menuOpened ? .5 : 0,
      duration: 500
    }).start();
  }

  onMenuPress = () => {
    const menuOpened = !this.state.menuOpened;
    if(menuOpened) {
      this.refs['menuInstance'].snapTo({index: 1});
    } else {
      this.refs['menuInstance'].snapTo({index :0});
    }
  }

  switchSelect = (selection) => {
    this.setState({currentlySelected: selection});
    if (this.state.menuOpened) {
      this.refs['menuInstance'].snapTo({index :0});
    }
  }

  handleClick = () => {
    this.setState({accountShow: this.state.accountShow ? false : true});
  }

  onStopInteraction = (event, check) => {
    let menuOpened = true;
    if(event.nativeEvent.index == 0) {
      menuOpened = false;
    }
    this.setState((preState, props) => {
      return {menuOpened}
    })
    //this.toggleBackgroundColor();
  }

  render() {
    var appContent;

    this.toggleBackgroundColor();
    return (
      <View style={styles.outer}>
            <MainComponent ref='mainComponent' 
              currentlySelected={this.state.currentlySelected} 
              switchSelect={(selection) => this.switchSelect(selection) } 
              onMenuPress={ this.onMenuPress } 
              navigation={this.props.navigation}
              style={{zIndex: 1}} />
          <Animated.View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgb(0,0,0)',opacity:this.backgroundOpacity}} pointerEvents="none"></Animated.View>
          <Interactable.View
            ref='menuInstance'
            style={styles.sideBar}
            horizontalOnly={true}
            snapPoints={[{x: Screen.width, damping: 0.6}, {x: RemainingWidth, damping: 0.6}] }
            initialPosition={{x: Screen.width}}
            boundaries={{left: RemainingWidth}}
            animatedValueX={this.deltaX}
            onSnap={ this.onStopInteraction }>
              <Menu switchSelect={(selection) => this.switchSelect(selection) } currentlySelected={this.state.currentlySelected} onMenuPress={ this.onMenuPress } navigation={this.props.navigation}/>
          </Interactable.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  sideBar: {
    width:250,
    height:'100%',
    backgroundColor: 'rgb(12,12,12)',
    zIndex: 2,
  },
  outer: {
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  accountButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
  },
  container: {
    backgroundColor: '#0c0c0c',
  },
  logotop: {
    marginLeft:5,
  },
  topbar: {
    backgroundColor: '#0c0c0c',
    width:'100%',
    height:60,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
  text: {
    fontFamily: 'avenirlight',
    fontSize: 20,
    letterSpacing:2,
  	color: '#30a1ad',
  },
  text1: {
    letterSpacing:4,
    color: '#30a1ad',
  },

    header: {
        height: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        zIndex: 1001
    },
    body: {
        flex: 1,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    menuIcon: {
        width: 30,
        height: 30
    },
    headerTitle: {
        marginLeft: 30,
        color: 'white',
        fontSize: 20
    },
    content: {
        fontSize: 18
    }
});
