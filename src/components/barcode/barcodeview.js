import React from 'react';
import { Button, View, Text,Image,StyleSheet,Platform } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 


class DetailsScreen extends React.Component {
  static navigationOptions =
  {
    title: 'BarcodeView',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#c41bb0',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };
    render() {
     // const { navigation } = this.props;
      const name = this.props.navigation.getParam('name','no name');
      const brand= this.props.navigation.getParam('brand','no brand');
      const img= this.props.navigation.getParam('image','imagefound');
      const price= this.props.navigation.getParam('price','not found');
      //img=JSON.stringify(img);
      return (
        <View style={styles.MainContainer}>
        
        <Image style={styles.ImageComponentStyle} source = {{ uri:img.toString()}} />
        <Text>Name: {JSON.stringify(name)}</Text>
        <Text>Brand: {JSON.stringify(brand)}</Text>
        <Text>Price:{JSON.stringify(price)}</Text>
        <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.navigate('Second')}
          />
        </View>
      );
    }
  }

  export default DetailsScreen;

  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 20 : 30,
      backgroundColor: '#ffffff',
      padding:10,
      //justifyContent: 'center',
      alignItems: 'center',
    },
    ImageComponentStyle: {
      
      justifyContent: 'center',
      //flex:1,
      //alignItems: 'center',
      //height: 20,
      //width:20,
     
      width:200, 
      height:200,
     
    },
    textViewContainerHeading: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
      color: '#000000',
      fontWeight:'bold'
    },
      textViewContainer: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  });
  