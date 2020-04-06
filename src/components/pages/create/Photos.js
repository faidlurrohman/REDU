import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {colors} from '../../css/Colors';
import {photos} from '../../css/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const widthScreen = Dimensions.get('window').width;

export default class Photos extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={photos.container}>
          <View style={photos.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.modalPhotos(false)}>
              <Ionicons
                name="ios-close"
                size={widthScreen / 10}
                color={colors.black}
              />
            </TouchableOpacity>
            <Text style={photos.headerText}>Upload Photos</Text>
          </View>
          <View style={photos.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.openCamera(true)}>
              <View
                style={{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="ios-camera"
                  size={widthScreen / 12}
                  color={colors.darkGreen}
                />
                <Text style={photos.btnText}>Take a picture</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.openDirectory(true)}>
              <View
                style={{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                  name="ios-folder"
                  size={widthScreen / 15}
                  color={colors.darkGreen}
                />
                <Text style={photos.btnText}>Choose from file manager</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
