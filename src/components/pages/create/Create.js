import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';

import {createStory, setModalCreate} from '../../redux/actions/StoryAction';
import {modalHeader} from '../../css/Styles';
import Category from './Category';
import Photos from './Photos';
import Modal from 'react-native-modal';
import {colors} from '../../css/Colors';
import Loading from '../../lib/Loading';
import Location from './Location';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTitle: '',
      categoryModal: false,
      photosModal: false,
      locationModal: false,
      createCategory: '',
      createDesc: '',
      createCategoryName: '',
      createLocation: '',
      createLat: '',
      createLong: '',
      createImage: null,
      heightDesc: heightScreen / 12,
    };
  }

  _setCategory = (value, name) => {
    this.setState({
      createCategory: value,
      createCategoryName: name,
      categoryModal: false,
    });
  };

  _modalCategory = visible => {
    this.setState({categoryModal: visible});
  };

  _modalPhotos = visible => {
    this.setState({photosModal: visible});
  };

  _modalLocation = visible => {
    this.setState({locationModal: visible});
  };

  _uploadImageStorage = (cropit, circular = false) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        // console.log('received file image', image);
        this.setState({
          photosModal: false,
          createImage: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        });
        this.props._modalPhotos(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  _uploadImageCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        // console.log('received camera image', image);
        this.setState({
          photosModal: false,
          createImage: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        });
        this.props._modalPhotos(false);
      })
      .catch(e => console.log(e));
  };

  _setLocationData = (name, lat, long) => {
    console.log(name, lat, long);
    this.setState({
      locationModal: false,
      createLocation: name,
      createLat: lat,
      createLong: long,
    });
  };

  render() {
    const {userToken} = this.props.auth;
    const {createImage, createLocation} = this.state;
    const {loadingCreate} = this.props.story;
    if (loadingCreate === true) {
      return <Loading />;
    }
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={modalHeader.container}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.setModalCreate(false)}>
            <View style={{flex: 0}}>
              <Ionicons
                name="ios-close"
                size={widthScreen / 10}
                color={colors.black}
              />
            </View>
          </TouchableOpacity>
          <View style={modalHeader.containerText}>
            <Text style={modalHeader.textHeader}>Create Story</Text>
          </View>
          <View style={{flex: 0}}>
            <TouchableOpacity
              disabled={
                this.state.createTitle !== '' &&
                this.state.createCategory !== '' &&
                this.state.createDesc !== '' &&
                this.state.createDesc !== '' &&
                this.state.createLocation !== ''
                  ? false
                  : true
              }
              activeOpacity={0.5}
              onPress={() =>
                this.props.createStory(
                  userToken,
                  this.state.createTitle,
                  this.state.createDesc,
                  this.state.createLocation,
                  this.state.createLat,
                  this.state.createLong,
                  this.state.createCategory,
                  this.state.createImage,
                )
              }>
              <Ionicons
                name="ios-checkmark"
                size={widthScreen / 8}
                color={
                  this.state.createTitle !== '' &&
                  this.state.createCategory !== '' &&
                  this.state.createDesc !== '' &&
                  this.state.createLocation !== ''
                    ? colors.darkGreen
                    : colors.grey_v4
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}>
          <View style={{flex: 1}}>
            <View style={{flex: 0, padding: widthScreen / 20}}>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: 'Roboto-Italic',
                  fontSize: widthScreen / 30,
                  letterSpacing: 0.5,
                  paddingHorizontal: widthScreen / 50,
                }}>
                Title
              </Text>
              <TextInput
                style={{
                  color: colors.black,
                  paddingHorizontal: widthScreen / 50,
                  height: heightScreen / 16,
                  fontSize: widthScreen / 28,
                  fontFamily: 'Roboto-Regular',
                  borderBottomColor: colors.grey_v2,
                  borderBottomWidth: 1,
                }}
                placeholder="Title"
                selectionColor={colors.grey_v3}
                autoCapitalize="words"
                onChangeText={value => this.setState({createTitle: value})}
              />
            </View>
            <View
              style={{
                flex: 0,
                paddingHorizontal: widthScreen / 20,
                marginBottom: widthScreen / 20,
              }}>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: 'Roboto-Italic',
                  fontSize: widthScreen / 30,
                  letterSpacing: 0.5,
                  paddingHorizontal: widthScreen / 50,
                }}>
                Category
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.setState({categoryModal: true})}>
                <TextInput
                  editable={false}
                  style={{
                    color:
                      this.state.createCategoryName !== ''
                        ? colors.black
                        : colors.grey_v4,
                    paddingHorizontal: widthScreen / 50,
                    height: heightScreen / 16,
                    fontSize: widthScreen / 28,
                    fontFamily: 'Roboto-Regular',
                    borderBottomColor: colors.grey_v2,
                    borderBottomWidth: 1,
                  }}
                  placeholder="Category"
                  selectionColor={colors.grey_v3}
                  autoCapitalize="words"
                  defaultValue={
                    this.state.createCategoryName !== ''
                      ? this.state.createCategoryName
                      : `Category`
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0,
                paddingHorizontal: widthScreen / 20,
                marginBottom: widthScreen / 20,
              }}>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: 'Roboto-Italic',
                  fontSize: widthScreen / 30,
                  letterSpacing: 0.5,
                  paddingHorizontal: widthScreen / 50,
                }}>
                Description
              </Text>
              <TextInput
                multiline={true}
                onContentSizeChange={event => {
                  const currHeight = event.nativeEvent.contentSize.height;
                  this.setState({
                    heightDesc:
                      currHeight < heightScreen / 2
                        ? currHeight + 10
                        : heightScreen / 3,
                  });
                }}
                style={{
                  color: colors.black,
                  paddingHorizontal: widthScreen / 50,
                  height: heightScreen / 16,
                  fontSize: widthScreen / 28,
                  fontFamily: 'Roboto-Regular',
                  borderBottomColor: colors.grey_v2,
                  borderBottomWidth: 1,
                  height: this.state.heightDesc,
                }}
                placeholder="Description"
                selectionColor={colors.grey_v3}
                autoCapitalize="sentences"
                onChangeText={value => this.setState({createDesc: value})}
              />
            </View>
            <View
              style={{
                flex: 0,
                paddingHorizontal: widthScreen / 20,
                marginBottom: widthScreen / 20,
              }}>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: 'Roboto-Italic',
                  fontSize: widthScreen / 30,
                  letterSpacing: 0.5,
                  paddingHorizontal: widthScreen / 50,
                }}>
                Location
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.setState({locationModal: true})}>
                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      this.state.createLocation !== ''
                        ? colors.black
                        : colors.grey_v4,
                    paddingHorizontal: widthScreen / 50,
                    paddingVertical: widthScreen / 30,
                    fontSize: widthScreen / 28,
                    fontFamily: 'Roboto-Regular',
                    borderBottomColor: colors.grey_v2,
                    borderBottomWidth: 1,
                  }}>
                  {createLocation !== '' ? createLocation : `Location`}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0,
                paddingHorizontal: widthScreen / 20,
                marginBottom: widthScreen / 20,
              }}>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: 'Roboto-Italic',
                  fontSize: widthScreen / 30,
                  letterSpacing: 0.5,
                  paddingHorizontal: widthScreen / 50,
                }}>
                Image
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.setState({photosModal: true})}>
                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      this.state.createImage !== null
                        ? colors.black
                        : colors.grey_v4,
                    paddingHorizontal: widthScreen / 50,
                    paddingVertical: widthScreen / 30,
                    fontSize: widthScreen / 28,
                    fontFamily: 'Roboto-Regular',
                    borderBottomColor: colors.grey_v2,
                    borderBottomWidth: 1,
                  }}>
                  {createImage !== null ? `Change an image below` : `Image`}
                </Text>
              </TouchableOpacity>
            </View>
            {createImage !== null ? (
              <View
                style={{
                  width: widthScreen,
                  height: widthScreen,
                  paddingHorizontal: widthScreen / 20,
                  marginBottom: heightScreen / 30,
                }}>
                <TouchableOpacity
                  style={{
                    zIndex: 100000,
                    position: 'absolute',
                    elevation: 1,
                    top: widthScreen / 50,
                    right: widthScreen / 14,
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    width: widthScreen / 9,
                    height: widthScreen / 9,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.setState({createImage: null})}>
                  <Ionicons
                    name="md-trash"
                    size={widthScreen / 14}
                    color={colors.pink}
                  />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: createImage.uri,
                  }}
                  style={{flex: 1, width: undefined, height: undefined}}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
        <Modal
          style={{margin: 0}}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          hasBackdrop={false}
          isVisible={this.state.categoryModal}
          onBackButtonPress={() => this.setState({categoryModal: false})}>
          <Category
            createCategory={this.state.createCategory}
            modalCategory={this._modalCategory}
            setCategory={this._setCategory}
          />
        </Modal>
        <Modal
          style={{margin: 0}}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          hasBackdrop={false}
          isVisible={this.state.locationModal}
          onBackButtonPress={() => this.setState({locationModal: false})}>
          <Location
            modalLocation={this._modalLocation}
            setLocationData={this._setLocationData}
          />
        </Modal>
        <Modal
          style={{margin: 0}}
          onBackdropPress={() => this.setState({photosModal: false})}
          animationIn="slideInUp"
          animationInTiming={300}
          backdropOpacity={0.2}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={this.state.photosModal}
          onBackButtonPress={() => this.setState({photosModal: false})}>
          <Photos
            modalPhotos={this._modalPhotos}
            openDirectory={this._uploadImageStorage}
            openCamera={this._uploadImageCamera}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.story,
});

export default connect(mapStateToProps, {createStory, setModalCreate})(Create);
