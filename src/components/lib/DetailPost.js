import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';

import {
  setModalDetail,
  setModalMore,
  shareStory,
  likeStory,
} from '../redux/actions/StoryAction';
import {commentStory, setModalComment} from '../redux/actions/CommentAction';
import {colors} from '../css/Colors';
import {modalHeader} from '../css/Styles';
import ModalMore from './ModalMore';
import ModalComment from './ModalComment';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const HEADER_HEIGHT = widthScreen / 6;

class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      storyId: '',
      commentBody: '',
      commentMessage: '',
      commentId: '',
    };
  }

  _renderDetailStory = ({item}) => {
    let checkLike = item.likes.filter(check => {
      return check._id === this.props.auth.userData._id;
    });
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.white,
          marginBottom: heightScreen / 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: widthScreen / 20,
            paddingVertical: widthScreen / 40,
          }}>
          <View
            style={{
              flex: 0,
              justifyContent: 'center',
              marginRight: widthScreen / 20,
            }}>
            <Image
              source={{uri: `${item.author.image}`}}
              style={{
                width: widthScreen / 9,
                height: widthScreen / 9,
                borderRadius: 100,
              }}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: colors.darkGreen,
                  fontFamily: 'Roboto-Medium',
                  fontSize: widthScreen / 32,
                  letterSpacing: 0.5,
                  textTransform: 'capitalize',
                }}>
                {`${item.author.name}`}
              </Text>
              <Text
                style={{
                  marginTop: 1.5,
                  color: colors.black,
                  fontFamily: 'Roboto-Regular',
                  fontSize: widthScreen / 36,
                  letterSpacing: 0.5,
                }}>
                {moment(new Date(item.createdAt))
                  .startOf('minute')
                  .fromNow()}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: colors.black,
                fontFamily: 'Roboto-Regular',
                fontSize: widthScreen / 36,
                letterSpacing: 0.5,
              }}>
              {`${item.category.name}`}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              zIndex: 9000,
              position: 'absolute',
              width: '100%',
              height: heightScreen / 2.5,
              backgroundColor: colors.black,
              opacity: 0.2,
            }}
          />
          <Image
            source={{uri: item.image}}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: heightScreen / 2.5,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: widthScreen / 20,
          }}>
          <View
            style={{
              flex: 0,
              marginRight: widthScreen / 25,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={
                checkLike.length > 0 || this.props.auth.userToken === 'guest'
                  ? true
                  : false
              }
              onPress={() =>
                this.props.likeStory(item._id, this.props.auth.userToken)
              }>
              <AntDesign
                name="heart"
                size={widthScreen / 15}
                color={checkLike.length > 0 ? colors.pink : colors.grey}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: colors.black,
                fontFamily: 'Roboto-Medium',
                fontSize: widthScreen / 30,
                letterSpacing: 0.5,
              }}>
              {`  ${item.likes.length}`}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginRight: widthScreen / 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Ionicons
              name="ios-chatbubbles"
              size={widthScreen / 14}
              color={colors.grey}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: colors.black,
                fontFamily: 'Roboto-Medium',
                fontSize: widthScreen / 30,
                letterSpacing: 1,
              }}>
              {`  ${item.comments.length}`}
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                this.props.shareStory(
                  item.author.name,
                  item.location,
                  item.title,
                  item.body,
                )
              }>
              <Ionicons
                name="md-share"
                size={widthScreen / 14}
                color={colors.grey}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: widthScreen / 20,
            paddingBottom: widthScreen / 100,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Roboto-Medium',
                fontSize: widthScreen / 32,
                letterSpacing: 0.5,
                textTransform: 'capitalize',
              }}>
              {item.title}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: widthScreen / 20,
            paddingBottom: widthScreen / 30,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.grey_v4,
                fontFamily: 'Roboto-Italic',
                fontSize: widthScreen / 32,
                letterSpacing: 0.5,
                textTransform: 'capitalize',
              }}>
              {`${item.location.name}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: widthScreen / 20,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Roboto-Regular',
                fontSize: widthScreen / 32,
                letterSpacing: 0.5,
                textAlign: 'justify',
                lineHeight: widthScreen / 20,
              }}>
              {item.body}
            </Text>
          </View>
        </View>
        {item.comments.length > 0 && (
          <View>
            <View
              style={{
                flex: 0,
                height: 1.5,
                backgroundColor: colors.grey_v2,
                marginTop: widthScreen / 40,
                marginBottom: widthScreen / 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingHorizontal: widthScreen / 70,
                  backgroundColor: colors.white,
                  color: colors.grey,
                  fontFamily: 'Roboto-Italic',
                  fontSize: widthScreen / 36,
                  letterSpacing: 0.5,
                }}>
                Comments
              </Text>
            </View>
            {item.comments.map((showComment, indexComment) => {
              return (
                <TouchableOpacity
                  disabled={
                    showComment.commenter._id === this.props.auth.userData._id
                      ? false
                      : true
                  }
                  activeOpacity={0.5}
                  key={indexComment}
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: widthScreen / 20,
                  }}
                  onPress={() =>
                    this._setDataModal(
                      item._id,
                      showComment._id,
                      showComment.message,
                    )
                  }>
                  {indexComment > 0 && (
                    <View
                      style={{
                        flex: 0,
                        height: 0.5,
                        backgroundColor: colors.grey_v2,
                        marginBottom: widthScreen / 40,
                        marginTop: widthScreen / 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  )}
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: showComment.commenter.image}}
                      style={{
                        flex: 0,
                        width: widthScreen / 10,
                        height: widthScreen / 10,
                        borderRadius: 100,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: colors.black,
                            fontFamily: 'Roboto-Medium',
                            fontSize: widthScreen / 36,
                            letterSpacing: 0.5,
                          }}>
                          {showComment.commenter.name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 2,
                            color: colors.black,
                            fontFamily: 'Roboto-Regular',
                            fontSize: widthScreen / 45,
                            letterSpacing: 0.5,
                          }}>
                          {moment(new Date(showComment.createdAt))
                            .startOf('minute')
                            .fromNow()}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: colors.black,
                          fontFamily: 'Roboto-Regular',
                          fontSize: widthScreen / 36,
                          letterSpacing: 0.5,
                        }}>
                        {showComment.message}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  _setDataModal = (idStory, idComment, message) => {
    this.setState({
      storyId: idStory,
      commentId: idComment,
      commentMessage: message,
    });
    this.props.setModalComment(true);
  };

  render() {
    const scrollY = Animated.add(this.state.scrollY, 0);
    const diffClampScrollY = Animated.diffClamp(
      scrollY,
      -HEADER_HEIGHT,
      HEADER_HEIGHT,
    );
    const headerTranslate = diffClampScrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    const {userToken, userData} = this.props.auth;
    const {detailStory, commentFocus, modalMore} = this.props.story;
    const {commentModal} = this.props.comment;

    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Animated.View
          style={{
            zIndex: 55,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            elevation: 2,
            height: heightScreen / 12,
            backgroundColor: colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: widthScreen / 20,
            transform: [{translateY: headerTranslate}],
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.setModalDetail(false)}>
            <View style={{flex: 0}}>
              <Ionicons
                name="ios-close"
                size={widthScreen / 10}
                color={colors.black}
              />
            </View>
          </TouchableOpacity>
          <View style={modalHeader.containerText}>
            <Text style={modalHeader.textHeader}>Story</Text>
          </View>
          {detailStory[0].author._id === userData._id && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.setModalMore(true)}>
              <View
                style={{
                  flex: 0,
                  paddingLeft: widthScreen / 20,
                }}>
                <Ionicons
                  name="md-more"
                  size={widthScreen / 14}
                  color={colors.darkGreen}
                />
              </View>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.FlatList
          contentContainerStyle={{paddingTop: widthScreen / 6}}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          data={detailStory}
          renderItem={({item}) => this._renderDetailStory({item})}
          keyExtractor={(item, index) => index.toString()}
        />
        {userToken !== 'guest' && (
          <View
            style={{
              flex: 0,
              elevation: 5,
              backgroundColor: colors.white,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <TextInput
                ref={input => {
                  this.textComment = input;
                }}
                autoFocus={commentFocus === true ? true : false}
                style={{
                  color: colors.black,
                  paddingHorizontal: widthScreen / 20,
                  fontSize: widthScreen / 26,
                  fontFamily: 'Roboto-Regular',
                }}
                placeholder="Add a comment..."
                multiline
                maxLength={250}
                selectionColor={colors.grey_v3}
                onChangeText={value => this.setState({commentBody: value})}
              />
            </View>
            <View
              style={{
                flex: 0,
                borderLeftWidth: 1,
                borderColor: colors.grey_v3,
              }}
            />
            <View
              style={{
                flex: 0,
                paddingHorizontal: widthScreen / 20,
                justifyContent: 'flex-end',
                bottom: heightScreen / 90,
              }}>
              <TouchableOpacity
                disabled={this.state.commentBody === '' ? true : false}
                onPress={() =>
                  this.props
                    .commentStory(
                      userToken,
                      this.state.commentBody,
                      detailStory[0]._id,
                    )
                    .then(() => {
                      this.textComment.clear();
                      this.setState({commentBody: ''});
                    })
                }>
                <Ionicons
                  style={{right: 1}}
                  name="ios-paper-plane"
                  size={widthScreen / 12}
                  color={
                    this.state.commentBody === ''
                      ? colors.grey_v4
                      : colors.darkGreen
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Modal
          animationIn="fadeIn"
          animationInTiming={300}
          animationOut="fadeOut"
          animationOutTiming={300}
          isVisible={modalMore}
          backdropOpacity={0.2}
          onBackdropPress={() => this.props.setModalMore(false)}
          onBackButtonPress={() => this.props.setModalMore(false)}>
          <ModalMore dataStory={detailStory} />
        </Modal>
        <Modal
          animationIn="fadeIn"
          animationInTiming={300}
          animationOut="fadeOut"
          animationOutTiming={300}
          isVisible={commentModal}
          backdropOpacity={0.2}
          onBackdropPress={() => this.props.setModalComment(false)}
          onBackButtonPress={() => this.props.setModalComment(false)}>
          <ModalComment
            storyId={this.state.storyId}
            commentId={this.state.commentId}
            commentMessage={this.state.commentMessage}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.story,
  comment: state.comment,
});

export default connect(mapStateToProps, {
  setModalDetail,
  commentStory,
  setModalMore,
  shareStory,
  likeStory,
  setModalComment,
})(DetailPost);
