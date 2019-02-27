import React , { Component } from 'react';
import {
     StyleSheet,
     ScrollView,
     View,
     Text,
     TextInput,
     Image,
     Dimensions,
     TouchableOpacity,
     Animated,
     Easing,
     Modal,
     TouchableHighlight

} from 'react-native';
import { Icon } from './PublicComponent.js';

class BackComponent extends React.Component {
    render() {
       return(

         <View style={{flex:1, alignItem:'center', justifyContent:'center'}}>
            <Icon
             data = {{...this.props}}
            />
         </View>
       )
    }
}

class DetailBottom extends React.Component {
   toValue = 0
  constructor(props) {
    super(props)
    this.state = {
      animationValue: new Animated.Value(0)
    }
    this.pressView = this.pressView.bind(this)
  }
  render() {
     let { animationValue } = this.state

     let toValue = animationValue.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 40, 60 ]
     })
     return(
        <TouchableOpacity
         activeOpacity={1}
         onPress={this.pressView}>
            <Animated.View
             style={{width:'100%',
                     height: toValue,
                     backgroundColor:'white',
                     borderTopWidth:StyleSheet.hairlineWidth*3,
                     borderTopColor: '#b4b4b4',
                     justifyContent:'center',
                     alignItem:'center',
                     paddingLeft:10,
                     paddingRight:10
                     }}
            >
            {this.props.children}
            </Animated.View>
        </TouchableOpacity>
     )
  }
  pressView(){
        console.log('ppppp')
        this.toValue = 1;
        Animated.timing(
        this.state.animationValue,
        {
           toValue: this.toValue,
           duration:500,
           easing: Easing.bounce
        }
        ).start()
  }
}
class InputComponent extends React.Component {
    render(){
       return(
          <View style={{width:'50%', height:40,   justifyContent:'center'}}>
              <TouchableOpacity onPress={this.Btn.bind(this)}>
                 <Text style={{height:30, backgroundColor:'#f4f5f7', borderRadius:15 , lineHeight:30, paddingLeft:10, borderWidth:StyleSheet.hairlineWidth*2, borderColor:'#e8e8e8'}}>
                   {this.props.text}
                 </Text>
              </TouchableOpacity>
          </View>
       )
    }
    Btn(){
      this.props.pingLun()
    }
}



export default class DetailPage extends React.Component {
    state = {
       modalVisible: false
    }
   render(){
      return(
        <View style={{flex:1, backgroundColor:'red'}}>
            <Modal
              animationType="none"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert("Modal has been closed.");
              }}
            >
              <View style={{ marginTop: 22 }}>
                <View>
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <View style={{height:40, backgroundColor:'white', borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#b4b4b4', paddingLeft:10}}>
              <BackComponent
                IconStyle={{width:20, height:20}}
                src={require('./images/back.png')}
                BtnEvent={this.Btn.bind(this)}
              />
          </View>
          <View style={{flex:1, backgroundColor:'white'}}>
          </View>
              <View style={{flexDirection:'row', backgroundColor:'white', alignItems:'center', justifyContent:'space-around',  borderTopWidth:StyleSheet.hairlineWidth*3, borderTopColor: '#b4b4b4'}}>
                      <InputComponent
                      pingLun={ this.setModalVisible.bind(this, true) }
                      text="写评论..." />
                       <Icon
                        src={require("./images/pinglun.png")}
                        IconStyle={{width:26, height:26}}
                       />
                       <Icon
                           src={require("./images/star.png")}
                           IconStyle={{width:26, height:26}}
                          />
                       <Icon
                          src={require("./images/zhuanfa.png")}
                          IconStyle={{width:26, height:26}}
                       />
              </View>
        </View>
      )
   }
   Btn(){
     console.log(this.props.navigation)
     this.props.navigation.goBack()
   }
   componentDidMount(){
     console.log(this.props)
   }
   setModalVisible(visible){
     console.log('Focus')
     this.setState({ modalVisible: visible });
   }
}