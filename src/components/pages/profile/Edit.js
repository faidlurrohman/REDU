import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';

import {colors} from '../../css/Colors';
import {header, modalHeader, editProfil} from '../../css/Styles';
import Loading from '../../lib/Loading';
import {
  deleteCredential,
  editUser,
  setModalEdit,
  setModalPhotos,
} from '../../redux/actions/AuthAction';
import ModalPhotos from './ModalPhotos';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editImage: null,
      heightBio: heightScreen / 12,
    };
  }

  _pickSingleWithCamera = (cropping, mediaType = 'photo') => {
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
          editImage: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        });
        this.props.setModalPhotos(false);
      })
      .catch(e => console.log(e));
  };

  _pickSingle = (cropit, circular = false) => {
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
          editImage: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        });
        this.props.setModalPhotos(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const {userToken, userData, loadingEdit, modalPhotos} = this.props.auth;
    if (loadingEdit === true) {
      return <Loading />;
    }
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={header.container}>
          <View style={header.childNoShadow}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.goBack()}>
              <View style={{marginTop: heightScreen / 30}}>
                <Ionicons
                  name="ios-close"
                  size={widthScreen / 10}
                  color={colors.black}
                />
              </View>
            </TouchableOpacity>
            <View style={editProfil.textContainer}>
              <View style={modalHeader.containerTextEdit}>
                <Text style={modalHeader.textHeader}>Edit Profile</Text>
              </View>
            </View>
            <View style={editProfil.btnCreate}>
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={
                  (this.state.editFullname !== undefined &&
                    this.state.editFullname !== userData.name) ||
                  (this.state.editBio !== undefined &&
                    this.state.editBio !== userData.bio) ||
                  this.state.editImage !== null
                    ? false
                    : true
                }
                onPress={() =>
                  this.props.editUser(
                    userToken,
                    this.state.editImage,
                    this.state.editFullname !== undefined
                      ? this.state.editFullname
                      : userData.name,
                    this.state.editBio !== undefined
                      ? this.state.editBio
                      : userData.bio,
                  )
                }>
                <Ionicons
                  name="ios-checkmark"
                  size={widthScreen / 8}
                  color={
                    (this.state.editFullname !== undefined &&
                      this.state.editFullname !== userData.name) ||
                    (this.state.editBio !== undefined &&
                      this.state.editBio !== '' &&
                      this.state.editBio !== userData.bio) ||
                    this.state.editImage !== null
                      ? colors.darkGreen
                      : colors.grey_v4
                  }
                />
              </TouchableOpacity>
            </View>
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
          <View style={{flex: 0, padding: widthScreen / 20}}>
            <View style={editProfil.containerImg}>
              <Image
                source={
                  this.state.editImage !== null
                    ? {uri: this.state.editImage.uri}
                    : {uri: userData.image}
                }
                style={editProfil.imgProfil}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.setModalPhotos(true)}>
                <Text style={editProfil.textImg}>Change Profile Image</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, padding: widthScreen / 20}}>
            <View style={{flex: 0}}>
              <Text style={editProfil.textFullname}>Fullname</Text>
              <TextInput
                style={editProfil.inputFullname}
                placeholder="Fullname"
                selectionColor={colors.grey_v3}
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={value => this.setState({editFullname: value})}
                defaultValue={userData.name}
              />
            </View>
            <View style={{flex: 0}}>
              <Text style={editProfil.textBio}>Bio</Text>
              <TextInput
                multiline={true}
                placeholder="Add your bio"
                selectionColor={colors.grey_v3}
                autoCapitalize="sentences"
                defaultValue={userData.bio === undefined ? null : userData.bio}
                onChangeText={value => {
                  this.setState({editBio: value});
                }}
                onContentSizeChange={event => {
                  const currHeight = event.nativeEvent.contentSize.height;
                  this.setState({
                    heightBio:
                      currHeight < heightScreen / 2
                        ? currHeight + 10
                        : heightScreen / 3,
                  });
                }}
                style={[editProfil.inputBio, {height: this.state.heightBio}]}
              />
            </View>
          </View>

          <View
            style={{
              flex: 0,
              elevation: 5,
              backgroundColor: colors.darkGreen,
              height: heightScreen / 12,
              padding: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                borderRadius: 5,
                backgroundColor: colors.darkGreen,
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={() =>
                this.props.deleteCredential().then(() => {
                  if (this.props.auth.userToken === 'guest') {
                    this.props.navigation.navigate('AuthToken');
                  }
                })
              }>
              <Text
                style={{
                  textAlign: 'center',
                  letterSpacing: 1,
                  color: this.state.idTag !== '' ? colors.white : colors.black,
                  fontFamily: 'Roboto-Medium',
                  fontSize: widthScreen / 20,
                }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          animationIn="fadeIn"
          animationInTiming={300}
          animationOut="fadeOut"
          animationOutTiming={300}
          isVisible={modalPhotos}
          backdropOpacity={0.2}
          onBackdropPress={() => this.props.setModalPhotos(false)}
          onBackButtonPress={() => this.props.setModalPhotos(false)}>
          <ModalPhotos
            pickSingle={this._pickSingle}
            pickSingleCamera={this._pickSingleWithCamera}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteCredential,
  editUser,
  setModalEdit,
  setModalPhotos,
})(Edit);
