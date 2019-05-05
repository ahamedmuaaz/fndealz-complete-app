/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import NAV from './navigations';
import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, ImageBackground,View, Text ,ActivityIndicator,AsyncStorage,StatusBar,ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import { w } from './api/Dimensions';
import bgSrc from './assets/wallpaper.png';
import * as firebase from 'firebase';
import { createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation";
import Product from './src/components/product/product';

var config = {
  apiKey: "AIzaSyBV_rxIEkOuxVL13UtzYTicE3C99g4zZx0",
    authDomain: "fashionndealz.firebaseapp.com",
    databaseURL: "https://fashionndealz.firebaseio.com",
    projectId: "fashionndealz",
    storageBucket: "fashionndealz.appspot.com",
    messagingSenderId: "579012181485"

};

firebase.initializeApp(config);
console.disableYellowBox = true;

 
class main extends Component {
  state = {
    currentScreen: 'login', // can be: 'login' or 'register' or 'forgot'
  };

  changeScreen = screenName => () => {
    this.setState({ currentScreen: screenName });
  };

  userSuccessfullyLoggedIn = (user) => {
    this.props.navigation.navigate('App')
  };

  render() {
    let screenToShow;

    switch(this.state.currentScreen) {
      case 'login':
        screenToShow = <Login change={this.changeScreen} success={this.userSuccessfullyLoggedIn}/>;
        break;
      case 'register':
        screenToShow = <Register change={this.changeScreen} />;
        break;
      case 'forgot':
        screenToShow = <ForgotPassword change={this.changeScreen}/>;
        break;
    }

    return (
   
       
        <ImageBackground
          source={this.props.background}
          style={styles.background}
          resizeMode="stretch"

        >
         <ScrollView>
          {screenToShow}
          </ScrollView>
        </ImageBackground>
        
     
    )
  }
}
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}


const AppStack = createStackNavigator({  Product: Product});
const AuthStack = createStackNavigator({ Home:main},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

export default createAppContainer(createSwitchNavigator(
  {
    App: NAV,
    Auth: AuthStack,
    item:AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
));



//App.propTypes = {
 // login: PropTypes.func.isRequired,
//};

main.defaultProps = {
  background:bgSrc ,
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#555',
  },
  background: {
    flex:1,
    width: '100%',
    height: '100%',
  }
  
});


