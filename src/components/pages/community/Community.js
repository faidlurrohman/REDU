import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {showModalSearch} from '../../redux/actions/ArticleAction';
import {colors} from '../../css/Colors';
import {community} from '../../css/Styles';
import Search from '../../lib/Search';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const HEADER_HEIGHT = widthScreen / 5;

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      community: [
        {
          ind: 0,
          name: 'Historia Indonesia',
          image:
            'https://www.komunitashistoria.com/media/39a787a489265b372b3e75cd0d622c59.jpeg.700x600_q85_upscale.jpg',
          url: 'https://www.komunitashistoria.com/',
        },
        {
          ind: 1,
          name: 'Girls Love Travel',
          image:
            'https://lp-cms-production.imgix.net/features/2018/07/FLT_travel-2ab65f2a3947.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4&w=1446',
          url: 'https://girlslovetravel.org/',
        },
        {
          ind: 2,
          name: 'Facebook Liburan Murah',
          image:
            'https://scontent.fcgk4-2.fna.fbcdn.net/v/t1.0-9/s960x960/70270432_10219580814415557_7994030514157649920_o.jpg?_nc_cat=104&_nc_sid=ca434c&_nc_eui2=AeHrhlUTR7WEUsO-VYY3T6CpkOs7ehpjpEL2bPoNUMSDripeltSeEWkNyG5O4zrbzyTx3kb42_EZCw3F9_dgsU6T1U1w0RszH_75ItFXyuzWiQ&_nc_ohc=lHLocop5h4IAX-630Ym&_nc_ht=scontent.fcgk4-2.fna&_nc_tp=7&oh=1c4510f663ef5f1a0fce269dcdca7a0a&oe=5E9B57FB',
          url: 'https://web.facebook.com/groups/liburanmurah/?_rdc=1&_rdr',
        },
        {
          ind: 3,
          name: 'Couchsurfing Indonesia',
          image:
            'https://www.goodnewsfromindonesia.id/wp-content/uploads/images/source/ladygathgath/couchsurfingguest1.jpg',
          url: 'https://www.couchsurfing.com/places/indonesia',
        },
        {
          ind: 4,
          name: 'Thorntree and Lonely Planet',
          image:
            'https://lp-cms-production.imgix.net/features/2018/07/GettyImages-836547020-a9c0813d1f13.jpg?auto=format&fit=crop&q=40&sharp=10&vib=20&ixlib=react-8.6.4&w=1446',
          url: 'https://www.lonelyplanet.com/thorntree/welcome',
        },
      ],
    };
  }

  _renderCommunty = ({item}) => {
    return (
      <View style={community.container}>
        <ImageBackground source={{uri: item.image}} style={community.imgBgr}>
          <View style={community.bgrOpa} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={community.btnJoin}
            onPress={() => {
              Linking.openURL(item.url);
            }}>
            <Text style={community.textJoin}>Join Now!</Text>
          </TouchableOpacity>
          <Text numberOfLines={2} style={community.textCommunity}>
            {` Community `}
          </Text>
          <Text numberOfLines={2} style={community.textName}>
            {` ${item.name} `}
          </Text>
        </ImageBackground>
      </View>
    );
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
    const {modalSearch} = this.props.article;
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
          data={this.state.community}
          ListFooterComponent={<View style={{paddingTop: widthScreen / 20}} />}
          renderItem={({item, index}) => this._renderCommunty({item, index})}
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps, {
  showModalSearch,
})(Community);
