import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import {landing} from '../../css/Styles';
import {colors} from '../../css/Colors';
import {setCredential} from '../../redux/actions/AuthAction';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.statusbar);
    StatusBar.setTranslucent(true);
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        source={require('../../../assets/images/landingpage.jpg')}
        style={landing.imgBack}>
        <View style={landing.opacityBack} />
        <View style={landing.logoContainer}>
          <Image
            source={require('../../../assets/images/logoText.png')}
            style={landing.logo}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={landing.textTitle}>
            Application for recreation and education
          </Text>
          <Text style={landing.textSub}>
            REDU application could be your best friend in finding the best place
            for your recreation and education.
          </Text>
        </View>
        <View style={landing.containerButton}>
          <TouchableOpacity
            onPress={() => navigate('Signin', {showBack: true})}
            activeOpacity={0.9}
            style={landing.btnRegister}>
            <Text style={landing.txtRegister}>
              Register or sign in with email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.setCredential(`guest`).then(navigate('AppIsNotLogin'))
            }
            activeOpacity={0.9}
            style={landing.btnContinue}>
            <Text style={landing.txtContinue}>Continue without sign in</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {setCredential})(Landing);
