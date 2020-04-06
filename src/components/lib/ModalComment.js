import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {colors} from '../css/Colors';
import {modalComment} from '../css/Styles';
import {
  setModalComment,
  setModalEditComment,
  deleteComment,
} from '../redux/actions/CommentAction';
import EditComment from './EditComment';

const widthScreen = Dimensions.get('window').width;

class ModalComment extends Component {
  render() {
    const {storyId, commentId, commentMessage} = this.props;
    const {commentEdit} = this.props.comment;
    return (
      <View style={modalComment.container}>
        <View style={modalComment.closeContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.setModalComment(false)}>
            <Ionicons
              name="ios-close"
              size={widthScreen / 10}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.setModalEditComment(true)}>
          <View style={modalComment.headerContainer}>
            <Text style={modalComment.headerText}>Edit comment</Text>
          </View>
        </TouchableOpacity>
        <View style={modalComment.separator} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            this.props.deleteComment(
              this.props.auth.userToken,
              commentId,
              storyId,
            )
          }>
          <View style={modalComment.footerContainer}>
            <Text style={modalComment.footerText}>Delete comment</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationIn="fadeIn"
          animationInTiming={300}
          animationOut="fadeOut"
          animationOutTiming={300}
          isVisible={commentEdit}
          hasBackdrop={false}
          onBackButtonPress={() => this.props.setModalEditComment(false)}>
          <EditComment
            storyId={storyId}
            commentId={commentId}
            commentMessage={commentMessage}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  comment: state.comment,
});

export default connect(mapStateToProps, {
  setModalEditComment,
  setModalComment,
  deleteComment,
})(ModalComment);
