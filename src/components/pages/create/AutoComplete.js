import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {colors} from '../../css/Colors';

const widthScreen = Dimensions.get('window').width;

class AutoComplete extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <GooglePlacesAutocomplete
          placeholder="Enter Location"
          minLength={2}
          autoFocus={true}
          fetchDetails={true}
          listViewDisplayed="auto"
          currentLocation={false}
          ref={c => (this.googlePlacesAutocomplete = c)}
          query={{
            key: 'AIzaSyCw_G0NAxJtSBntEVhgXGW79S_Z8_DjmlU',
            language: 'en',
            types: 'establishment',
            // types: '(cities)',
          }}
          onPress={(data, details = null) => {
            // console.log('data', data);
            // console.log('details', details);
            this.props.dataSearch(
              details.geometry.location.lat,
              details.geometry.location.lng,
            );
            this.props.autoCompleteModal(false);
          }}
          styles={{
            textInputContainer: {
              backgroundColor: colors.white,
              paddingTop: widthScreen / 40,
              paddingHorizontal: widthScreen / 40,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              borderRadius: 100,
              elevation: 2,
              height: widthScreen / 7,
              marginLeft: 0,
              marginRight: 0,
              letterSpacing: 1,
              color: colors.black,
              fontFamily: 'Roboto-Regular',
              fontSize: widthScreen / 24,
              paddingLeft: widthScreen / 8,
              paddingRight: widthScreen / 8,
            },
            listView: {
              backgroundColor: colors.white,
              marginTop: widthScreen / 8,
              paddingLeft: widthScreen / 90,
              paddingRight: widthScreen / 20,
            },
            description: {
              letterSpacing: 1,
              color: colors.black,
              fontFamily: 'Roboto-Regular',
              fontSize: widthScreen / 24,
            },
            poweredContainer: {
              display: 'none',
            },
            separator: {
              display: 'none',
            },
            loader: {
              display: 'none',
            },
          }}
          renderLeftButton={() => (
            <View
              style={{
                zIndex: 999,
                position: 'absolute',
                elevation: 2,
                left: widthScreen / 16,
                marginTop: widthScreen / 13,
              }}>
              <Feather
                name="search"
                size={widthScreen / 16}
                color={colors.black}
              />
            </View>
          )}
          renderRightButton={() => (
            <View
              style={{
                position: 'absolute',
                elevation: 2,
                right: widthScreen / 40,
                marginTop: 1,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  padding: 20,
                }}
                onPress={() =>
                  this.googlePlacesAutocomplete._handleChangeText('')
                }>
                <Ionicons
                  name="ios-close"
                  size={widthScreen / 9}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps)(AutoComplete);
