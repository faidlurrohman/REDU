import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {
  getTagArticle,
  showModalSearch,
  showModalResult,
  getResultByTag,
} from '../redux/actions/ArticleAction';
import {colors} from '../css/Colors';
import {modalHeader} from '../css/Styles';
import ByTags from './ByTags';
import Loading from './Loading';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTag: '',
      nameTag: '',
    };
  }

  componentDidMount = async () => {
    await this.props.getTagArticle();
  };

  _result = async () => {
    await this.props.getResultByTag(this.state.idTag);
    this.props.showModalResult(true);
  };

  render() {
    const {tags, modalResult, loadingResult} = this.props.article;
    if (loadingResult === true) {
      return <Loading isLoading={loadingResult} />;
    }
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={modalHeader.containerNoShadow}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.showModalSearch(false)}>
            <View style={{flex: 0}}>
              <Ionicons
                name="ios-close"
                size={widthScreen / 10}
                color={colors.black}
              />
            </View>
          </TouchableOpacity>
          <View style={modalHeader.containerText}>
            <Text style={modalHeader.textHeader}>Search</Text>
          </View>
        </View>
        <FlatList
          disableVirtualization={true}
          numColumns={3}
          data={tags}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View style={{padding: widthScreen / 20}}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: colors.black,
                  fontFamily: 'Roboto-Medium',
                  fontSize: widthScreen / 24,
                }}>
                Article by Tags
              </Text>
            </View>
          }
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 0,
                paddingLeft: widthScreen / 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  paddingVertical: widthScreen / 35,
                  paddingHorizontal: widthScreen / 20,
                  borderRadius: 100,
                  backgroundColor:
                    this.state.idTag === item._id
                      ? colors.darkGreen
                      : colors.grey_v2,
                  marginBottom: widthScreen / 20,
                  justifyContent: 'center',
                }}
                onPress={() =>
                  this.setState({
                    idTag: item._id === this.state.idTag ? '' : item._id,
                    nameTag: item.name === this.state.nameTag ? '' : item.name,
                  })
                }>
                <Text
                  style={{
                    textAlign: 'center',
                    color:
                      this.state.idTag === item._id
                        ? colors.white
                        : colors.black,
                    fontFamily: 'Roboto-Italic',
                    fontSize: widthScreen / 28,
                    textTransform: 'capitalize',
                  }}>
                  {`#${item.name}`}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            flex: 0,
            elevation: 5,
            backgroundColor:
              this.state.idTag !== '' ? colors.darkGreen : colors.grey_v2,
            height: heightScreen / 11,
            padding: 5,
          }}>
          <TouchableOpacity
            disabled={this.state.idTag !== '' ? false : true}
            activeOpacity={0.8}
            style={{
              borderRadius: 5,
              backgroundColor:
                this.state.idTag !== '' ? colors.darkGreen : colors.grey_v2,
              flex: 1,
              justifyContent: 'center',
            }}
            onPress={() => this._result()}>
            <Text
              style={{
                textAlign: 'center',
                letterSpacing: 1,
                color: this.state.idTag !== '' ? colors.white : colors.black,
                fontFamily: 'Roboto-Medium',
                fontSize: widthScreen / 20,
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          hasBackdrop={false}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={modalResult}
          style={{margin: 0}}
          onBackButtonPress={() => this.props.showModalResult(false)}>
          <ByTags nameTag={this.state.nameTag} />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(mapStateToProps, {
  getTagArticle,
  showModalSearch,
  showModalResult,
  getResultByTag,
})(Search);
