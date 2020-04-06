import React, {Component} from 'react';
import {Dimensions, Alert} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import NetInfo from '@react-native-community/netinfo';

import Home from './components/pages/home/Home';
import Content from './components/pages/content/Content';
import Community from './components/pages/community/Community';
import Landing from './components/pages/auth/Landing';
import Signin from './components/pages/auth/Signin';
import Signup from './components/pages/auth/Signup';
import Profile from './components/pages/profile/Profile';
import SplashScreen from './components/pages/SplashScreen';
import Header from './components/lib/Header';
import {colors} from './components/css/Colors';
import {getCredential} from './components/redux/actions/AuthAction';
import Edit from './components/pages/profile/Edit';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

// check credential
class AuthCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplash: true,
    };
  }

  componentDidMount = () => {
    this._checkConnection();
  };

  _checkConnection = () => {
    NetInfo.addEventListener(async state => {
      let getStatus = state.isConnected;
      console.log(getStatus);
      if (getStatus !== true) {
        Alert.alert(
          '',
          'Please check your connection!',
          [{text: 'Try Again', onPress: () => this._checkConnection()}],
          {cancelable: false},
        );
      } else {
        await this.props.getCredential();
        setTimeout(() => {
          this._findToken();
          this._hideSplash;
        }, 3000);
      }
    });
  };

  _hideSplash = () => {
    this.setState({isSplash: false});
  };

  _findToken = async () => {
    try {
      const getToken = await AsyncStorage.getItem('@token');
      if (getToken) {
        if (getToken !== 'guest') {
          this.props.navigation.navigate('AppIsLogin');
        } else {
          this.props.navigation.navigate('AppIsNotLogin');
        }
      } else {
        this.props.navigation.navigate('Landing');
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.isSplash === true) {
      return <SplashScreen />;
    }
  }
}

// component landing page
const LandingNavigator = createStackNavigator({
  Landing: {
    screen: Landing,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signin: {
    screen: Signin,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AuthStack = createStackNavigator({
  Signin: {
    screen: Signin,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
    },
  },
});

// component tabs
const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      // header: props => <Header {...props} />,
      headerShown: false,
    },
  },
});

const ContentStack = createStackNavigator({
  Content: {
    screen: Content,
    navigationOptions: {
      // header: props => <Header {...props} />,
      headerShown: false,
    },
  },
});

const CommunityStack = createStackNavigator({
  Community: {
    screen: Community,
    navigationOptions: {
      // header: props => <Header {...props} />,
      headerShown: false,
    },
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      // header: props => <Header {...props} />,
      headerShown: false,
    },
  },
  Edit: {
    screen: Edit,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
});

// interface user login
const TabComponentLogin = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="home"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
    Content: {
      screen: ContentStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="book-open"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
    Community: {
      screen: CommunityStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="globe"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
    Account: {
      screen: ProfileStack,
      navigationOptions: ({navigation}) => {
        let tabBarVisible = true;
        let routeName =
          navigation.state.routes[navigation.state.index].routeName;
        if (routeName == 'Edit') {
          tabBarVisible = false;
        }
        return {
          tabBarIcon: ({tintColor, focused}) => (
            <SimpleLineIcons
              name="user"
              color={tintColor}
              size={focused ? widthScreen / 12 : widthScreen / 14}
            />
          ),
          tabBarVisible,
        };
      },
    },
  },
  {
    backBehavior: 'initialRoute',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.darkGreen,
      inactiveTintColor: colors.grey,
      style: {
        borderTopColor: colors.grey_v2,
        elevation: 10,
        height: heightScreen / 11,
        backgroundColor: colors.white,
      },
    },
    initialRouteName: 'Home',
  },
);

// interface user not login
const TabComponentNoLogin = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="home"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
    Content: {
      screen: ContentStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="book-open"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
    Community: {
      screen: CommunityStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="globe"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
    Account: {
      screen: AuthStack,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name="user"
            color={tintColor}
            size={focused ? widthScreen / 12 : widthScreen / 14}
          />
        ),
      },
    },
  },
  {
    backBehavior: 'initialRoute',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.darkGreen,
      inactiveTintColor: colors.grey,
      style: {
        borderTopColor: colors.grey_v2,
        elevation: 10,
        height: heightScreen / 11,
        backgroundColor: colors.white,
      },
    },
    initialRouteName: 'Home',
  },
);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthToken: connect(mapStateToProps, {getCredential})(AuthCredentials),
      LandingPage: LandingNavigator,
      AppIsLogin: TabComponentLogin,
      AppIsNotLogin: TabComponentNoLogin,
    },
    {
      initialRouteName: 'AuthToken',
    },
  ),
);
