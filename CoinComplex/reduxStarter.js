
import React from 'react';
import {Component, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import LoginNav from './LoginNavigator.js';

export default class reduxStarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
	render() {
		return (
			<Provider store={store}>
				<LoginNav />
			</Provider>
		);
	}
}