import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import Modal from 'react-native-modal';

import {colors} from '../../css/Colors';
import {articleStyle} from '../../css/Styles';
import ModalArticle from '../../lib/ModalArticle';
import {
  showDetailArticle,
  shareArticle,
  likeArticle,
} from '../../redux/actions/ArticleAction';
import {
  commentArticle,
  setModalArticle,
} from '../../redux/actions/CommentAction';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const HEADER_MAX_HEIGTH = heightScreen / 2.5;
const HEADER_MIN_HEIGTH = heightScreen / 12;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGTH - HEADER_MIN_HEIGTH;

class DetailArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      cmtArticle: '',
      articleId: '',
      articleCommentId: '',
      articleCommentMessage: '',
    };
  }

  _renderDetailArticle = ({item}) => {
    let checkLike = item.likes.filter(check => {
      return check._id === this.props.auth.userData._id;
    });
    return (
      <View style={articleStyle.detailContainer}>
        {/* <View>
          <View style={articleStyle.imageArticleContainer} />
          <Image source={{uri: item.image}} style={articleStyle.imageArticle} />
        </View> */}
        <View style={articleStyle.btnArticleContainer}>
          <View style={articleStyle.btnLikeArticle}>
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={
                checkLike.length > 0 || this.props.auth.userToken === 'guest'
                  ? true
                  : false
              }
              onPress={() =>
                this.props.likeArticle(
                  this.props.idArticle,
                  this.props.auth.userToken,
                )
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
              style={articleStyle.btnText}>
              {`  ${item.likes.length}`}
            </Text>
          </View>
          <View style={articleStyle.btnCommentArticle}>
            <Ionicons
              name="ios-chatbubbles"
              size={widthScreen / 14}
              color={colors.grey}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={articleStyle.btnText}>
              {`  ${item.comments.length}`}
            </Text>
          </View>
          <View style={articleStyle.btnShareArticle}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.props.shareArticle(item.title, item.body)}>
              <Ionicons
                name="md-share"
                size={widthScreen / 14}
                color={colors.grey}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: widthScreen / 20}}>
          <View style={{flex: 1}}>
            <Text style={articleStyle.textTitle}>{item.title}</Text>
          </View>
        </View>
        {item.tags.length > 0 && (
          <View style={articleStyle.tagContainer}>
            {item.tags.map((tags, ind) => {
              return (
                <View style={{flex: 0, paddingRight: 10}} key={ind}>
                  <Text style={articleStyle.textTag}>{`#${tags.name}`}</Text>
                </View>
              );
            })}
          </View>
        )}
        <View style={articleStyle.bodyContainer}>
          <View style={{flex: 1}}>
            <Text style={articleStyle.textBody}>{item.body}</Text>
          </View>
        </View>
        {item.comments.length > 0 && (
          <View>
            <View style={articleStyle.separatorArticle}>
              <Text style={articleStyle.textSeparator}>Comments</Text>
            </View>
            {item.comments.map((showComment, ind) => {
              return (
                <TouchableOpacity
                  disabled={
                    showComment.commenter._id === this.props.auth.userData._id
                      ? false
                      : true
                  }
                  activeOpacity={0.5}
                  key={ind}
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: widthScreen / 20,
                  }}
                  onPress={() =>
                    this._setDataModalArticle(
                      this.props.idArticle,
                      showComment._id,
                      showComment.message,
                    )
                  }>
                  {ind > 0 && <View style={articleStyle.separatorComment} />}
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: showComment.commenter.image}}
                      style={articleStyle.imageProfilComment}
                    />
                    <View style={articleStyle.containerHeaderComment}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text style={articleStyle.textComment}>
                          {showComment.commenter.name}
                        </Text>
                        <Text style={articleStyle.textMoment}>
                          {moment(new Date(showComment.createdAt))
                            .startOf('minute')
                            .fromNow()}
                        </Text>
                      </View>
                      <Text style={articleStyle.textMessage}>
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

  _setDataModalArticle = (idArticleParam, idCommentParam, messageParam) => {
    this.setState({
      articleId: idArticleParam,
      articleCommentId: idCommentParam,
      articleCommentMessage: messageParam,
    });
    this.props.setModalArticle(true);
  };

  render() {
    const scrollY = Animated.add(this.state.scrollY, 0);
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageCoverOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0.2, 0.2, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [-500, -500, 14.5],
      extrapolate: 'clamp',
    });

    const {userToken} = this.props.auth;
    const {articleById} = this.props.article;
    const {articleModal} = this.props.comment;

    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Animated.FlatList
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGTH}}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollBegin={e => console.log(e)}
          contentInset={{
            top: HEADER_MAX_HEIGTH,
          }}
          contentOffset={{y: -HEADER_MAX_HEIGTH}}
          data={[articleById]}
          renderItem={({item}) => this._renderDetailArticle({item})}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 9000,
            elevation: 2,
            top: 0,
            height: heightScreen / 12,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            padding: widthScreen / 40,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: widthScreen / 30,
              backgroundColor: colors.whiteOpacity_v2,
              borderRadius: 100,
            }}
            activeOpacity={0.5}
            onPress={() => this.props.showDetailArticle(false)}>
            <Ionicons
              name="ios-close"
              size={widthScreen / 10}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <Animated.View
          pointerEvents="none"
          style={[
            {
              top: 0,
              left: 0,
              right: 0,
              overflow: 'hidden',
              position: 'absolute',
              height: HEADER_MAX_HEIGTH,
              backgroundColor: colors.white,
              elevation: 2,
            },
            {transform: [{translateY: headerTranslate}]},
          ]}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '100%',
                height: heightScreen / 2.5,
                backgroundColor: colors.black,
                elevation: 2,
              },
              {
                opacity: imageCoverOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
          />
          <Animated.Image
            style={[
              {
                top: 0,
                left: 0,
                right: 0,
                width: null,
                resizeMode: 'cover',
                position: 'absolute',
                height: HEADER_MAX_HEIGTH,
              },
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={{uri: articleById.image}}
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              top: 0,
              left: 0,
              right: 0,
              overflow: 'hidden',
              position: 'absolute',
              backgroundColor: 'transparent',
              marginHorizontal: widthScreen / 20,
              elevation: 2,
            },
            {
              transform: [{scale: titleScale}, {translateY: titleTranslate}],
            },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              {
                color: colors.black,
                fontFamily: 'Roboto-Medium',
                fontSize: widthScreen / 20,
                marginLeft: widthScreen / 10,
              },
            ]}>
            {articleById.title}
          </Text>
        </Animated.View>

        {userToken !== 'guest' && (
          <View style={articleStyle.commentArticleContainer}>
            <View style={{flex: 1}}>
              <TextInput
                ref={input => {
                  this.textCommentArticle = input;
                }}
                style={articleStyle.textInputCommentArticle}
                placeholder="Add a comment..."
                multiline
                maxLength={250}
                selectionColor={colors.grey_v3}
                onChangeText={value => this.setState({cmtArticle: value})}
              />
            </View>
            <View style={articleStyle.borderComment} />
            <View style={articleStyle.btnComment}>
              <TouchableOpacity
                disabled={this.state.cmtArticle === '' ? true : false}
                onPress={() =>
                  this.props
                    .commentArticle(
                      userToken,
                      this.state.cmtArticle,
                      this.props.idArticle,
                    )
                    .then(() => {
                      this.textCommentArticle.clear();
                      this.setState({cmtArticle: ''});
                    })
                }>
                <Ionicons
                  style={{right: 1}}
                  name="ios-paper-plane"
                  size={widthScreen / 12}
                  color={
                    this.state.cmtArticle === ''
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
          isVisible={articleModal}
          backdropOpacity={0.2}
          onBackdropPress={() => this.props.setModalArticle(false)}
          onBackButtonPress={() => this.props.setModalArticle(false)}>
          <ModalArticle
            articleId={this.state.articleId}
            articleCommentId={this.state.articleCommentId}
            articleCommentMessage={this.state.articleCommentMessage}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  article: state.article,
  comment: state.comment,
});

export default connect(mapStateToProps, {
  showDetailArticle,
  shareArticle,
  likeArticle,
  commentArticle,
  setModalArticle,
})(DetailArticle);
