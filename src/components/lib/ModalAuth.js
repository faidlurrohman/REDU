import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {modalAuth} from '../css/Styles';
import {colors} from '../css/Colors';

const widthScreen = Dimensions.get('window').width;

export default class ModalAuth extends Component {
  render() {
    const {setAuth, setModalRegister, setModalLogin} = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {setAuth === 'authRegister' ? (
          <View style={modalAuth.containerRegister}>
            <View style={modalAuth.header}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalRegister(false)}>
                <Ionicons
                  name="ios-close"
                  size={widthScreen / 10}
                  color={colors.black}
                />
              </TouchableOpacity>
              <Text style={modalAuth.headerText}>Oops register error!</Text>
            </View>
          </View>
        ) : setAuth === 'authLogin' ? (
          <View style={modalAuth.containerLogin}>
            <View style={modalAuth.header}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalLogin(false)}>
                <Ionicons
                  name="ios-close"
                  size={widthScreen / 10}
                  color={colors.black}
                />
              </TouchableOpacity>
              <Text style={modalAuth.headerText}>Oops sign in error!</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
