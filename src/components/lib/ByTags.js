import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {
  showModalResult,
  showDetailArticle,
  articleById,
} from '../redux/actions/ArticleAction';
import {colors} from '../css/Colors';
import {modalHeader} from '../css/Styles';
import DetailArticle from '../pages/content/DetailArticle';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class ByTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idArticle: '',
    };
  }

  _showDetailArticle = async idArticle => {
    this.setState({idArticle: idArticle});
    await this.props.articleById(idArticle);
    this.props.showDetailArticle(true);
  };

  render() {
    const {resultData, detailArticle} = this.props.article;

    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={modalHeader.containerNoShadow}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.showModalResult(false)}>
            <View style={{flex: 0}}>
              <Ionicons
                name="ios-close"
                size={widthScreen / 10}
                color={colors.black}
              />
            </View>
          </TouchableOpacity>
          <View style={modalHeader.containerText}>
            <Text style={modalHeader.textHeader}>Result</Text>
          </View>
        </View>
        <View
          style={{
            height: heightScreen / 12,
            backgroundColor: colors.white,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: widthScreen / 20,
          }}>
          <View
            style={{
              flex: 0,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              backgroundColor: colors.grey_v2,
              paddingVertical: widthScreen / 38,
              paddingHorizontal: widthScreen / 24,
              borderRadius: 100,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.black,
                fontFamily: 'Roboto-Italic',
                fontSize: widthScreen / 30,
                textTransform: 'capitalize',
              }}>
              {`#${this.props.nameTag}`}
            </Text>
          </View>
        </View>
        <FlatList
          numColumns={2}
          data={resultData}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{marginTop: widthScreen / 20}} />}
          renderItem={({item, index}) => (
            <View style={{flex: 0}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  {width: widthScreen / 2},
                  {height: widthScreen / 2},
                  {marginBottom: 2},
                  index % 2 !== 1
                    ? {
                        paddingLeft: widthScreen / 20,
                        paddingTop: widthScreen / 20,
                        paddingRight: widthScreen / 40,
                      }
                    : {
                        paddingLeft: widthScreen / 40,
                        paddingRight: widthScreen / 20,
                        paddingTop: widthScreen / 20,
                      },
                ]}
                onPress={() => this._showDetailArticle(item._id)}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="cover"
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    width: undefined,
                    height: undefined,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    paddingTop: widthScreen / 40,
                    paddingHorizontal: widthScreen / 60,
                    color: colors.black,
                    fontFamily: 'Roboto-Regular',
                    fontSize: widthScreen / 26,
                    textTransform: 'capitalize',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps, {
  showModalResult,
  showDetailArticle,
  articleById,
})(ByTags);
