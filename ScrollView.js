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
import axois from 'axios'
import  Video from 'react-native-video'
import { Icon } from './PublicComponent.js'

const { width, height } = Dimensions.get('window');

class ListItemBottom extends React.Component {
     render(){
     let data = this.props.data;
        return(
           <View style={{flexDirection:'row', height:20,alignItems: 'center', justifyContent:'space-between'}}>
               <View style={{flexDirection:'row', height:20, alignItems: 'center'}}>
                    <Text style={{fontSize:10, marginRight:16}}>{data.author}</Text>
                    <Text style={{fontSize:10, marginRight:16}}>{data.pinglun}</Text>
                    <Text style={{fontSize:10, marginRight:16}}>{data.updataTime}</Text>
                    {
                      data.flage == true ? <Text style={{fontSize:10, marginRight:16, color:'red'}}>置顶</Text> : <Text></Text>
                    }
               </View>
               <Image
                source={require("./images/x.png")}
                style={{width:15, height:15}}
                resizeMode="contain"
               />
           </View>
        )

     }

}

class ListItem1 extends React.Component {
     render(){
     let data = this.props.data;
       return(
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.goDetailPage.bind(this)}
            >
                <View style={{paddingTop:20, paddingBottom:5, borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#e8e8e8' }}>
                    <View>
                        <Text style={{color:'#000000', fontSize:18, fontWeight:'bold'}}>
                         {data.title}
                        </Text>
                    </View>
                    <ListItemBottom data={data}/>
                </View>
            </TouchableOpacity>
            )
     }
     goDetailPage(){
       this.props.goDetailPage(this.props.data.id)

     }
}
class ListItem2 extends React.Component {
    render(){
    let data = this.props.data;
    return(
          <View style={{paddingTop:20, paddingBottom:5, borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#e8e8e8' }}>
             <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:16}}>
                    {data.title}
                  </Text>
                </View>
                <View style={{width:120, height:80, backgroundColor:'red'}}>
                   <Image
                    style={{width:120, height:80}}
                    source={require("./images/1.jpg")}
                    resizeMode="cover"
                   />
                </View>
             </View>
             <ListItemBottom data={data}/>
          </View>
      )
    }

}
class ListItem3 extends React.Component {
     render(){
     let data = this.props.data;
        return(
           <View  style={{paddingTop:20, paddingBottom:5, borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#e8e8e8' }}>
              <View>
                 <Text style={{fontSize:16, color:"black"}}>{data.title}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
                   <Image
                      style={{width:120, height:80}}
                      source={require("./images/3.jpg")}
                      resizeMode="contain"
                    />
                  <Image
                    style={{width:120, height:80}}
                    source={require("./images/4.jpg")}
                    resizeMode="contain"
                 />
                   <Image
                    resizeMode="contain"
                    style={{width:120, height:80}}
                    source={require("./images/5.jpg")}
                  />
              </View>
              <ListItemBottom data={data}/>
           </View>
        )
     }
}



class Loading extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0)
    }

    componentDidMount() {
      Animated.loop(Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.circle,
        }
      )).start()
    }
    render() {
    let { fadeAnim } = this.state;
    let rotateZValue = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
      return(
        <Animated.Image                 // 使用专门的可动画化的Image组件
            source={this.props.src}
            style={{
              ...this.props.style,
              transform: [
                  { rotateZ: rotateZValue }
              ],
            }}
          >
          </Animated.Image>
      )
    }
}

class ListItem4 extends React.Component {
     state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
        flage:0
     }
     VideoPlay(){
             this.setState((preState, props) => ({
                paused: !preState.paused
             }))
             if(this.state.paused) {
                this.setState({
                   flage:1
                })
             }else{
                this.setState({
                    flage:0
                })
             }
     }
     render(){
       let stateIcon = null;
       let data = this.props.data;
         if(this.state.flage == 0){
            stateIcon = (
                        <Icon
                            src={require("./images/播放.png")}
                            IconStyle={{width:40, height:40}}
                          />)
             }else if(this.state.flage == 1){
            stateIcon = (<Loading
                   src={require("./images/Loading.png")}
                   style={{width:40, height:40}}
                 />)
             }else{
             stateIcon = (<View></View>)
             }
       return(
       <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.VideoPlay.bind(this)}>
          <View style={{paddingTop:20, paddingBottom:5, borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#e8e8e8' }}>
             <Text style={{fontSize:16, color:"black",marginBottom:10}}>
                 MU单机版，一人一服，怪是你的，装备都是你的，成龙大哥也在玩啊。
             </Text>
             <View style={{height:200,marginBottom:10, backgroundColor: 'black', position:'relative'}}>
                <Video
                 source={require("./images/1.mp4")}
                 onBuffer={this.onBuffer.bind(this)}                // Callback when remote video is buffering
                 onError={this.videoError}               // Callback when video cannot be loaded
                 style={styles.backgroundVideo}
                 onLoad={this.onLoad.bind(this)}//加载媒体并准备播放时调用的回调函数。
                 onProgress={this.onProgress.bind(this)}//视频播放过程中每个间隔进度单位调用的回调函数
                 onEnd={this.onEnd}//视频播放结束时的回调函数
                 paused={this.state.paused}//暂停
                 resizeMode="cover"
                 repeat={true}

                />
                <View  style={{height:200, position:'absolute', top: 0, left:0, width:'100%', alignItems:'center', justifyContent:'center', zIndex:10}}>
                 { stateIcon }
                </View>
             </View>
             <ListItemBottom data={data}/>
          </View>
        </TouchableOpacity>
       )
     }
     onBuffer(e){
        console.log(e, "ppppppsss")
     }
     onProgress(e){
      if(!this.state.paused){
        this.setState({
          flage:2
        })
      }else{
        this.setState({
          flage:0
        })
      }

     }
     onLoad(e){
        console.log(e, "onLoad")
        if(!this.state.paused){
          this.setState({
              flage:1
           })
        }
     }
     onEnd(e){
        console.log(e, 'onEnd')
     }


}
class InputComponet extends React.Component {
     render(){
        return(
        <View style={{height:42,paddingLeft:10,
                      paddingRight:10,
                      borderRadius:4,backgroundColor:'#ffffff',
                      flexDirection:'row',alignItems:'center'}}>
              <View>
                <Image
                 style={{width:30, height:30}}
                 source={require("./images/toutiao.jpg")}
                 resizeMode="contain"
                />
              </View>
              <View style={{flex:1, marginLeft:10, marginRight:10}}>
                   <Text numberOfLines={1} ellipsizeMode="tail">住房公积金贷款流程 | 住房公积金贷款流程 | 住房公积金贷款流程 | 住房公积金贷款流程 </Text>
              </View>
              <View style={{width:30, height:30}}>
                <Image
                 style={{width:30, height:30}}
                 resizeMode="contain"
                 source={require('./images/search.jpg')}
                />
              </View>
        </View>
        )
     }
}

class TabComponent extends React.Component {
     render(){
        let tabArr = this.props.tabArr;
        let items = [];
        tabArr.map((item, index) => {

        var flage = index == this.props.tabSelectIndex ? true:false;
        var component = null;
            if(flage){
              component = (<Text  key={index} style={{paddingLeft:10, paddingRight:10, fontSize:16, color: 'red'}} onPress={this.foo.bind(this,index)}>
                                {item}
                           </Text>)
            }else{
              component = (<Text  key={index} style={{paddingLeft:10, paddingRight:10, fontSize:16}} onPress={this.foo.bind(this,index)}>
                                {item}
                           </Text>)
            }
            items.push(component)
        })
        return(
           <View>
           <ScrollView
           horizontal={true}
           pagingEnabled={true}   //当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为false。
           showsHorizontalScrollIndicator={false}
           >
            {items}

           </ScrollView>

           </View>
        )
     }
     foo(index){
       this.props.pressEvent(index)
     }
}

export default class ScrollViewPage extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
           arr:[
             {
               title: "【独家V观】习近平：太空探索永无止境 要继续乘胜前进",
               author: '中央新闻移动网',
               pinglun: '309评论',
               updataTime: '38分钟前',
               flage: true,
               type:1,
               id:0
             },
             {
                title: "习近平的这 “三问” 媒体工作者要谨记在心",
                author: '中央网新闻',
                pinglun: '280评论',
                updataTime: '1小时前',
                flage: true,
                type:1,
                id:1
             },
             {
                title: " 王者荣耀又出新英雄了，大家快来玩啊！",
                author: '中国游戏网',
                pinglun: '280评论',
                updataTime: '1小时前',
                flage: false,
                type:2,
                id:2
             },
             {
                 title: "世界上最贵的两个鱼缸，一个建造花费2个亿，一个能蓄水924吨",
                 author: '中国游戏网',
                 pinglun: '280评论',
                 updataTime: '1小时前',
                 flage: false,
                 type:3,
                 id:3
              },
             {
                title: "MU单机版，一人一服，怪是你的，装备都是你的，成龙大哥也在玩啊。",
                author: '中国游戏网',
                pinglun: '280评论',
                updataTime: '1小时前',
                flage: false,
                type:4,
                id:4
             }
           ],
           srr:[],
           tabArr:['推荐', '小视频', '视频', '热点', '杭州', '娱乐', '小视频', '视频', '热点', '杭州', '娱乐'],
           tabSelectIndex:0
       };
     }
     render(){
     let items = [];
     let listItmes = this.state.arr.map((item,index) => {
            let component = null;
            switch(item.type){
               case 1 :
                 component = <ListItem1 key={item.id} data={item} goDetailPage={this.goDetailPage.bind(this)}/>
                 break;
               case 2 :
                  component = <ListItem2 key={item.id} data={item} />
                 break;
               case 3:
                 component = <ListItem3 key={item.id} data={item} />
                 break;
               case 4:
                component = <ListItem4 key={item.id} data={item} />
                break;
            }
            items.push(component);
     })
     return(
          <View style={{flex:1}}>
              <View style={{height:54, backgroundColor:'#d33d3e', paddingLeft:16, paddingRight:16,paddingVertical:6}}>
                  <InputComponet/>
              </View>
              <View style={{height:36, backgroundColor:"#ffffff", justifyContent:'center', borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#e8e8e8'}}>
                  <TabComponent
                    tabArr={this.state.tabArr}
                    tabSelectIndex={this.state.tabSelectIndex}
                    pressEvent={this.TabPress.bind(this)}
                  />
              </View>
              <View style={{flex:1, backgroundColor:"#fff"}}>
                <ScrollView
                 style={{paddingRight:16, paddingLeft:16}}
                >

                    {items}
                 </ScrollView>
              </View>
          </View>
          )
     }
     TabPress(index){
        console.log("TabPress", index)
        this.setState({
            tabSelectIndex:index
        })
     }
     goDetailPage(id){
       console.log(id)
       console.log(this.props)
       this.props.navigation.navigate('Detail')
     }
     componentDidMount(){
     console.log("pppppp")
//       var send_data = {
//             key:'54b561d24da1de970d831316fde3a964',
//             type:'top'
//       }
//       axois.get("http://v.juhe.cn/toutiao/index?key=54b561d24da1de970d831316fde3a964&type=top&page=3&pageSize=100").then((data) => {
//          console.log(data.data.result.data,"ooooooooooo");
//          this.setState({
//             arr:data.data.result.data
//          })
//       })
     }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    paddingLeft:10,
    paddingRight:10
  },
  ListItemBox: {
    width: 100,
    backgroundColor:'yellow',
    height:200,
  },
  separator: {
    borderBottomColor: '#ededed',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  ItemBox: {
    backgroundColor:'red',
  },
  selectItem: {
    color: 'red'
  },
  backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
});
