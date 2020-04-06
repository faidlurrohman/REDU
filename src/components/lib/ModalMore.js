import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import EditPost from './EditPost';
import {colors} from '../css/Colors';
import {modalMore} from '../css/Styles';
import {
  setModalMore,
  deleteStory,
  setModalEdit,
} from '../redux/actions/StoryAction';

const widthScreen = Dimensions.get('window').width;

class ModalMore extends Component {
  render() {
    const {modalEdit} = this.props.story;
    return (
      <View style={modalMore.container}>
        <View style={modalMore.closeButton}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.setModalMore(false)}>
            <Ionicons
              name="ios-close"
              size={widthScreen / 10}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.setModalEdit(true)}>
          <View style={modalMore.headerContainer}>
            <Text style={modalMore.headerText}>Edit story</Text>
          </View>
        </TouchableOpacity>
        <View style={modalMore.separator} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            this.props.deleteStory(
              this.props.auth.userToken,
              this.props.dataStory[0]._id,
            )
          }>
          <View style={modalMore.footerContainer}>
            <Text style={modalMore.footerText}>Delete story</Text>
          </View>
        </TouchableOpacity>
        <Modal
          style={{margin: 0}}
          hasBackdrop={false}
          animationIn="slideInUp"
          animationInTiming={300}
          isVisible={modalEdit}
          onBackButtonPress={() => this.props.setModalEdit(false)}>
          <EditPost dataStory={this.props.dataStory} />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.story,
});

export default connect(mapStateToProps, {
  setModalMore,
  deleteStory,
  setModalEdit,
})(ModalMore);
