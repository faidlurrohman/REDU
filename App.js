import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/Routes';
import {store} from './src/components/redux/Store';
import {Provider} from 'react-redux';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
