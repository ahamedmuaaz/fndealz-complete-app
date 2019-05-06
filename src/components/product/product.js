import React from 'react';
import { Button, View, Text,Image,StyleSheet,Platform ,TouchableHighlight} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; 


class DetailsScreen extends React.Component {
  static navigationOptions =
  {
    title: 'Details',headerStyle: {
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
      const price= this.props.navigation.getParam('price',0);
      const discount=this.props.navigation.getParam('discount',0);
      //const price= this.props.navigation.getParam('price','not found');
      //img=JSON.stringify(img);
      return (
        <View style={styles.MainContainer}>
        
        <Image style={styles.ImageComponentStyle} source = {{ uri:img.toString()}} />
        <Text style={styles.textViewContainer}>Name:{name}</Text>
        <Text style={styles.textViewContainer}>Brand:{brand}</Text>
        <Text style={styles.textViewContainer}>Price:{price}</Text>
        <Text style={styles.textViewContainer}><Text style={{ color: '#FF0000'}}>Discounted Price:{price-(price*discount/100)}</Text></Text>
        <View style={styles.separator}></View>
        <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Second')}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize:12}}>
                Back
                </Text>
            </TouchableHighlight>
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
      marginBottom:20
     
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
      fontWeight:'bold',
      fontSize: 20,
    }, 
    separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#2c3539',
      padding: 10,
      width:250,
      marginTop:16
    }
  });
  
 /*
 import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';

export default class ProductDetail extends Component {

  constructor(props) {
    super(props);
  }

  clickEventListener() {
    Alert.alert("Success", "Product has beed added to cart")
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
            <Image style={styles.productImg} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v7KDJN7TAoJa5sFaPWcp1HX8JFcpF3z5K3ngz4L6kWoEP7Ca"}}/>
            <Text style={styles.name}>Super Soft T-Shirt</Text>
            <Text style={styles.price}>$ 12.22</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
              Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
              natoque penatibus et magnis dis parturient montes, 
              nascetur ridiculus mus. Donec quam felis, ultricies nec
            </Text>
          </View>
          <View style={styles.starContainer}>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
            <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
          </View>
          <View style={styles.contentColors}>
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00BFFF"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF1493"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00CED1"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#228B22"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#20B2AA"}]}></TouchableOpacity> 
            <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF4500"}]}></TouchableOpacity> 
          </View>
          <View style={styles.contentSize}>
            <TouchableOpacity style={styles.btnSize}><Text>S</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.btnSize}><Text>M</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.btnSize}><Text>L</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.btnSize}><Text>XL</Text></TouchableOpacity> 
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={()=> this.clickEventListener()}>
              <Text style={styles.shareButtonText}>Add To Cart</Text>  
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  productImg:{
    width:200,
    height:200,
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});     */