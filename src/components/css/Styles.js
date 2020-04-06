import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from './Colors';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const splash = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGreen,
  },
  imgSplash: {
    resizeMode: 'contain',
    width: widthScreen / 3,
    height: heightScreen / 4,
  },
});

const loading = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: heightScreen,
    backgroundColor: colors.white,
  },
});

const header = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: widthScreen / 4.5,
    marginTop: Platform.OS == 'ios' ? 20 : 0, // only for IOS to give StatusBar Space
  },
  child: {
    flex: 1,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: widthScreen / 20,
  },
  childNoShadow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: widthScreen / 20,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: widthScreen / 3,
    height: heightScreen / 4,
  },
});

const btnAdd = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: heightScreen / 50,
    alignItems: 'center',
    right: heightScreen / 50,
    backgroundColor: colors.darkGreen,
    borderRadius: 100,
  },
  btn: {
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthScreen / 6,
    height: widthScreen / 6,
    borderRadius: 100,
    backgroundColor: colors.darkGreen,
  },
});

const landing = StyleSheet.create({
  imgBack: {
    flex: 1,
    width: widthScreen,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacityBack: {
    position: 'absolute',
    width: widthScreen,
    height: '100%',
    backgroundColor: colors.darkGreenOpacity,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: widthScreen / 20,
  },
  logo: {
    resizeMode: 'center',
    width: widthScreen / 1.8,
    height: heightScreen / 2,
  },
  textTitle: {
    paddingHorizontal: widthScreen / 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 32,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textSub: {
    marginTop: heightScreen / 30,
    paddingHorizontal: widthScreen / 8,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    fontSize: widthScreen / 30,
    color: colors.white,
    letterSpacing: 1,
    lineHeight: heightScreen / 30,
  },
  containerButton: {
    flex: 0,
    justifyContent: 'center',
    width: widthScreen,
    paddingHorizontal: widthScreen / 20,
    paddingBottom: widthScreen / 20,
  },
  btnRegister: {
    backgroundColor: colors.lighGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
    marginBottom: heightScreen / 50,
  },
  txtRegister: {
    paddingVertical: heightScreen / 80,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 26,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthScreen / 10,
    paddingVertical: widthScreen / 50,
  },
  txtContinue: {
    paddingVertical: heightScreen / 60,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 30,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const signin = StyleSheet.create({
  imgBack: {
    flex: 1,
    width: widthScreen,
    height: '100%',
  },
  imgOpacity: {
    position: 'absolute',
    width: widthScreen,
    height: '100%',
    backgroundColor: colors.darkGreenOpacity,
  },
  backButton: {
    flex: 0,
    left: widthScreen / 50,
    marginTop: heightScreen / 25,
    padding: widthScreen / 24,
  },
  inputContainer: {
    marginBottom: heightScreen / 50,
    paddingHorizontal: widthScreen / 20,
  },
  labelIcon: {
    position: 'absolute',
    bottom: heightScreen / 34,
    left: widthScreen / 15,
  },
  eyePassword: {
    position: 'absolute',
    bottom: heightScreen / 40,
    right: widthScreen / 10,
  },
  forgotButton: {
    textAlign: 'right',
    color: colors.white,
    fontSize: widthScreen / 26,
    fontFamily: 'Roboto-Light',
  },
  containerButton: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: widthScreen / 20,
  },
  buttonSignin: {
    backgroundColor: colors.lighGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
    marginBottom: heightScreen / 50,
  },
  buttonSigninDisabled: {
    backgroundColor: colors.grey_v4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
    marginBottom: heightScreen / 50,
  },
  textSignin: {
    paddingVertical: heightScreen / 80,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 26,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
  },
  dontContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: widthScreen / 10,
    paddingVertical: widthScreen / 50,
  },
  textDont: {
    color: colors.white,
    fontSize: widthScreen / 26,
    fontFamily: 'Roboto-Light',
  },
  textSignup: {
    paddingVertical: heightScreen / 60,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 30,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
  },
});

const signup = StyleSheet.create({
  imgBack: {
    flex: 1,
    width: widthScreen,
    height: '100%',
  },
  imgOpacity: {
    position: 'absolute',
    width: widthScreen,
    height: '100%',
    backgroundColor: colors.darkGreenOpacity,
  },
  backButton: {
    flex: 0,
    marginTop: heightScreen / 25,
    left: widthScreen / 50,
    padding: widthScreen / 24,
  },
  inputContainer: {
    marginBottom: heightScreen / 50,
    paddingHorizontal: widthScreen / 20,
  },
  labelIcon: {
    position: 'absolute',
    bottom: heightScreen / 34,
    left: widthScreen / 15,
  },
  eyePassword: {
    position: 'absolute',
    bottom: heightScreen / 40,
    right: widthScreen / 10,
  },
  containerButton: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: widthScreen / 20,
  },
  buttonSignup: {
    backgroundColor: colors.lighGreen,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
    marginBottom: heightScreen / 50,
  },
  buttonSignupDisabled: {
    backgroundColor: colors.grey_v4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
    marginBottom: heightScreen / 50,
  },
  textSignup: {
    paddingVertical: heightScreen / 80,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 26,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
  },
});

const modalHeader = StyleSheet.create({
  container: {
    elevation: 2,
    height: heightScreen / 12,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthScreen / 20,
  },
  containerNoShadow: {
    height: heightScreen / 12,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthScreen / 20,
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  containerTextEdit: {
    flex: 1,
    justifyContent: 'center',
  },
  textHeader: {
    letterSpacing: 1,
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 20,
    marginLeft: widthScreen / 20,
  },
  textHeaderNoBack: {
    letterSpacing: 1,
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 20,
  },
});

const create = StyleSheet.create({
  titleInput: {
    color: colors.black,
    paddingHorizontal: widthScreen / 20,
    height: heightScreen / 12,
    backgroundColor: colors.grey_v2,
    borderRadius: 5,
    elevation: 1,
    fontSize: widthScreen / 25,
    fontFamily: 'Roboto-Regular',
  },
  containerInput: {
    paddingHorizontal: widthScreen / 20,
    marginBottom: heightScreen / 30,
  },
  btnCategory: {
    flex: 1,
    elevation: 1,
    paddingHorizontal: widthScreen / 20,
    height: heightScreen / 12,
    backgroundColor: colors.grey_v2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
  },
  textCategory: {
    paddingVertical: heightScreen / 10,
    fontSize: widthScreen / 25,
    fontFamily: 'Roboto-Regular',
    color: colors.grey_v4,
  },
  descInput: {
    textAlignVertical: 'top',
    color: colors.black,
    paddingHorizontal: widthScreen / 20,
    height: heightScreen / 3,
    backgroundColor: colors.grey_v2,
    borderRadius: 5,
    elevation: 1,
    fontSize: widthScreen / 25,
    fontFamily: 'Roboto-Regular',
  },
  btnPhotos: {
    flex: 1,
    elevation: 1,
    height: heightScreen / 12,
    backgroundColor: colors.grey_v2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: widthScreen / 50,
  },
  textPhotos: {
    paddingVertical: heightScreen / 80,
    fontSize: widthScreen / 25,
    fontFamily: 'Roboto-Regular',
    color: colors.grey_v4,
    textAlign: 'center',
  },
});

const category = StyleSheet.create({
  header: {
    flex: 0,
    justifyContent: 'center',
    paddingHorizontal: widthScreen / 15,
    paddingVertical: widthScreen / 30,
  },
  headerText: {
    marginTop: widthScreen / 50,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 20,
    color: colors.black,
    letterSpacing: 1,
  },
  containerItem: {
    flex: 1,
    paddingHorizontal: widthScreen / 22,
    paddingVertical: widthScreen / 30,
  },
  textItem: {
    paddingHorizontal: widthScreen / 20,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 22,
    color: colors.black,
    letterSpacing: 1,
  },
});

const photos = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.white,
    height: heightScreen / 3,
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    paddingHorizontal: widthScreen / 15,
    paddingVertical: widthScreen / 30,
  },
  headerText: {
    marginTop: widthScreen / 50,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 20,
    color: colors.black,
    letterSpacing: 1,
  },
  btnContainer: {
    flex: 1,
    paddingHorizontal: widthScreen / 15,
    paddingVertical: widthScreen / 30,
    justifyContent: 'space-around',
  },
  separator: {
    alignItems: 'center',
    borderColor: colors.grey,
    borderWidth: 0.5,
    marginVertical: widthScreen / 30,
  },
  btnText: {
    paddingHorizontal: widthScreen / 20,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 22,
    color: colors.black,
    letterSpacing: 1,
  },
});

const modalAuth = StyleSheet.create({
  containerLogin: {
    flex: 0,
    backgroundColor: colors.white,
    height: heightScreen / 6,
  },
  containerRegister: {
    flex: 0,
    backgroundColor: colors.white,
    height: heightScreen / 6,
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    paddingHorizontal: widthScreen / 15,
    paddingVertical: widthScreen / 30,
  },
  headerText: {
    marginTop: widthScreen / 50,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 20,
    color: colors.black,
    letterSpacing: 1,
  },
});

const editCmt = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    width: widthScreen / 1.2,
    height: heightScreen / 2,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  headerContainer: {
    flex: 0,
    marginTop: widthScreen / 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
  containerInput: {
    flex: 0,
    height: 1,
    backgroundColor: colors.grey_v2,
    marginVertical: widthScreen / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputEdit: {
    flex: 1,
    paddingVertical: 0,
    color: colors.black,
    paddingHorizontal: widthScreen / 20,
    fontSize: widthScreen / 26,
    fontFamily: 'Roboto-Regular',
    textAlignVertical: 'top',
  },
  containerButton: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: widthScreen / 15,
  },
});

const modalComment = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    width: widthScreen / 1.4,
    height: heightScreen / 4.5,
    alignSelf: 'center',
  },
  closeContainer: {
    flex: 0,
    paddingHorizontal: widthScreen / 35,
  },
  headerContainer: {
    flex: 0,
    marginTop: widthScreen / 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
  separator: {
    flex: 0,
    height: 1,
    backgroundColor: colors.grey_v2,
    marginVertical: widthScreen / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
});

const modalMore = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    width: widthScreen / 1.4,
    height: heightScreen / 4.5,
    alignSelf: 'center',
  },
  closeButton: {
    flex: 0,
    paddingHorizontal: widthScreen / 35,
  },
  headerContainer: {
    flex: 0,
    marginTop: widthScreen / 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
  separator: {
    flex: 0,
    height: 1,
    backgroundColor: colors.grey_v2,
    marginVertical: widthScreen / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
});

const community = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: widthScreen / 20,
    paddingTop: widthScreen / 20,
  },
  imgBgr: {
    justifyContent: 'flex-end',
    width: '100%',
    height: heightScreen / 3,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  bgrOpa: {
    width: '100%',
    height: heightScreen / 3,
    backgroundColor: colors.black,
    opacity: 0.6,
    borderRadius: 10,
  },
  btnJoin: {
    backgroundColor: colors.white,
    borderRadius: 10,
    position: 'absolute',
    top: heightScreen / 40,
    right: heightScreen / 40,
    padding: widthScreen / 40,
  },
  textJoin: {
    color: colors.black,
    opacity: 0.8,
    fontSize: widthScreen / 35,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 1,
  },
  textCommunity: {
    textAlign: 'left',
    paddingHorizontal: widthScreen / 20,
    opacity: 0.8,
    bottom: heightScreen / 14,
    position: 'absolute',
    color: colors.white,
    fontSize: widthScreen / 28,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 1,
    textShadowColor: colors.statusbar,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  textName: {
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
  },
});

const editProfil = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: widthScreen / 17,
    backgroundColor: colors.white,
  },
  btnCreate: {
    flex: 0,
    justifyContent: 'center',
    marginTop: heightScreen / 30,
  },
  containerImg: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imgProfil: {
    width: widthScreen / 2.7,
    height: widthScreen / 2.7,
    borderRadius: 100,
    borderColor: colors.grey_v2,
    borderWidth: 2,
  },
  textImg: {
    marginTop: widthScreen / 30,
    color: colors.darkGreen,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 30,
    letterSpacing: 0.5,
  },
  textFullname: {
    color: colors.grey,
    fontFamily: 'Roboto-Italic',
    fontSize: widthScreen / 30,
    letterSpacing: 0.5,
    paddingHorizontal: widthScreen / 50,
  },
  inputFullname: {
    color: colors.black,
    paddingHorizontal: widthScreen / 50,
    height: heightScreen / 16,
    fontSize: widthScreen / 28,
    fontFamily: 'Roboto-Regular',
    borderBottomColor: colors.grey_v2,
    borderBottomWidth: 1,
  },
  textBio: {
    marginTop: widthScreen / 30,
    color: colors.grey,
    fontFamily: 'Roboto-Italic',
    fontSize: widthScreen / 30,
    letterSpacing: 0.5,
    paddingHorizontal: widthScreen / 50,
  },
  inputBio: {
    height: heightScreen / 16,
    paddingHorizontal: widthScreen / 50,
    textAlignVertical: 'top',
    color: colors.black,
    fontSize: widthScreen / 28,
    fontFamily: 'Roboto-Regular',
    borderBottomColor: colors.grey_v2,
    borderBottomWidth: 1,
  },
  textSignout: {
    marginLeft: widthScreen / 60,
    color: colors.darkGreen,
    fontSize: widthScreen / 26,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.5,
    paddingHorizontal: widthScreen / 50,
  },
});

const modalPhotos = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    width: widthScreen / 1.4,
    height: heightScreen / 4.5,
    alignSelf: 'center',
  },
  closeBtn: {
    flex: 0,
    paddingHorizontal: widthScreen / 35,
  },
  containerCamera: {
    flex: 0,
    marginTop: widthScreen / 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCamera: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
  separator: {
    flex: 0,
    height: 1,
    backgroundColor: colors.grey_v2,
    marginVertical: widthScreen / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFile: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextFile: {
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 27,
    color: colors.black,
    letterSpacing: 1,
  },
});

const profile = StyleSheet.create({
  containerHeader: {
    flex: 0,
    elevation: 1,
    backgroundColor: colors.white,
  },
  headerComponent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImgContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    padding: widthScreen / 20,
  },
  imgHeader: {
    width: widthScreen / 3.7,
    height: widthScreen / 3.7,
    borderRadius: 100,
    borderColor: colors.grey_v2,
    borderWidth: 2,
  },
  containerIntroduce: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: widthScreen / 20,
  },
  textHello: {
    letterSpacing: 1,
    color: colors.grey_v4,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 20,
    marginBottom: 3,
  },
  textName: {
    letterSpacing: 1,
    color: colors.black,
    fontFamily: 'Roboto-Bold',
    fontSize: widthScreen / 20,
  },
  containerDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: widthScreen / 30,
  },
  detailComponent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: widthScreen / 20,
  },
  textUsername: {
    letterSpacing: 1,
    color: colors.darkGreen,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 30,
    marginBottom: 5,
  },
  textBio: {
    letterSpacing: 1,
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 32,
  },
  containerEmpty: {
    flex: 1,
    padding: widthScreen / 20,
    alignItems: 'center',
  },
  textEmpty: {
    letterSpacing: 1,
    color: colors.grey_v4,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 30,
  },
  imgStory: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  footerContainer: {
    marginTop: heightScreen / 40,
    marginBottom: heightScreen / 35,
  },
});

const articleStyle = StyleSheet.create({
  detailContainer: {
    flex: 0,
    backgroundColor: colors.white,
    marginBottom: heightScreen / 40,
  },
  imageArticleContainer: {
    zIndex: 9000,
    position: 'absolute',
    width: '100%',
    height: heightScreen / 2.5,
    backgroundColor: colors.black,
    opacity: 0.2,
  },
  imageArticle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: heightScreen / 2.5,
  },
  btnArticleContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: widthScreen / 20,
  },
  btnLikeArticle: {
    flex: 0,
    marginRight: widthScreen / 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnCommentArticle: {
    flex: 1,
    marginRight: widthScreen / 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnShareArticle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnText: {
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 30,
    letterSpacing: 0.5,
  },
  textTitle: {
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 32,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  tagContainer: {
    flexDirection: 'row',
    paddingHorizontal: widthScreen / 20,
    marginTop: widthScreen / 30,
  },
  textTag: {
    color: colors.blue,
    fontFamily: 'Roboto-Italic',
    fontSize: widthScreen / 32,
    letterSpacing: 0.5,
  },
  bodyContainer: {
    flexDirection: 'row',
    paddingHorizontal: widthScreen / 20,
    paddingVertical: widthScreen / 30,
  },
  textBody: {
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 32,
    letterSpacing: 0.5,
    textAlign: 'justify',
    lineHeight: widthScreen / 20,
  },
  separatorArticle: {
    flex: 0,
    height: 1.5,
    backgroundColor: colors.grey_v2,
    marginBottom: widthScreen / 20,
    marginTop: widthScreen / 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSeparator: {
    paddingHorizontal: widthScreen / 70,
    backgroundColor: colors.white,
    color: colors.grey,
    fontFamily: 'Roboto-Italic',
    fontSize: widthScreen / 36,
    letterSpacing: 0.5,
  },
  separatorComment: {
    flex: 0,
    height: 0.5,
    backgroundColor: colors.grey_v2,
    marginBottom: widthScreen / 40,
    marginTop: widthScreen / 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfilComment: {
    flex: 0,
    width: widthScreen / 10,
    height: widthScreen / 10,
    borderRadius: 100,
  },
  containerHeaderComment: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textComment: {
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: widthScreen / 36,
    letterSpacing: 0.5,
  },
  textMoment: {
    marginTop: 2,
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 45,
    letterSpacing: 0.5,
  },
  textMessage: {
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: widthScreen / 36,
    letterSpacing: 0.5,
    textAlign: 'justify',
    lineHeight: widthScreen / 20,
  },
  commentArticleContainer: {
    flex: 0,
    elevation: 5,
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  textInputCommentArticle: {
    color: colors.black,
    paddingHorizontal: widthScreen / 20,
    fontSize: widthScreen / 26,
    fontFamily: 'Roboto-Regular',
  },
  borderComment: {
    flex: 0,
    borderLeftWidth: 1,
    borderColor: colors.grey_v3,
  },
  btnComment: {
    flex: 0,
    paddingHorizontal: widthScreen / 20,
    justifyContent: 'flex-end',
    bottom: heightScreen / 90,
  },
});

export {
  splash,
  loading,
  header,
  btnAdd,
  landing,
  signin,
  signup,
  modalHeader,
  create,
  category,
  photos,
  modalAuth,
  editCmt,
  modalComment,
  modalMore,
  community,
  editProfil,
  modalPhotos,
  profile,
  articleStyle,
};
