import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {DotIndicator} from 'react-native-indicators';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {colors} from '../../css/Colors';
import {profile} from '../../css/Styles';
import Loading from '../../lib/Loading';
import {
  moreUserStory,
  storyById,
  setModalDetail,
  checkCommentFocus,
  setModalCreate,
} from '../../redux/actions/StoryAction';

const widthScreen = Dimensions.get('window').width;
const HEADER_HEIGHT = widthScreen / 5;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  _renderHeaderUser = userData => {
    return (
      <View style={{flex: 0}}>
        <View style={profile.containerHeader}>
          <View style={profile.headerComponent}>
            <View style={profile.headerImgContainer}>
              <Image source={{uri: userData.image}} style={profile.imgHeader} />
            </View>
            <View style={profile.containerIntroduce}>
              <Text style={profile.textHello}>Hello,</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={profile.textName}>
                {userData.name}
              </Text>
            </View>
          </View>
          <View style={profile.containerDetail}>
            <View style={profile.detailComponent}>
              <Text style={profile.textUsername}>
                {`@${userData.username}`}
              </Text>
              {userData.bio !== undefined && userData.bio !== '' && (
                <Text style={profile.textBio}>{userData.bio}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={{backgroundColor: colors.grey_v2, paddingBottom: 8}} />
      </View>
    );
  };

  _emptyStoryUSer = () => {
    return (
      <View style={profile.containerEmpty}>
        <TouchableOpacity
          onPress={() => this.props.setModalCreate(true)}
          activeOpacity={0.5}>
          <Text style={profile.textEmpty}>Create your first story!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderStoryUser = ({item, index}) => {
    return (
      <View style={{flex: 0}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            {width: widthScreen / 3},
            {height: widthScreen / 3},
            {marginBottom: 2},
            index % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
          ]}
          onPress={() => this._showDetailUserStory(item._id, false)}>
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={profile.imgStory}
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderFooterUser = () => {
    return (
      <View style={profile.footerContainer}>
        <DotIndicator
          size={widthScreen / 40}
          color={colors.darkGreen}
          count={3}
        />
      </View>
    );
  };

  _showDetailUserStory = async (idStory, comment) => {
    await this.props.storyById(idStory);
    await this.props.checkCommentFocus(comment);
    this.props.setModalDetail(true);
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
    const {userData, loadingProfile} = this.props.auth;
    const {userStory, moreUserStory, pageUserStory} = this.props.story;

    if (loadingProfile === true) {
      return <Loading />;
    }
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
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
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: colors.black,
                  fontFamily: 'Roboto-Medium',
                  fontSize: widthScreen / 20,
                }}>
                My Profile
              </Text>
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{flex: 0}}
              activeOpacity={0.6}
              onPress={() => this.props.navigation.navigate('Edit')}>
              <SimpleLineIcons
                name="settings"
                color={colors.black}
                size={widthScreen / 14}
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
          showsVerticalScrollIndicator={false}
          numColumns={3}
          ListHeaderComponent={() => this._renderHeaderUser(userData)}
          data={userStory}
          ListEmptyComponent={this._emptyStoryUSer}
          renderItem={({item, index}) => this._renderStoryUser({item, index})}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={
            moreUserStory !== false &&
            (() =>
              this.props.moreUserStory(
                this.props.auth.userToken,
                pageUserStory,
              ))
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            moreUserStory !== false && this._renderFooterUser
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.story,
});

export default connect(mapStateToProps, {
  moreUserStory,
  storyById,
  setModalDetail,
  checkCommentFocus,
  setModalCreate,
})(Profile);
