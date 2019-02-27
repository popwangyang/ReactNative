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
} from 'react-native';



export const Icon =  class Icon1 extends React.Component {
    render(){
    let data = this.props.data ? this.props.data:this.props;
       return(
        <TouchableOpacity style={data.IconStyle} onPress={this.btn.bind(this)}>
         <View>
           <Image
            source={data.src}
            style={data.IconStyle}
           />
         </View>
        </TouchableOpacity>
       )
    }
    btn(){
    let data = this.props.data ? this.props.data:this.props;
      if(data.BtnEvent){
        data.BtnEvent()
      }
    }
}