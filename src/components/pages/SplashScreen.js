import React, {Component} from 'react';
import {View, StatusBar, Image} from 'react-native';

import {splash} from '../css/Styles';

export default class SplashScreen extends Component {
  componentDidMount = () => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  };

  render() {
    return (
      <View style={splash.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={splash.imgSplash}
        />
      </View>
    );
  }
}
