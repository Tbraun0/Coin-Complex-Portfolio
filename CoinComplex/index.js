import { AppRegistry } from 'react-native';
import LoginNav from './LoginNavigator';
import watchlist from './reducers/watchlist';
import {createStore} from 'redux';
let store = createStore(watchlist);

store.subscribe(AppRegistry.registerComponent);

AppRegistry.registerComponent('CoinComplex', () => <LoginNav store={store}/>);
