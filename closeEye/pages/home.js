var React = require('react-native');
var Util = require('./util');
var Create = require('./create_room');
var Join = require('./join');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBarIOS,
  TouchableOpacity,
  Navigator,
  AdSupportIOS
  } = React;

module.exports =  React.createClass({
  getInitialState: function(){
    return {
      room_num: '0000'
    };
  },
  render: function(){
    return (
      <View style={styles.container}>

        <View style={styles.title}>
          <Text style={{fontSize:20,}}>天黑，请闭眼</Text>
        </View>

        <View style={styles.textInputView}>
          <TextInput style={styles.textInput} placeholder="请输入房间号" keyboardType="numeric" onChangeText={this._setRoomNum}/>
        </View>

        <TouchableOpacity style={[styles.btn, {marginTop:10}]} onPress={this._joinHome}>
          <Text style={styles.btnText}>进入房间</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, {backgroundColor:'#5EBE00'}]} onPress={this._loadPage}>
          <Text style={styles.btnText}>创建房间</Text>
        </TouchableOpacity>

      </View>
    );
  },
  _setRoomNum: function(val){
    this.setState({
      room_num: val
    });
  },
  //创建房间
  _loadPage: function(){
    this.props.navigator.push({
        component: Create
    });
  },
  //进入房间
  _joinHome: function(){
    var that = this;
    var room_num = this.state.room_num;
    AdSupportIOS.getAdvertisingTrackingEnabled(function(e){
      if(e){
        AdSupportIOS.getAdvertisingId(function(uuid){
          var client_id = uuid;
          var path = 'join?client_id=' + client_id;
          path += '&room_num=' + room_num;
          Util.get(path, function(data){
            if(data.status){
              that.props.navigator.push({
                component: Join,
                passProps:{
                  data: data
                }
              });
            }else{
              alert('进入房间失败');
            }
          });

        }, function(){
          alert('无法获取用户唯一标示');
        });
      }
    }, function(e){
      alert('无法获取设备唯一标识，请关闭设置->隐私->广告->限制广告跟踪');
    });
  }

});

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFF'
  },
  textInputView:{
    height:40,
    marginTop:20,
    marginLeft:10,
    marginRight:10
  },
  textInput:{
    flex:1,
    borderWidth:Util.pixel,
    padding:5,
    height:35,
    borderColor:'#ABABAB',
    borderRadius:4,
    backgroundColor:'#fff'
  },
  title:{
    height:40,
    marginTop:50,
    alignItems:'center',
    justifyContent:'center'
  },
  btn:{
    marginTop:10,
    backgroundColor:'#FF8400',
    height:42,
    marginLeft:10,
    marginRight:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4
  },
  btnText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  }
});