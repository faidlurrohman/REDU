import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';

import {showModalSearch} from '../redux/actions/ArticleAction';
import {header, modalHeader} from '../css/Styles';
import {colors} from '../css/Colors';
import Search from './Search';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {routeName} = this.props.scene.route;
    const {modalSearch} = this.props.article;
    return (
      <View style={header.container}>
        <View style={header.childNoShadow}>
          <View
            style={{justifyContent: 'center', marginTop: heightScreen / 30}}>
            {routeName === 'Profile' ? (
              <View style={modalHeader.containerText}>
                <Text style={modalHeader.textHeaderNoBack}>My Profile</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={{position: 'absolute'}}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Image
                  source={require('../../assets/images/logoText2.png')}
                  style={header.image}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{justifyContent: 'center', marginTop: heightScreen / 30}}>
            {routeName === 'Profile' ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate('Edit')}>
                <SimpleLineIcons
                  name="settings"
                  color={colors.black}
                  size={widthScreen / 14}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.showModalSearch(true)}>
                <Fontisto
                  name="search"
                  color={colors.darkGreen}
                  size={widthScreen / 16}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Modal
          hasBackdrop={false}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={modalSearch}
          style={{margin: 0}}
          onBackButtonPress={() => this.props.showModalSearch(false)}>
          <Search />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps, {showModalSearch})(Header);
