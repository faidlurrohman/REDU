import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import FloatingTextInput from '../../lib/FloatingTextInput';
import {colors} from '../../css/Colors';
import {signup} from '../../css/Styles';
import ModalAuth from '../../lib/ModalAuth';
import {
  register,
  setModalRegister,
  getCredential,
} from '../../redux/actions/AuthAction';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      hidePasswordConfirm: true,
      password: '',
      passwordConfirmation: '',
    };
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.statusbar);
    StatusBar.setTranslucent(true);
  };

  _setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  _setPasswordConfirmVisibility = () => {
    this.setState({hidePasswordConfirm: !this.state.hidePasswordConfirm});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {hidePassword, hidePasswordConfirm} = this.state;
    const {registerLoading, registerModal} = this.props.auth;
    return (
      <ImageBackground
        resizeMode="stretch"
        source={require('../../../assets/images/authpage.jpeg')}
        style={signup.imgBack}>
        <View style={signup.imgOpacity} />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigate('Signin')}>
          <View style={signup.backButton}>
            <Ionicons
              name="ios-arrow-round-back"
              size={widthScreen / 10}
              color={colors.whiteOpacity}
            />
          </View>
        </TouchableOpacity>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <View style={signup.inputContainer}>
              <View style={signup.labelIcon}>
                <SimpleLineIcons
                  name="user"
                  size={widthScreen / 22}
                  color={colors.whiteOpacity}
                />
              </View>
              <FloatingTextInput
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                selectionColor={colors.whiteOpacity}
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={value => this.setState({fullname: value})}>
                Fullname
              </FloatingTextInput>
            </View>
            <View style={signup.inputContainer}>
              <View style={signup.labelIcon}>
                <SimpleLineIcons
                  name="emotsmile"
                  size={widthScreen / 22}
                  color={colors.whiteOpacity}
                />
              </View>
              <FloatingTextInput
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                selectionColor={colors.whiteOpacity}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => this.setState({username: value})}>
                Username
              </FloatingTextInput>
            </View>
            <View style={signup.inputContainer}>
              <View style={signup.labelIcon}>
                <SimpleLineIcons
                  name="envelope-open"
                  size={widthScreen / 22}
                  color={colors.whiteOpacity}
                />
              </View>
              <FloatingTextInput
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                selectionColor={colors.whiteOpacity}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                onChangeText={value => this.setState({email: value})}>
                Email
              </FloatingTextInput>
            </View>
            <View style={signup.inputContainer}>
              <View style={signup.labelIcon}>
                <SimpleLineIcons
                  name="lock"
                  size={widthScreen / 22}
                  color={colors.whiteOpacity}
                />
              </View>
              <FloatingTextInput
                secureTextEntry={hidePassword}
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                selectionColor={colors.whiteOpacity}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => this.setState({password: value})}>
                Password
              </FloatingTextInput>
              {this.state.password !== '' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={signup.eyePassword}
                  onPress={this._setPasswordVisibility}>
                  <MaterialCommunityIcons
                    name={
                      this.state.hidePassword === false
                        ? 'eye-outline'
                        : 'eye-off-outline'
                    }
                    size={widthScreen / 20}
                    color={colors.whiteOpacity}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={signup.inputContainer}>
              <View style={signup.labelIcon}>
                <SimpleLineIcons
                  name="lock"
                  size={widthScreen / 22}
                  color={colors.whiteOpacity}
                />
              </View>
              <FloatingTextInput
                secureTextEntry={hidePasswordConfirm}
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}
                onBlur={this.onBlur}
                selectionColor={colors.whiteOpacity}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value =>
                  this.setState({passwordConfirmation: value})
                }>
                Password Confirmation
              </FloatingTextInput>
              {this.state.passwordConfirmation !== '' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={signup.eyePassword}
                  onPress={this._setPasswordConfirmVisibility}>
                  <MaterialCommunityIcons
                    name={
                      this.state.hidePasswordConfirm === false
                        ? 'eye-outline'
                        : 'eye-off-outline'
                    }
                    size={widthScreen / 20}
                    color={colors.whiteOpacity}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={signup.containerButton}>
            <TouchableOpacity
              disabled={
                this.state.fullname !== undefined &&
                this.state.username !== undefined &&
                this.state.email !== undefined &&
                this.state.password !== '' &&
                this.state.passwordConfirmation !== '' &&
                this.state.password === this.state.passwordConfirmation
                  ? false
                  : true
              }
              onPress={() =>
                this.props
                  .register(
                    this.state.fullname,
                    this.state.username,
                    this.state.email,
                    this.state.password,
                    this.state.passwordConfirmation,
                  )
                  .then(async () => {
                    if (this.props.auth.registerStatus === true) {
                      await this.props.getCredential();
                      navigate('AppIsLogin');
                    }
                  })
              }
              activeOpacity={0.8}
              style={
                this.state.fullname !== undefined &&
                this.state.username !== undefined &&
                this.state.email !== undefined &&
                this.state.password !== '' &&
                this.state.passwordConfirmation !== '' &&
                this.state.password === this.state.passwordConfirmation
                  ? signup.buttonSignup
                  : signup.buttonSignupDisabled
              }>
              {registerLoading === true ? (
                <DotIndicator
                  style={{paddingVertical: heightScreen / 72.5}}
                  color={colors.white}
                  count={3}
                  size={widthScreen / 40}
                />
              ) : (
                <Text style={signup.textSignup}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          style={{margin: 0}}
          onBackdropPress={() => this.props.setModalRegister(false)}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          backdropOpacity={0.2}
          isVisible={registerModal}
          onBackButtonPress={() => this.props.setModalRegister(false)}>
          <ModalAuth
            setAuth={'authRegister'}
            setModalRegister={this.props.setModalRegister}
          />
        </Modal>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  register,
  setModalRegister,
  getCredential,
})(Signup);

const styles = StyleSheet.create({});
