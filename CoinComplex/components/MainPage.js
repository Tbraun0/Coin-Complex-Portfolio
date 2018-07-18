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
import store from '../store';
import { updateSearch } from '../actions/searchActions.js';

//Nav bar Images
import ExploreIMG from '../images/explore.png';
import GraphIMG from '../images/graphs.png';
import PortfolioIMG from '../images/portfolio.png';
import WatchlistIMG from '../images/watchlist.png';

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
  shouldComponentUpdate(nextProps) {
    if (this.state.currentlySelected === nextProps.currentlySelected) {
      return false;
    }
    else {
      return true;
    }
  }
  render() {
    var PortfolioButtonUnderLine;
    var WatchListButtonUnderLine;
    var GraphsButtonUnderLine;
    var ExploreButtonUnderLine;
    console.log('Rerendered MainPage');
    var ButtonSelected;
    //This is really ugly but I don't want to rewrite the button components atm
    switch(this.state.currentlySelected) {
      default: 
        PortfolioButtonUnderLine = 'rgba(0,0,0,0)';
        WatchListButtonUnderLine = 'rgba(0,0,0,0)';
        GraphsButtonUnderLine = 'rgba(0,0,0,0)';
        ExploreButtonUnderLine = 'rgba(0,0,0,0)';
        break;
      case 'Portfolio':
        PortfolioButtonUnderLine = '#30a1ad';
        WatchListButtonUnderLine = 'rgba(0,0,0,0)';
        GraphsButtonUnderLine = 'rgba(0,0,0,0)';
        ExploreButtonUnderLine = 'rgba(0,0,0,0)';
        break;
      case 'Watchlist':
        PortfolioButtonUnderLine = 'rgba(0,0,0,0)';
        WatchListButtonUnderLine = '#30a1ad';
        GraphsButtonUnderLine = 'rgba(0,0,0,0)';
        ExploreButtonUnderLine = 'rgba(0,0,0,0)';
        break;
      case 'Graphs':
        PortfolioButtonUnderLine = 'rgba(0,0,0,0)';
        WatchListButtonUnderLine = 'rgba(0,0,0,0)';
        GraphsButtonUnderLine = '#30a1ad';
        ExploreButtonUnderLine = 'rgba(0,0,0,0)';
        break;
      case 'Explore':
        PortfolioButtonUnderLine = 'rgba(0,0,0,0)';
        WatchListButtonUnderLine = 'rgba(0,0,0,0)';
        GraphsButtonUnderLine = 'rgba(0,0,0,0)';
        ExploreButtonUnderLine = '#30a1ad';
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
      case 'Watchlist':
        MainPageContent = <WatchList/>
        break;
      case 'Graphs':
        MainPageContent = <GraphsPage/>
        break;
      case 'Explore':
        MainPageContent = <ExplorePage changeSearchableMounted={(changeTo) => this.props.changeSearchableMounted(changeTo)}/>
        break;
      case 'Notifications':
        MainPageContent = <Notifications/>
        break;
      case 'Account':
        MainPageContent = <Account handleLogout={this.props.handleLogout}/>
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
          {MainPageContent}
        <View style={styles.NavBar}>
          <NavBarButton title="Portfolio"
            style={styles.NavButtonStyle}
            image={PortfolioIMG}
            currentlySelected={this.state.currentlySelected}
            onPress={() => {this.props.switchSelect('Portfolio');
                            this.props.changeSearchableMounted(false);
                            store.dispatch(updateSearch(''));
                      }
                    }/>
          <NavBarButton title="Watchlist"
            style={styles.NavButtonStyle}
            image={WatchlistIMG}
            currentlySelected={this.state.currentlySelected}
            onPress={() => {this.props.switchSelect('Watchlist');
                            this.props.changeSearchableMounted(true);
                            store.dispatch(updateSearch(''));
                      }
                    }/>
          <NavBarButton title="Graphs"
            style={styles.NavButtonStyle}
            image={GraphIMG}
            currentlySelected={this.state.currentlySelected}
            onPress={() => {this.props.switchSelect('Graphs');
                            this.props.changeSearchableMounted(false);
                            store.dispatch(updateSearch(''));

                      }
                    }/>
          <NavBarButton title="Explore"
            image={ExploreIMG}
            style={styles.NavButtonStyle}
            currentlySelected={this.state.currentlySelected}
            onPress={() => {this.props.switchSelect('Explore');
                            this.props.changeSearchableMounted(true);
                            store.dispatch(updateSearch(''));
                        }
                    }/>
        </View>
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
    height:50,
    display:'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#0c0c0c',
    borderTopWidth: 1,
    borderTopColor: '#282b2d',
    bottom:0,
    elevation: 2
  },
});