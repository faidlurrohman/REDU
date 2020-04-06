import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {btnAdd} from '../css/Styles';
import Modal from 'react-native-modal';
import {colors} from '../css/Colors';
import Create from '../pages/create/Create';
import {setModalCreate} from '../redux/actions/StoryAction';

const widthScreen = Dimensions.get('window').width;

class ButtonAdd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {modalCreate} = this.props.story;
    return (
      <View style={btnAdd.container}>
        <TouchableOpacity
          onPress={() => this.props.setModalCreate(true)}
          activeOpacity={0.5}
          style={btnAdd.btn}>
          <Ionicons
            style={{right: 1}}
            name="ios-paper-plane"
            size={widthScreen / 12}
            color={colors.white}
          />
        </TouchableOpacity>
        <Modal
          hasBackdrop={false}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          isVisible={modalCreate}
          style={{margin: 0}}
          onBackButtonPress={() => this.props.setModalCreate(false)}>
          <Create />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
});

export default connect(mapStateToProps, {setModalCreate})(ButtonAdd);
