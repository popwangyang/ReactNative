import React , { Component } from 'react';
import {
     StyleSheet,
     ScrollView,
     View,
     Text,
     TextInput,
     Image,
     Dimensions
} from 'react-native';
import axois from 'axios'
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
            <View style={{paddingTop:20, paddingBottom:5, borderBottomWidth:StyleSheet.hairlineWidth*3, borderBottomColor: '#e8e8e8' }}>
                <View>
                    <Text style={{color:'#000000', fontSize:18, fontWeight:'bold'}}>
                     {data.title}
                    </Text>
                </View>
                <ListItemBottom data={data}/>
            </View>
            )
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
                    resizeMode="contain"
                   />
                </View>
             </View>
             <ListItemBottom data={data}/>
          </View>
      )
    }

}
class InputComponet extends React.Component {
     render(){
        return(
        <View style={{height:42,paddingLeft:10,paddingRight:10, borderRadius:4,backgroundColor:'#ffffff',flexDirection:'row',alignItems:'center'}}>
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
                 component = <ListItem1 key={item.id} data={item}/>
                 break;
               case 2 :
                  component = <ListItem2 key={item.id} data={item}/>
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
              <View style={{flex:1, backgroundColor:"#fff", paddingRight:16, paddingLeft:16}}>
                <ScrollView>
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
  }
});
