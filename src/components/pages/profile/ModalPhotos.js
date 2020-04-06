import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {colors} from '../../css/Colors';
import {modalPhotos} from '../../css/Styles';
import {setModalPhotos} from '../../redux/actions/AuthAction';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class ModalPhotos extends Component {
  render() {
    return (
      <View style={modalPhotos.container}>
        <View style={modalPhotos.closeBtn}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.setModalPhotos(false)}>
            <Ionicons
              name="ios-close"
              size={widthScreen / 10}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.pickSingleCamera(true)}>
          <View style={modalPhotos.containerCamera}>
            <Text style={modalPhotos.textCamera}>Open camera</Text>
          </View>
        </TouchableOpacity>
        <View style={modalPhotos.separator} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.pickSingle(true)}>
          <View style={modalPhotos.containerFile}>
            <Text style={modalPhotos.TextFile}>Open file manager</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {setModalPhotos})(ModalPhotos);
