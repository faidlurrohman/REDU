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
import {signin} from '../../css/Styles';
import {colors} from '../../css/Colors';
import ModalAuth from '../../lib/ModalAuth';
import {
  login,
  setModalLogin,
  getCredential,
} from '../../redux/actions/AuthAction';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {hidePassword: true, usernameOrEmail: '', password: ''};
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.statusbar);
    StatusBar.setTranslucent(true);
  };

  _setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  render() {
    const {navigate} = this.props.navigation;
    const showBack = this.props.navigation.getParam(
      'showBack',
      this.props.navigation.state.params === true ? true : false,
    );
    const {loginLoading, loginModal} = this.props.auth;
    return (
      <ImageBackground
        resizeMode="stretch"
        source={require('../../../assets/images/authpage.jpeg')}
        style={signin.imgBack}>
        <View style={signin.imgOpacity} />
        {showBack === true ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigate('Landing')}>
            <View style={signin.backButton}>
              <Ionicons
                name="ios-arrow-round-back"
                size={widthScreen / 10}
                color={colors.whiteOpacity}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={signin.backButton} />
        )}
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
            <View style={signin.inputContainer}>
              <View style={signin.labelIcon}>
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
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => this.setState({username: value})}>
                Username
              </FloatingTextInput>
            </View>
            <View style={signin.inputContainer}>
              <View style={signin.labelIcon}>
                <SimpleLineIcons
                  name="lock"
                  size={widthScreen / 20}
                  color={colors.whiteOpacity}
                />
              </View>
              <FloatingTextInput
                secureTextEntry={this.state.hidePassword}
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
                  style={signin.eyePassword}
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
            <TouchableOpacity
              style={{
                marginBottom: heightScreen / 50,
                paddingHorizontal: widthScreen / 20,
              }}
              activeOpacity={0.5}>
              <Text style={signin.forgotButton}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={signin.containerButton}>
            <TouchableOpacity
              disabled={
                this.state.username !== undefined && this.state.password !== ''
                  ? false
                  : true
              }
              onPress={() =>
                this.props
                  .login(this.state.username, this.state.password)
                  .then(async () => {
                    if (this.props.auth.loginStatus === true) {
                      await this.props.getCredential();
                      navigate('AppIsLogin');
                    }
                  })
              }
              activeOpacity={0.8}
              style={
                this.state.username !== undefined && this.state.password !== ''
                  ? signin.buttonSignin
                  : signin.buttonSigninDisabled
              }>
              {loginLoading === true ? (
                <DotIndicator
                  style={{paddingVertical: heightScreen / 72.5}}
                  color={colors.white}
                  count={3}
                  size={widthScreen / 40}
                />
              ) : (
                <Text style={signin.textSignin}>Sign In</Text>
              )}
            </TouchableOpacity>
            <View style={signin.dontContainer}>
              <Text style={signin.textDont}>Don't have an account?</Text>
              <Text
                onPress={() => navigate('Signup')}
                style={signin.textSignup}>{` Sign Up!`}</Text>
            </View>
          </View>
        </ScrollView>
        <Modal
          style={{margin: 0}}
          onBackdropPress={() => this.props.setModalLogin(false)}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          backdropOpacity={0.2}
          isVisible={loginModal}
          onBackButtonPress={() => this.props.setModalLogin(false)}>
          <ModalAuth
            setAuth={'authLogin'}
            setModalLogin={this.props.setModalLogin}
          />
        </Modal>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {login, setModalLogin, getCredential})(
  Signin,
);

const styles = StyleSheet.create({});
