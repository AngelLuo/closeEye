var React = require('react-native');
var Util = require('./util');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBarIOS,
  TouchableOpacity,
  ScrollView,
  Navigator
  } = React;


var Photo = React.createClass({
  render: function(){
    return (
      <View style={[styles.flex_1, styles.center]}>
        <Image style={styles.img} source={{uri: this.props.url}}/>
        <Text>{this.props.num}号</Text>
      </View>
    );
  }
});


module.exports = React.createClass({
  render: function() {
    var data = this.props.data;
    var room_num = data.room.room_num;
    var img = Util.avatarImg;
    var items = [];
    var len = parseInt(data.room.all_counts);
    //用于判断用户的身份识别
    var policeStr =  '@' + data.room.police.join('@') + '@';
    var killerStr = '@' + data.room.killer.join('@') + '@';

    for(var i = 0; i < len; i++){
      if(i % 3 === 0){
        var row = [];
        //循环产生3个头像
        for(var j = 0; j < 3; j++){
          var index = i + j; //编号
          //编号必须在数组长度内
          if(index < len){
            var url = img.people;
            if(policeStr.indexOf('@' + index+ '@') >= 0){
              url = img.police;
            }

            if(killerStr.indexOf('@' + index+ '@') >= 0){
              url = img.killer;
            }
            row.push(
              <Photo num={index + 1} url={url}/>
            );
          }
        }

        items.push(
          <View style={[styles.row, {height:90, marginTop:10, borderTopWidth: Util.pixel, borderColor:'#ccc'}]}>
            {row}
          </View>
        );
      }

    }

    return (
      <ScrollView style={[styles.flex_1]}>

        <View style={styles.room_num}>
          <Text style={{fontSize:35, color:'#F70225'}}>
            {room_num}
          </Text>
          <Text style={{color:'#000', fontSize:14}}>(房间号)</Text>
        </View>
        {items}
        <TouchableOpacity style={[styles.btn, styles.center]} onPress={this._gameOver}>
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:15}}>结束游戏</Text>
        </TouchableOpacity>
        <View style={{height:30}}>
        </View>
      </ScrollView>
    );
  },
  //结束游戏
  _gameOver: function(){
    var data = this.props.data;
    var client_id = this.props.client_id;
    var room_num = data.room.room_num;

    var path = 'gameover?client_id=' + client_id;
    path += '&room_num=' + room_num;

    var that = this;
    Util.get(path, function(data){
      if(data.status){
        alert('游戏结束');
        that.props.navigator.popToTop();
      }else{
        that.props.navigator.popToTop();
      }
    });

  }
});

var styles = StyleSheet.create({
  flex_1:{
    flex:1
  },
  row:{
    flexDirection:'row'
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  img:{
    borderWidth: Util.pixel,
    height:65,
    width:65,
    borderRadius:4,
    resizeMode: Image.resizeMode.contain
  },
  btn:{
    marginLeft:30,
    marginRight:30,
    height:40,
    borderWidth:Util.pixel,
    marginTop:30,
    borderRadius:5,
    borderColor:'#1BB7FF',
    backgroundColor:'#1BB7FF'
  },
  room_num:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:25
  }
});