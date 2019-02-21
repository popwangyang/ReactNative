import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    StatusBar
} from 'react-native';
import { StackNavigator, TabBarBottom, TabNavigator } from "react-navigation";
import ScrollViewPage from './ScrollView.js';


class ImageComponent extends React.Component {
   render () {
       const num = this.props.num
       return (
          <View style={{position:'relative'}}>
             <Image
                 source={this.props.focused ? this.props.imgSrc1 : this.props.imgSrc2}
                 style={{ width: 26, height: 26, tintColor: this.props.tintColor }}
             />
             <Text style={styles.points}>{num >= 100 ? "99+":num}</Text>
          </View>
       )
   }
}

class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '热点',
        tabBarIcon: ({ focused, tintColor }) => (
            <ImageComponent
              focused = {focused}
              tintColor = {tintColor}
              imgSrc1 = {require('./images/hot.png')}
              imgSrc2 = {require('./images/hot1.png')}
              num = {1000}
            />
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollViewPage/>
            </View>
        );
    }
}

class Circle extends React.Component {
    static navigationOptions = {
        tabBarLabel: '圈子',
        tabBarIcon: ({ focused, tintColor }) => (
        <ImageComponent
              focused = {focused}
              tintColor = {tintColor}
              imgSrc1 = {require('./images/圈子.png')}
              imgSrc2 = {require('./images/圈子1.png')}
              num = {20}
          />
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>！这是圈子</Text>
            </View>
        );
    }
}

class Tools extends React.Component {
    static navigationOptions = {
        tabBarLabel: '工具',
        tabBarIcon: ({ focused, tintColor }) => (
        <ImageComponent
              focused = {focused}
              tintColor = {tintColor}
              imgSrc1 = {require('./images/工具.png')}
              imgSrc2 = {require('./images/工具1.png')}
              num = {9}
          />
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>！这是工具</Text>
            </View>
        );
    }
}

class Mypage extends React.Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
        <ImageComponent
                      focused = {focused}
                      tintColor = {tintColor}
                      imgSrc1 = {require('./images/我的.png')}
                      imgSrc2 = {require('./images/我的1.png')}
                      num = {10}
                  />
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>！这是我的</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    points: {

       height:14,
       backgroundColor:'red',
       borderRadius:10,
       position:'absolute',
       left:24,
       top:-3,
       paddingLeft:4,
       paddingRight:4,
       color:'white',
       fontSize:10,
       lineHeight:14
    }
});


const MyApp = TabNavigator(
    {
        Home: {
            screen: Home,
        },
        Circle: {
            screen: Circle,
        },
        Tools: {
            screen: Tools,
        },
        Mypage: {
            screen: Mypage,
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#f85a59',
            inactiveTintColor: '#000',
            showIcon: true,
            showLabel: true,
            upperCaseLabel: false,
            pressColor: '#f85a59',
            pressOpacity: 0.8,
            style: {
                backgroundColor: '#fff',
                paddingBottom: 0,
                borderTopWidth: 0.5,
                borderTopColor: '#ccc',
            },
            labelStyle: {
                fontSize: 12,
                margin: 1
            },
            indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        backBehavior: 'none',
    });

module.exports = MyApp;