import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {NavigationEvents} from 'react-navigation';
import {DotIndicator} from 'react-native-indicators';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {colors} from '../../css/Colors';
import {
  storyByCategory,
  setModalDetail,
  checkCommentFocus,
  storyById,
} from '../../redux/actions/StoryAction';
import {
  getAllArticle,
  showDetailArticle,
  articleById,
  showModalSearch,
} from '../../redux/actions/ArticleAction';
import DetailArticle from './DetailArticle';
import DetailPost from '../../lib/DetailPost';
import Search from '../../lib/Search';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const HEADER_HEIGHT = widthScreen / 6;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      idArticle: '',
      segmentIndex: 0,
      loadingData: [{dataId: 1, dataName: 'name'}],
      loadingComponent: false,
    };
  }

  _segmentSelectedIndex = async (index, arr) => {
    this.setState(prevState => ({...prevState, segmentIndex: index}));
    if (index > 0) {
      this.setState({loadingComponent: true});
      let findIdCategory = await this.props.story.categoryCreate.filter(
        value => {
          return value.name === arr[index - 1];
        },
      );
      await this.props.storyByCategory(findIdCategory[0]._id);
      this.setState({loadingComponent: false});
    } else {
      this.setState({loadingComponent: true});
      await this.props.getAllArticle();
      this.setState({loadingComponent: false});
    }
  };

  _showDetailArticle = async idArticle => {
    this.setState({idArticle: idArticle});
    await this.props.articleById(idArticle);
    this.props.showDetailArticle(true);
  };

  _showDetailPost = async (idStory, comment) => {
    await this.props.storyById(idStory);
    await this.props.checkCommentFocus(comment);
    this.props.setModalDetail(true);
  };

  render() {
    const scrollY = Animated.add(this.state.scrollY, 0);
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    const {segmentIndex} = this.state;
    const {categoryCreate, storyCategory, modalDetail} = this.props.story;
    const {detailArticle, allArticles, modalSearch} = this.props.article;
    let arrCat = [];
    categoryCreate.map(cat => {
      return cat.name === 'Other'
        ? arrCat.push(cat.name)
        : arrCat.unshift(cat.name);
    });

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
          stickyHeaderIndices={[0]}
          contentContainerStyle={{paddingTop: widthScreen / 6}}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <ScrollView
              contentContainerStyle={{
                flex: 0,
                marginBottom: widthScreen / 20,
                backgroundColor: colors.white,
                elevation: 2,
              }}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <SegmentedControlTab
                values={['Article', ...arrCat]}
                selectedIndex={segmentIndex}
                onTabPress={segmentIndex =>
                  this._segmentSelectedIndex(segmentIndex, arrCat)
                }
                borderRadius={0}
                tabsContainerStyle={{
                  height: heightScreen / 15,
                  width: widthScreen * 2 - widthScreen / 2,
                  backgroundColor: colors.white,
                }}
                tabStyle={{
                  backgroundColor: colors.white,
                  borderWidth: 0,
                  borderColor: 'transparent',
                }}
                tabTextStyle={{
                  letterSpacing: 0.5,
                  color: colors.grey_v4,
                  fontFamily: 'Roboto-Medium',
                  fontSize: widthScreen / 28,
                }}
                activeTabStyle={{
                  backgroundColor: colors.white,
                  borderBottomWidth: 3,
                  borderBottomColor: colors.darkGreen,
                }}
                activeTabTextStyle={{
                  color: colors.darkGreen,
                }}
              />
            </ScrollView>
          }
          data={
            this.state.loadingComponent === true
              ? this.state.loadingData
              : segmentIndex === 0
              ? allArticles
              : storyCategory
          }
          renderItem={({item, index}) =>
            this.state.loadingComponent !== true ? (
              segmentIndex === 0 ? (
                <View
                  style={{
                    flex: 0,
                    backgroundColor: colors.white,
                    paddingHorizontal: widthScreen / 20,
                  }}>
                  <TouchableOpacity
                    style={{paddingBottom: widthScreen / 20}}
                    activeOpacity={0.8}
                    onPress={() => this._showDetailArticle(item._id)}>
                    <ImageBackground
                      source={{uri: item.image}}
                      style={{
                        justifyContent: 'flex-end',
                        width: '100%',
                        height: heightScreen / 3,
                        borderRadius: 10,
                        overflow: 'hidden',
                        elevation: 2,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: heightScreen / 2,
                          backgroundColor: colors.black,
                          opacity: 0.2,
                          borderRadius: 10,
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: colors.yellow,
                          borderBottomLeftRadius: 10,
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          paddingVertical: widthScreen / 40,
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: widthScreen / 20,
                            textAlign: 'center',
                            color: colors.white,
                            opacity: 0.8,
                            fontSize: widthScreen / 32,
                            fontFamily: 'Roboto-Bold',
                            letterSpacing: 1,
                          }}>
                          Article
                        </Text>
                      </View>
                      {item.tags.length > 0 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            paddingHorizontal: widthScreen / 17,
                          }}>
                          {item.tags.map((tags, ind) => {
                            return (
                              <View key={ind}>
                                <Text
                                  numberOfLines={1}
                                  key={ind}
                                  style={{
                                    opacity: 0.8,
                                    bottom: heightScreen / 14,
                                    color: colors.white,
                                    fontSize: widthScreen / 32,
                                    fontFamily: 'Roboto-Regular',
                                    letterSpacing: 1,
                                    textShadowColor: colors.statusbar,
                                    textShadowOffset: {width: -1, height: 1},
                                    textShadowRadius: 10,
                                    textTransform: 'capitalize',
                                  }}>
                                  {`#${tags.name} `}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      )}
                      <Text
                        numberOfLines={1}
                        style={{
                          textAlign: 'left',
                          paddingHorizontal: widthScreen / 20,
                          opacity: 0.8,
                          bottom: heightScreen / 30,
                          position: 'absolute',
                          color: colors.white,
                          fontSize: widthScreen / 24,
                          fontFamily: 'Roboto-Black',
                          letterSpacing: 1,
                          textTransform: 'capitalize',
                          textShadowColor: colors.statusbar,
                          textShadowOffset: {width: -1, height: 1},
                          textShadowRadius: 10,
                        }}>
                        {` ${item.title} `}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              ) : (
                segmentIndex > 0 && (
                  <View
                    style={{
                      flex: 0,
                      backgroundColor: colors.white,
                      paddingHorizontal: widthScreen / 20,
                    }}>
                    <TouchableOpacity
                      style={{paddingBottom: widthScreen / 20}}
                      activeOpacity={0.8}
                      onPress={() => this._showDetailPost(item._id, false)}>
                      <ImageBackground
                        source={{uri: item.image}}
                        style={{
                          justifyContent: 'flex-end',
                          width: '100%',
                          height: heightScreen / 3,
                          borderRadius: 10,
                          overflow: 'hidden',
                          elevation: 2,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            height: heightScreen / 2,
                            backgroundColor: colors.black,
                            opacity: 0.2,
                            borderRadius: 10,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            paddingHorizontal: widthScreen / 17,
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              opacity: 0.8,
                              bottom: heightScreen / 10,
                              color: colors.white,
                              fontSize: widthScreen / 32,
                              fontFamily: 'Roboto-Medium',
                              letterSpacing: 1,
                              textTransform: 'capitalize',
                              textShadowColor: colors.statusbar,
                              textShadowOffset: {width: -1, height: 1},
                              textShadowRadius: 10,
                            }}>
                            {`${item.author.name}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            paddingHorizontal: widthScreen / 17,
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              opacity: 0.8,
                              bottom: heightScreen / 14,
                              color: colors.white,
                              fontSize: widthScreen / 32,
                              fontFamily: 'Roboto-Regular',
                              letterSpacing: 1,
                              textTransform: 'capitalize',
                              textShadowColor: colors.statusbar,
                              textShadowOffset: {width: -1, height: 1},
                              textShadowRadius: 10,
                            }}>
                            {`${item.location.name} `}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: colors.yellow,
                            borderBottomLeftRadius: 10,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            paddingVertical: widthScreen / 40,
                          }}>
                          <Text
                            style={{
                              paddingHorizontal: widthScreen / 20,
                              textAlign: 'center',
                              color: colors.white,
                              opacity: 0.8,
                              textTransform: 'capitalize',
                              fontSize: widthScreen / 32,
                              fontFamily: 'Roboto-Bold',
                              letterSpacing: 1,
                            }}>
                            {item.category.name}
                          </Text>
                        </View>
                        <Text
                          numberOfLines={1}
                          style={{
                            textAlign: 'left',
                            paddingHorizontal: widthScreen / 20,
                            opacity: 0.8,
                            bottom: heightScreen / 30,
                            position: 'absolute',
                            color: colors.white,
                            fontSize: widthScreen / 24,
                            fontFamily: 'Roboto-Black',
                            letterSpacing: 1,
                            textShadowColor: colors.statusbar,
                            textShadowOffset: {width: -1, height: 1},
                            textShadowRadius: 10,
                            textTransform: 'capitalize',
                          }}>
                          {` ${item.title} `}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                )
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  height: heightScreen / 1.5,
                  backgroundColor: colors.white,
                }}>
                <DotIndicator
                  size={widthScreen / 40}
                  color={colors.darkGreen}
                  count={3}
                />
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
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
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={detailArticle}
          onBackButtonPress={() => this.props.showDetailArticle(false)}>
          <DetailArticle idArticle={this.state.idArticle} />
        </Modal>
        <Modal
          style={{margin: 0}}
          hasBackdrop={false}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={modalDetail}
          onBackButtonPress={() => this.props.setModalDetail(false)}>
          <DetailPost />
        </Modal>
        <NavigationEvents
          onDidFocus={() =>
            this._segmentSelectedIndex(this.state.segmentIndex, arrCat)
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
  article: state.article,
});

export default connect(mapStateToProps, {
  getAllArticle,
  storyByCategory,
  showDetailArticle,
  articleById,
  setModalDetail,
  checkCommentFocus,
  storyById,
  showModalSearch,
})(Content);
