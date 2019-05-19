
import React, {Component} from 'react';
import {Platform, StyleSheet, Alert,Text, View,AsyncStorage,ActivityIndicator, ListView,TouchableOpacity,Image,Modal,TouchableHighlight} from 'react-native';
import { NavigationEvents } from "react-navigation";
 ActivityIndicator, ListView

class Viewitem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //to disable which data is loading
      isLoading: true,
      msg:''
     
    };
  }

  componentDidMount(){
   this.getData();

  }

  getData = async () => {
     
    const value = await AsyncStorage.getItem('email');
    fetch('http://35.246.67.79/prediction/',{
      method: 'POST',
      headers: {
      Accept: 'application/json',
     'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     'email':value,
      }),
  
     })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      //console.log(this.state.dataSource.getRowCount());
     
      if(!this.isEmpty(responseJson.notAvailable)){
    
        this.setState({
       
        isLoading: false,
        msg:'Some Random Products',
        dataSource: ds.cloneWithRows(responseJson.notAvailable),
      });}
      else if(!this.isEmpty(responseJson.available)){
        this.setState({
       
          isLoading: false,
          msg:'Predicted Products',
          dataSource: ds.cloneWithRows(responseJson.available),
        });
      }
     
      //console.log(this.state.dataSource.getRowCount());
    })
    .catch(error => {
      console.error(error);
    });
  
  }
  
  ListViewItemSeparator = () => {
    //Divider for the list item
    return (
      <View style={{ height: 0, width: '100%', backgroundColor: '#080808' }} />
    );
  };

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
};
   
  static navigationOptions =
  {
    title: 'PRODUCTS',
  
  };
  render() {
   
    
    if (this.state.isLoading) {
      //returning the loader view while data is loading
      return (
        
        <View style={{ flex: 1, paddingTop: 20 }}>
        
        
          <ActivityIndicator />
          <NavigationEvents
          onDidFocus={() => {
           this.setState({ isLoading:true});
           this.componentDidMount();
       
         }}
          />
        </View>
      );
    }else{
      //returning the main view after data loaded successfully
      return (
        <View style={styles.MainContainer}>
          <Text style={styles.info}>{this.state.msg}</Text>
          <NavigationEvents
          onDidFocus={() => {
           this.setState({ isLoading: false});
           this.componentDidMount();
       
         }}
          />
         
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={rowData => (

              
              <View style={{ flex: 1,justifyContent:'center',alignContent:'center',
                            paddingTop:0, paddingBottom:16 }}>
                <TouchableOpacity onPress={this.passdetails.bind(this,rowData.name,rowData.brand,rowData.image,rowData.price,rowData.discount)}>              
                <Image style={styles.ImageComponentStyle} source = {{ uri:rowData.image}} />
                </TouchableOpacity> 
                
               
                
              </View>


            
            
              
            )}
          />
        </View>
      );
    }
  }



  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore', 'I like to save it.');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      //console.log(error);
    }
  };

  passdetails(nam,brd,img,prce,dis){
    
    console.log(nam);
    console.log(img);
    this.props.navigation.navigate('Product',{name:nam,brand:brd,image:img,price:prce,discount:dis});
   
    //console.log(pass);
  };
}



const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    backgroundColor: '#ffffff',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageComponentStyle: {
    
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 200,
    width:200,
    backgroundColor: '#4CAF50'
   
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
  },info:{
    fontSize:16,
    color: "#c41bb0",
    marginTop:10,
    paddingBottom:10
  }
});

export default Viewitem;


 

