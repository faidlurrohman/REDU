import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {colors} from '../css/Colors';
import {modalComment} from '../css/Styles';
import {
  setModalArticle,
  setModalEditArticle,
  deleteCommentArticle,
} from '../redux/actions/CommentAction';
import EditArticle from './EditArticle';

const widthScreen = Dimensions.get('window').width;

class ModalArticle extends Component {
  render() {
    const {articleId, articleCommentId, articleCommentMessage} = this.props;
    const {articleEdit} = this.props.comment;

    return (
      <View style={modalComment.container}>
        <View style={modalComment.closeContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.setModalArticle(false)}>
            <Ionicons
              name="ios-close"
              size={widthScreen / 10}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.setModalEditArticle(true)}>
          <View style={modalComment.headerContainer}>
            <Text style={modalComment.headerText}>Edit comment</Text>
          </View>
        </TouchableOpacity>
        <View style={modalComment.separator} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            this.props.deleteCommentArticle(
              this.props.auth.userToken,
              articleCommentId,
              articleId,
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
          isVisible={articleEdit}
          hasBackdrop={false}
          onBackButtonPress={() => this.props.setModalEditArticle(false)}>
          <EditArticle
            articleId={articleId}
            articleCommentId={articleCommentId}
            articleCommentMessage={articleCommentMessage}
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
  setModalArticle,
  setModalEditArticle,
  deleteCommentArticle,
})(ModalArticle);
