import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBarButton from './NavBarButton.js';
import Portfolio from './Portfolio.js';
import WatchList from './WatchList.js';
import GraphsPage from './GraphsPage.js';
import NewsPage from './NewsPage.js';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioShow: true,
      watchListShow: false,
      graphsShow: false,
      newsShow: false,
    };
  }
  newsClick = () => {
    if (this.state.newsShow != true) {
      this.setState({portfolioShow: false, watchListShow: false, graphsShow: false, newsShow: true});
    }
  }

  graphsClick = () => {
    if (this.state.graphsShow != true) {
      this.setState({portfolioShow: false, watchListShow: false, graphsShow: true, newsShow: false});
    }
  }

  WatchListClick = () => {
    if (this.state.watchListShow != true) {
      this.setState({portfolioShow: false, watchListShow: true, graphsShow: false, newsShow: false});
    }
  }

  PortfolioClick = () => {
    if (this.state.portfolioShow != true) {
      this.setState({portfolioShow: true, watchListShow: false, graphsShow: false, newsShow: false});
    }
  };

  render() {

    var PortfolioButtonColor;
    var WatchListButtonColor;
    var GraphsButtonColor;
    var NewsButtonColor;

    var PortfolioButtonText;
    var WatchListButtonText;
    var GraphsButtonText;
    var NewsButtonColor;

    if (this.state.portfolioShow) {
      PortfolioButtonColor = '#30a1ad';
      PortfolioButtonText = '#0c0c0c';
    }
    else {
      PortfolioButtonColor = 'rgba(0,0,0,0)';
      PortfolioButtonText = '#30a1ad';
    }
    if (this.state.watchListShow) {
      WatchListButtonColor = '#30a1ad';
      WatchListButtonText = '#0c0c0c';
    }
    else {
      WatchListButtonColor = 'rgba(0,0,0,0)';
      WatchListButtonText = '#30a1ad';
    }
    if (this.state.graphsShow) {
      GraphsButtonColor = '#30a1ad';
      GraphsButtonText = '#0c0c0c';
    }
    else {
      GraphsButtonColor = 'rgba(0,0,0,0)';
      GraphsButtonText = '#30a1ad';
    }
    if (this.state.newsShow) {
      NewsButtonColor = '#30a1ad';
      NewsButtonText = '#0c0c0c';
    }
    else {
      NewsButtonColor = 'rgba(0,0,0,0)';
      NewsButtonText = '#30a1ad';
    }


    var MainPageContent = <Text>.</Text>;
    if (this.state.portfolioShow) {
      MainPageContent = <Portfolio/>
    }
    if (this.state.watchListShow) {
      MainPageContent = <WatchList/>
    }
    if (this.state.graphsShow) {
      MainPageContent = <GraphsPage/>
    }
    if (this.state.newsShow) {
      MainPageContent = <NewsPage/>
    }

    return (
      <View style={styles.MainPage}>
        <View style={styles.NavBar}>
          <NavBarButton title="Portfolio"
            color={PortfolioButtonColor}
            TextColor={PortfolioButtonText}
            style={styles.NavButtonStyle}
            onPress={this.PortfolioClick}
            leftBorder='false'
            rightBorder='true'/>
          <NavBarButton title="Watchlist"
            color={WatchListButtonColor}
            TextColor={WatchListButtonText}
            style={styles.NavButtonStyle}
            onPress={this.WatchListClick}
            leftBorder='false'
            rightBorder='true'/>
          <NavBarButton title="Graphs"
            color={GraphsButtonColor}
            TextColor={GraphsButtonText}
            style={styles.NavButtonStyle}
            onPress={this.graphsClick}
            leftBorder='false'
            rightBorder='true'/>
          <NavBarButton title="Explore"
            color={NewsButtonColor}
            TextColor={NewsButtonText}
            style={styles.NavButtonStyle}
            onPress={this.newsClick}
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
    width:'100%',
    height:'100%',
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