import React, {Component} from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {loading} from '../css/Styles';
import {colors} from '../css/Colors';
import {DotIndicator} from 'react-native-indicators';

const widthScreen = Dimensions.get('window').width;

export default class Loading extends Component {
  componentDidMount = () => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('rgba(0,0,0,0.1)');
    StatusBar.setTranslucent(true);
  };

  render() {
    return (
      <View style={loading.indicator}>
        <DotIndicator
          size={widthScreen / 40}
          color={colors.darkGreen}
          count={3}
        />
      </View>
    );
  }
}
