import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {DotIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

import {colors} from '../../css/Colors';
import Axios from 'axios';
import AutoCompelete from './AutoComplete';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const ASPECT_RATIO = widthScreen / heightScreen;
const LATITUDE_DELTA = 0.004;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MAP_STYLE = [
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocomplete: false,
      label: '',
      labelLoading: false,
      latitude: -2.3198596,
      longitude: 99.4220932,
    };
  }

  componentDidMount = () => {
    this._getCurrentLocation();
  };

  _getCurrentLocation = () => {
    this.setState({searchId: ''});
    Geolocation.getCurrentPosition(
      async position => {
        //save current latlong
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);
        this.setState({latitude: lat, longitude: long, labelLoading: true});
      },
      error => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  _setAutoComplete = visible => {
    this.setState({autocomplete: visible});
  };

  _dataSearch = (latParams, longParams) => {
    this.setState({
      latitude: latParams,
      longitude: longParams,
    });
  };

  _geoCodeGoogle = async (latParams, longParams) => {
    const getDataLatLong = await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latParams},${longParams}&key=AIzaSyCw_G0NAxJtSBntEVhgXGW79S_Z8_DjmlU`,
    );
    // console.log('getDataLatLong', getDataLatLong.data);

    let blurData = getDataLatLong.data.results[0].formatted_address.split(', ');
    if (blurData[0] === 'Unnamed Road') {
      blurData.shift();
      let fixData = blurData.slice(0, 3).join(', ');
      console.log(fixData);
      this.setState({
        label: fixData,
        labelLoading: false,
      });
    } else {
      let fixData = blurData.slice(0, 4).join(', ');
      console.log(fixData);
      this.setState({
        label: fixData,
        labelLoading: false,
      });
    }
  };

  render() {
    const {autocomplete, label, labelLoading, latitude, longitude} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <MapView
          style={{flex: 1}}
          region={{
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          zoomEnabled={false}
          zoomTapEnabled={false}
          customMapStyle={MAP_STYLE}
          showsCompass={false}
          onRegionChangeComplete={region => {
            this.setState({
              labelLoading: true,
              latitude: region.latitude,
              longitude: region.longitude,
            });
            setTimeout(() => {
              this._geoCodeGoogle(region.latitude, region.longitude);
            }, 5000);
          }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        />
        {/* search input */}
        <View
          style={{
            position: 'absolute',
            top: widthScreen / 20,
            width: widthScreen,
            paddingHorizontal: widthScreen / 100,
          }}>
          <View
            style={{
              marginHorizontal: widthScreen / 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.white,
                padding: widthScreen / 30,
                elevation: 2,
                borderRadius: 100,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 0,
                  marginLeft: widthScreen / 100,
                }}
                onPress={() => this.props.modalLocation(false)}>
                <Feather
                  name="arrow-left"
                  size={widthScreen / 14}
                  color={colors.black}
                />
              </TouchableOpacity>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {labelLoading !== true ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: colors.black,
                      fontFamily: 'Roboto-Regular',
                      fontSize: widthScreen / 24,
                      letterSpacing: 0.5,
                      paddingHorizontal: widthScreen / 50,
                    }}>
                    {label}
                  </Text>
                ) : (
                  <DotIndicator
                    size={widthScreen / 60}
                    color={colors.black}
                    count={3}
                  />
                )}
              </View>
              {labelLoading !== true && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    flex: 0,
                    marginRight: widthScreen / 100,
                  }}
                  onPress={() => this.setState({autocomplete: true})}>
                  <Feather
                    name="search"
                    size={widthScreen / 16}
                    color={colors.black}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={labelLoading === true ? true : false}
              style={{
                flex: 0,
                marginLeft: widthScreen / 100,
                backgroundColor:
                  labelLoading === true ? colors.grey_v3 : colors.darkGreen,
                padding: widthScreen / 30,
                elevation: 2,
                borderRadius: 100,
              }}
              onPress={() =>
                this.props.setLocationData(label, latitude, longitude)
              }>
              <Feather
                name="check"
                size={widthScreen / 14}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* marker */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <Image
            pointerEvents="none"
            style={{width: widthScreen / 8, height: widthScreen / 8}}
            source={require('../../../assets/images/marker.png')}
          />
        </View>
        {/* currentlocation button */}
        <View
          style={{
            position: 'absolute',
            bottom: widthScreen / 20,
            right: widthScreen / 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this._getCurrentLocation()}
            style={{
              backgroundColor: colors.white,
              elevation: 2,
              borderRadius: 100,
              padding: widthScreen / 50,
            }}>
            <MaterialIcons
              name="my-location"
              size={widthScreen / 12}
              color={colors.blackk}
            />
          </TouchableOpacity>
        </View>
        <Modal
          hasBackdrop={false}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={autocomplete}
          style={{margin: 0}}
          onBackButtonPress={() => this.setState({autocomplete: false})}>
          <AutoCompelete
            autoCompleteModal={this._setAutoComplete}
            dataSearch={this._dataSearch}
          />
        </Modal>
      </View>
    );
  }
}
