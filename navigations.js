import React ,{Component}from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import  QRCODE from './src/components/qrcode/qrcode';
import  BARCODE  from './src/components/barcode/barcode';
import Viewitem from './src/components/viewitem/viewitem';
import MenuDrawer from './src/menudrawer/MenuDrawer';
import About from './screens/About/about';


 
import { createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
 

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}


class HamburgerIcon extends Component {
 
  toggleDrawer = () => {
 
    this.props.navigationProps.toggleDrawer();
 
  }
 
  render() {
 
    return (
 
      <View style={{ flexDirection: 'row' }}>
 
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
 
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
 
        </TouchableOpacity>
 
      </View>
 
    );
 
 
  }
}
 
 
export const Tab_1 = createMaterialTopTabNavigator({
  First1: {
    screen: QRCODE,
  },
  Second: {
    screen:Viewitem,
  },
  Third:{
    screen: BARCODE,
  }
}, {
    tabBarPosition: 'top',
 
    swipeEnabled: true,
 
    tabBarOptions: {
 
      activeTintColor: '#fff',
      pressColor: '#004D40',
      inactiveTintColor: '#fff',
      style: {
 
        backgroundColor: '#c41bb0'
 
      },
 
      labelStyle: {
        fontSize: 16,
        fontWeight: '200'
      }
    }
 
  });
 
export const Tab_2 = createMaterialTopTabNavigator({
  Forth: {
    screen:About,
  }
}, {
    tabBarPosition: 'top',
 
    swipeEnabled: true,
 
    tabBarOptions: {
 
      activeTintColor: '#fff',
      pressColor: '#004D40',
      inactiveTintColor: '#fff',
      style: {
 
        backgroundColor: '#c41bb0'
 
      },
 
      labelStyle: {
        fontSize: 16,
        fontWeight: '200'
      }
    }
 
  });
 
const First_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_1,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#c41bb0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      
      },
      headerTintColor: '#fff',
    })
  }
});
 
const Second_2_Tabs = createStackNavigator({
  First: {
    screen: Tab_2,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#c41bb0',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: '#fff',
    })
  },
});
 
export default MyDrawerNavigator = createDrawerNavigator({
 
  Home_Menu_Label: {
 
    screen: First_2_Tabs,
 
  },
 
  Student_Menu_Label: {
 
    screen: Second_2_Tabs,
 
  }
 
},DrawerConfig

);
 

//export default createAppContainer(MyDrawerNavigator);
 
const styles = StyleSheet.create({
 
  MainContainer: {
 
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11
 
  },
 
  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },

  
 
});

