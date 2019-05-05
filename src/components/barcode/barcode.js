/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/*
import React, {Component} from 'react';
import {Platform, StyleSheet, Alert,Text, View,AsyncStorage,ActivityIndicator, ListView,TouchableOpacity,Image,Modal,TouchableHighlight} from 'react-native';

 ActivityIndicator, ListView

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //to disable which data is loading
      isLoading: true,
      modalVisible: false,
    };
  }

  componentDidMount(){
    
     fetch('http://35.246.54.179/login/', {
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
 });

 fetch('http://35.246.54.179/test/', {
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


return fetch('http://35.246.54.179/allItems/')
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        });
      })
      .catch(error => {
        console.error(error);
      });
  //this._storeData();
 // this._retrieveData();
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
   
  static navigationOptions =
  {
    title: 'BARCODE',

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
                            paddingTop:16, paddingBottom:16 }}>
                <TouchableOpacity onPress={this.print.bind(this)}>              
                <Image style={styles.ImageComponentStyle} source = {{ uri:rowData.image}} />
                <Text style={styles.textViewContainerHeading}>
                 Dress Brand: {rowData.brand}
                </Text>
                <Text style={styles.textViewContainer}>
                 Percentage Discount: {rowData.discount}
                </Text>
                <Text style={styles.textViewContainer}>
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
      const value = await AsyncStorage.getItem('@MySuperStore');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  print(){
    this.props.navigation.navigate('item')
   
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

export default Welcome;
*/

 


import React, { Component } from 'react';
import {Text,View,TouchableHighlight, PermissionsAndroid, StyleSheet} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the value
      value: '',
      opneScanner: true,
    };
  }

  static navigationOptions =
  {
    title: 'BARCODE',

  };

  //function for flip camera
  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }
//function for turn on flash
  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }
//function for change WB
  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }
//function for focus camera
  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }
//function for zoom out
  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }
//function for zoom out
  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  renderBarcode(value) {
    //called after te successful scanning of Barcode
    this.setState({ value: value });
    this.setState({ opneScanner: false });
  }

  renderCamera() {
    var that =this;
    //Start Scanning
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'Permission to use camera',
              'message': 'We need your permission to access your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ value: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("Access denied");
          }
        } catch (err) {
          alert("Error!",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();

    
  }

  handlePress = async () => {
    fetch('http://35.246.54.179/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  
          "email" : "sahandilshan222@gmail.com",
          "pass" : "test1234"
        })
  });
    fetch('http://35.246.54.179/barcode/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "barcode" : "100000001"
  
        })
  })
      .then((response) => response.json())
      .then((responseJson) => {
   //alert("Brand:  " + responseJson.brand +" Discount:  " + responseJson.discount+" Name:  " + responseJson.name + " Img:  " + responseJson.image);
   <Text style={styles.simpleText}>{'Details: '+ responseJson.brand }</Text>
  
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    //return <View style={styles.container}>{this.renderCamera()}</View>;

    //If value is set then return this view
    if (!this.state.opneScanner) {
      return (
        //display details
        <View style={styles.container}>
            <Text style={styles.simpleText}>{this.state.value ? 'Scanned Code: '+this.state.value : ''}</Text>

            <TouchableHighlight
              onPress={() => this.renderCamera()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Back
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
      
        <CameraKitCameraScreen

          cameraOptions={{
              flashMode: 'auto',
              focusMode: 'on',
              zoomMode: 'on',
              ratioOverlay:'1:1', 
              ratioOverlayColor: '#00000077'
          }}
          showFrame={true}
          scanBarcode={true}
          laserColor={'red'}
          frameColor={'yellow'}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.renderBarcode(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
