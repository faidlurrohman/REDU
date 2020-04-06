import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import moment from 'moment';
import {DotIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';

import DetailArticle from '../content/DetailArticle';
import ButtonAdd from '../../lib/ButtonAdd';
import {colors} from '../../css/Colors';
import DetailPost from '../../lib/DetailPost';
import Loading from '../../lib/Loading';
import Search from '../../lib/Search';
import {
  moreAllStory,
  checkCommentFocus,
  storyById,
  setModalDetail,
  likeStory,
} from '../../redux/actions/StoryAction';
import {
  showDetailArticle,
  articleById,
  showModalSearch,
} from '../../redux/actions/ArticleAction';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const HEADER_HEIGHT = widthScreen / 5;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idArticle: '',
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount = async () => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.statusbar);
    StatusBar.setTranslucent(true);
  };

  _renderHeader = articles => {
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.white,
          elevation: 1,
          marginBottom: heightScreen / 80,
        }}>
        <View style={{flex: 0}}>
          <View
            style={{
              flex: 0,
              height: heightScreen / 2.5,
            }}>
            <Swiper
              autoplayTimeout={5}
              showsButtons={false}
              autoplay={true}
              loop={true}
              paginationStyle={{
                bottom: widthScreen / 30,
                left: widthScreen / 30,
                right: null,
              }}
              dot={
                <View
                  style={{
                    backgroundColor: colors.grey_v3,
                    width: widthScreen / 35,
                    height: widthScreen / 70,
                    marginLeft: 4,
                    marginRight: 4,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: colors.white,
                    width: widthScreen / 20,
                    height: widthScreen / 70,
                    marginLeft: 4,
                    marginRight: 4,
                  }}
                />
              }>
              {articles.slice(0, 5).map((res, ind) => {
                return (
                  <TouchableOpacity
                    key={ind}
                    activeOpacity={0.9}
                    onPress={() => this._showDetailArticle(res._id)}>
                    <ImageBackground
                      source={{uri: res.image}}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: heightScreen / 2.5,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: heightScreen / 2.5,
                          backgroundColor: colors.black,
                          opacity: 0.2,
                        }}
                      />
                      <Text
                        numberOfLines={2}
                        style={{
                          textAlign: 'center',
                          paddingHorizontal: widthScreen / 20,
                          opacity: 0.8,
                          position: 'absolute',
                          color: colors.white,
                          fontSize: widthScreen / 18,
                          fontFamily: 'Roboto-Black',
                          letterSpacing: 3,
                          textTransform: 'uppercase',
                          textShadowColor: colors.statusbar,
                          textShadowOffset: {width: -1, height: 1},
                          textShadowRadius: 10,
                        }}>
                        {` ${res.title} `}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          </View>
        </View>
      </View>
    );
  };

  _renderStory = ({item}, userToken) => {
    let checkLike = item.likes.filter(check => {
      return check._id === this.props.auth.userData._id;
    });
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.white,
          elevation: 1,
          marginBottom: heightScreen / 80,
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
              {`${item.location.name}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this._showDetailPost(item._id, false)}>
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
            source={{uri: `${item.image}`}}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: heightScreen / 2.5,
            }}
          />
        </TouchableOpacity>
        {userToken !== 'guest' && (
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              paddingHorizontal: widthScreen / 20,
              paddingVertical: widthScreen / 40,
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
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._showDetailPost(item._id, true)}>
                <Ionicons
                  name="ios-chatbubbles"
                  size={widthScreen / 14}
                  color={colors.grey}
                />
              </TouchableOpacity>
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
          </View>
        )}
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View
        style={{
          marginTop: heightScreen / 40,
          marginBottom: heightScreen / 35,
        }}>
        <DotIndicator
          size={widthScreen / 40}
          color={colors.darkGreen}
          count={3}
        />
      </View>
    );
  };

  _showDetailPost = async (idStory, comment) => {
    await this.props.storyById(idStory);
    await this.props.checkCommentFocus(comment);
    this.props.setModalDetail(true);
  };

  _showDetailArticle = async idArticle => {
    this.setState({idArticle: idArticle});
    await this.props.articleById(idArticle);
    this.props.showDetailArticle(true);
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
    const {userToken} = this.props.auth;
    const {
      loadingHome,
      allStory,
      moreAll,
      pageAll,
      modalDetail,
    } = this.props.story;
    const {allArticles, detailArticle, modalSearch} = this.props.article;

    if (loadingHome === true) {
      return <Loading />;
    }
    return (
      <View style={{flex: 1, backgroundColor: colors.grey_v2}}>
        <View
          style={{
            zIndex: 55,
            backgroundColor: colors.white,
            height: StatusBar.currentHeight,
          }}
        />
        <Animated.View
          style={{
            zIndex: 50,
            position: 'absolute',
            overflow: 'hidden',
            top: StatusBar.currentHeight,
            left: 0,
            right: 0,
            height: HEADER_HEIGHT,
            transform: [{translateY: headerTranslate}],
          }}>
          <View
            style={{
              elevation: 2,
              height: widthScreen / 6,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.white,
              paddingHorizontal: widthScreen / 20,
            }}>
            <TouchableOpacity
              style={{flex: 0}}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Image
                source={require('../../../assets/images/logoText2.png')}
                style={{
                  resizeMode: 'contain',
                  width: widthScreen / 3,
                  height: heightScreen / 4,
                }}
              />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{flex: 0}}
              activeOpacity={0.6}
              onPress={() => this.props.showModalSearch(true)}>
              <Fontisto
                name="search"
                color={colors.darkGreen}
                size={widthScreen / 16}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.FlatList
          contentContainerStyle={{paddingTop: widthScreen / 6}}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          ListHeaderComponent={() => this._renderHeader(allArticles)}
          data={allStory}
          renderItem={({item}) => this._renderStory({item}, userToken)}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={
            moreAll !== false && (() => this.props.moreAllStory(pageAll))
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={moreAll !== false && this._renderFooter}
        />
        {userToken !== 'guest' && <ButtonAdd />}
        <Modal
          hasBackdrop={false}
          animationIn="fadeInUp"
          animationInTiming={300}
          animationOut="fadeOutDown"
          animationOutTiming={300}
          isVisible={modalSearch}
          style={{margin: 0}}
          onBackButtonPress={() => this.props.showModalSearch(false)}>
          <Search />
        </Modal>
        <Modal
          style={{margin: 0}}
          hasBackdrop={false}
          animationIn="fadeInUp"
          animationInTiming={300}
          animationOut="fadeOutDown"
          animationOutTiming={300}
          isVisible={modalDetail}
          onBackButtonPress={() => this.props.setModalDetail(false)}>
          <DetailPost />
        </Modal>
        <Modal
          style={{margin: 0}}
          hasBackdrop={false}
          animationIn="fadeInUp"
          animationInTiming={300}
          animationOut="fadeOutDown"
          animationOutTiming={300}
          isVisible={detailArticle}
          onBackButtonPress={() => this.props.showDetailArticle(false)}>
          <DetailArticle idArticle={this.state.idArticle} />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.story,
  article: state.article,
});

export default connect(mapStateToProps, {
  moreAllStory,
  checkCommentFocus,
  storyById,
  setModalDetail,
  likeStory,
  showDetailArticle,
  articleById,
  showModalSearch,
})(Home);
