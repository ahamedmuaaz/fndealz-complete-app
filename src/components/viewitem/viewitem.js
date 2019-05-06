
import React, {Component} from 'react';
import {Platform, StyleSheet, Alert,Text, View,AsyncStorage,ActivityIndicator, ListView,TouchableOpacity,Image,Modal,TouchableHighlight} from 'react-native';

 ActivityIndicator, ListView

class Viewitem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //to disable which data is loading
      isLoading: true,
      modalVisible: false,
     
    };
  }

  componentDidMount(){
    
     //this._retrieveData();
    
    /* fetch('http://35.246.54.179/login/', {
     method: 'POST',
     headers: {
     Accept: 'application/json',
    'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    'email': 'sahandilshan222@gmail.com',
    'pass': 'test1234'
     }),

    }).then((response) => response.json())
    .then((responseJson) => {
    console.log(responseJson);

    

    
 })
 .catch((error) => {
   console.error(error);
 });*/

 fetch('http://104.196.211.215/detectShop/', {
  method: 'POST',
  headers: {
  Accept: 'application/json',
 'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 'shop_name': 'Kandy',
 'branch': 'Kadawatha'
  }),

 }).then((response) => response.json())
 .then((responseJson) => {
 console.log(responseJson);

 
})
.catch((error) => {
console.error(error);
});


return fetch('http://104.196.211.215/prediction/')
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
          dataSource: ds.cloneWithRows(responseJson.notAvailable),
        });}
        else{
          this.setState({
         
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.available),
          });
        }
        console.log(this.state.dataSource.getRowCount());
      })
      .catch(error => {
        console.error(error);
      });
  //this._storeData();

    //console.log("moubnted");
  }

  ListViewItemSeparator = () => {
    //Divider for the list item
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#080808' }} />
    );
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  isEmpty(obj) {
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
        </View>
      );
    }else{
      //returning the main view after data loaded successfully
      return (
        <View style={styles.MainContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={rowData => (

              
              <View style={{ flex: 1, flexDirection: 'column', 
                            paddingTop:0, paddingBottom:16 }}>
                <TouchableOpacity onPress={this.passdetails.bind(this,rowData.name,rowData.brand,rowData.image)}>              
                <Image style={styles.ImageComponentStyle} source = {{ uri:rowData.image}} />
                <Text style={styles.textViewContainerHeading}>
                 Dress Brand: {rowData.brand}
                </Text>
                
                <Text style={styles.textViewContainerHeading}>
                 Percentage Discount: {rowData.brand}
                </Text>
                <Text style={styles.textViewContainerHeading}>
                 Dress Type: {rowData.name}
                </Text>
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

  passdetails(nam,brd,img){
    
    console.log(nam);
    console.log(img);
    this.props.navigation.navigate('Product',{name:nam,brand:brd,image:img});
   
    //console.log(pass);
  };
}



const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    backgroundColor: '#ffffff',
    padding: 5,
  },
  ImageComponentStyle: {
    
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 100,
    width:100,
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
  },
});

export default Viewitem;


 

