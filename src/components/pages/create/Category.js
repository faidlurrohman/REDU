import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {colors} from '../../css/Colors';
import {category, modalHeader} from '../../css/Styles';

const widthScreen = Dimensions.get('window').width;

class Category extends Component {
  render() {
    const {categoryCreate} = this.props.story;
    const {createCategory} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={modalHeader.container}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.modalCategory(false)}>
            <View style={{flex: 0}}>
              <Ionicons
                name="ios-close"
                size={widthScreen / 10}
                color={colors.black}
              />
            </View>
          </TouchableOpacity>
          <View style={modalHeader.containerText}>
            <Text style={modalHeader.textHeader}>Choose Category</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={category.containerItem}>
            {categoryCreate.length > 0
              ? categoryCreate.map(res => {
                  return (
                    <TouchableOpacity
                      key={res._id}
                      activeOpacity={0.5}
                      style={{
                        marginBottom: widthScreen / 20,
                      }}
                      onPress={() => this.props.setCategory(res._id, res.name)}>
                      <View
                        style={{
                          flex: 0,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Ionicons
                          name={
                            res._id === createCategory
                              ? 'ios-checkmark-circle'
                              : 'ios-checkmark-circle-outline'
                          }
                          size={widthScreen / 12}
                          color={colors.darkGreen}
                        />
                        <Text style={category.textItem}>{res.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
});

export default connect(mapStateToProps)(Category);
