import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {colors} from '../css/Colors';
import {editCmt} from '../css/Styles';
import {setModalEditComment, editComment} from '../redux/actions/CommentAction';

const widthScreen = Dimensions.get('window').width;

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageEdit: '',
    };
  }

  render() {
    const {storyId, commentId, commentMessage} = this.props;
    return (
      <View style={editCmt.container}>
        <View
          style={{
            flex: 0,
            paddingHorizontal: widthScreen / 35,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.setModalEditComment(false)}>
            <Ionicons
              name="ios-close"
              size={widthScreen / 10}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={editCmt.headerContainer}>
          <Text style={editCmt.headerText}>Edit comment below :</Text>
        </View>
        <View style={editCmt.containerInput} />
        <TextInput
          style={editCmt.inputEdit}
          placeholder="Add a comment..."
          multiline
          maxLength={250}
          selectionColor={colors.grey_v3}
          onChangeText={value => this.setState({messageEdit: value})}
          defaultValue={commentMessage}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={
            this.state.messageEdit !== '' &&
            this.state.messageEdit !== commentMessage
              ? false
              : true
          }
          style={editCmt.containerButton}
          onPress={() =>
            this.props.editComment(
              this.props.auth.userToken,
              commentId,
              this.state.messageEdit,
              storyId,
            )
          }>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: widthScreen / 27,
              letterSpacing: 1,
              color:
                this.state.messageEdit !== '' &&
                this.state.messageEdit !== commentMessage
                  ? colors.darkGreen
                  : colors.grey_v4,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setModalEditComment,
  editComment,
})(EditComment);
