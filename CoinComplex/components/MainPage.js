import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBarButton from './NavBarButton.js';
import Portfolio from './Portfolio.js';
import WatchList from './WatchListComponents/WatchListPage.js';
import GraphsPage from './GraphsPage.js';
import ExplorePage from './ExplorePageComponents/ExplorePage.js';
import Settings from './Settings.js';
import Notifications from './Notifications.js';
import News from './News.js';
import Account from './Account.js';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: this.props.currentlySelected,
    };
  }
  componentWillReceiveProps(nextprops) {
  	this.setState({currentlySelected: nextprops.currentlySelected});
  }
  render() {

    var PortfolioButtonColor;
    var WatchListButtonColor;
    var GraphsButtonColor;
    var ExploreButtonColor;

    var PortfolioButtonText;
    var WatchListButtonText;
    var GraphsButtonText;
    var ExploreButtonColor;

    var ButtonSelected;
    //This is really ugly but I don't want to rewrite the button components atm
    switch(this.state.currentlySelected) {
      default: 
        PortfolioButtonColor = 'rgba(0,0,0,0)';
        PortfolioButtonText = '#30a1ad';   
        WatchListButtonColor = 'rgba(0,0,0,0)';
        WatchListButtonText = '#30a1ad';    
        GraphsButtonColor = 'rgba(0,0,0,0)';
        GraphsButtonText = '#30a1ad'; 
        ExploreButtonColor = 'rgba(0,0,0,0)';
        ExploreButtonText = '#30a1ad';
        break;
      case 'Portfolio':
        PortfolioButtonColor = '#30a1ad';
        PortfolioButtonText = '#0c0c0c';       
        WatchListButtonColor = 'rgba(0,0,0,0)';
        WatchListButtonText = '#30a1ad';    
        GraphsButtonColor = 'rgba(0,0,0,0)';
        GraphsButtonText = '#30a1ad'; 
        ExploreButtonColor = 'rgba(0,0,0,0)';
        ExploreButtonText = '#30a1ad';
        break;
      case 'WatchList':
        WatchListButtonColor = '#30a1ad';
        WatchListButtonText = '#0c0c0c';  
        PortfolioButtonColor = 'rgba(0,0,0,0)';
        PortfolioButtonText = '#30a1ad';     
        GraphsButtonColor = 'rgba(0,0,0,0)';
        GraphsButtonText = '#30a1ad'; 
        ExploreButtonColor = 'rgba(0,0,0,0)';
        ExploreButtonText = '#30a1ad';
        break;
      case 'Graph':
        GraphsButtonColor = '#30a1ad';
        GraphsButtonText = '#0c0c0c';
        PortfolioButtonColor = 'rgba(0,0,0,0)';
        PortfolioButtonText = '#30a1ad';
        WatchListButtonColor = 'rgba(0,0,0,0)';
        WatchListButtonText = '#30a1ad';
        ExploreButtonColor = 'rgba(0,0,0,0)';
        ExploreButtonText = '#30a1ad';
        break;
      case 'Explore':
        ExploreButtonColor = '#30a1ad';
        ExploreButtonText = '#0c0c0c';
        PortfolioButtonColor = 'rgba(0,0,0,0)';
        PortfolioButtonText = '#30a1ad';
        WatchListButtonColor = 'rgba(0,0,0,0)';
        WatchListButtonText = '#30a1ad';
        GraphsButtonColor = 'rgba(0,0,0,0)';
        GraphsButtonText = '#30a1ad';
        break;
    }

    var MainPageContent;

    switch(this.state.currentlySelected) {
      default:
        MainPageContent = <Text>Da fuck is going on</Text>
        break;
      case 'Portfolio':
        MainPageContent = <Portfolio />
        break;
      case 'WatchList':
        MainPageContent = <WatchList/>
        break;
      case 'Graph':
        MainPageContent = <GraphsPage/>
        break;
      case 'Explore':
        MainPageContent = <ExplorePage/>
        break;
      case 'Notifications':
        MainPageContent = <Notifications/>
        break;
      case 'Account':
        MainPageContent = <Account/>
        break;
      case 'Settings':
        MainPageContent = <Settings/>
        break;
      case 'News':
        MainPageContent = <News/>
        break;
    }

    return (
      <View style={styles.MainPage}>
        <View style={styles.NavBar}>
          <NavBarButton title="Portfolio"
            color={PortfolioButtonColor}
            TextColor={PortfolioButtonText}
            style={styles.NavButtonStyle}
            onPress={() => this.props.switchSelect('Portfolio')}
            leftBorder='false'
            rightBorder='true'/>
          <NavBarButton title="Watchlist"
            color={WatchListButtonColor}
            TextColor={WatchListButtonText}
            style={styles.NavButtonStyle}
            onPress={() => this.props.switchSelect('WatchList')}
            leftBorder='false'
            rightBorder='true'/>
          <NavBarButton title="Graphs"
            color={GraphsButtonColor}
            TextColor={GraphsButtonText}
            style={styles.NavButtonStyle}
            onPress={() => this.props.switchSelect('Graph')}
            leftBorder='false'
            rightBorder='true'/>
          <NavBarButton title="Explore"
            color={ExploreButtonColor}
            TextColor={ExploreButtonText}
            style={styles.NavButtonStyle}
            onPress={() => this.props.switchSelect('Explore')}
            leftBorder='false'
            rightBorder='false'/>
        </View>
          {MainPageContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainPage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0c0c0c',
  },
  NavButtonStyle: {
    fontFamily: 'avenirlight',
    backgroundColor:'rgba(0,0,0,0)',
  },
  NavBar: {
    width:'100%',
    height:60,
    display:'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#282b2d',
  },
  text: {
    fontFamily: 'avenirlight',
    margin:'auto',
    fontSize: 20,
    letterSpacing:2,
    color: '#e9ebeb',
  },
});