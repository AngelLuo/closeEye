var React = require('react-native');
var Util = require('./util');


var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StatusBarIOS,
  TouchableOpacity,
  Navigator,
  SegmentedControlIOS
  } = React;

var tabMenu = ['公共频道', '特殊频道'];

module.exports = React.createClass({
  getInitialState: function(){
    return {
      msg: '',
      index: 1,
      textSpecial: '',
      textCommon: ''
    };
  },
  render: function(){
    return (
      <View style={styles.wrapper}>
        <View style={styles.center}>
          <SegmentedControlIOS values={tabMenu}
                               onValueChange={this._valueChange}
                               selectedIndex={this.state.index}
                               style={{width:200}}/>
        </View>
        {
          this.state.index ?
            <View style={{height:120}}>
              <ScrollView style={[styles.textShow]}>
                <Text>
                  {this.state.textSpecial}
                </Text>
              </ScrollView>
            </View>
            :
            <View style={{height:120}}>
              <ScrollView style={[styles.textShow]}>
                <Text>
                  {this.state.textCommon}
                </Text>
              </ScrollView>
            </View>
        }

        <View>
          <TextInput style={styles.input} onChangeText={this._sendMsg}/>
        </View>

        <TouchableOpacity style={[styles.center, styles.btn]} onPress={this._sender}>
          <Text style={{color:'#fff'}}>发送</Text>
        </TouchableOpacity>
      </View>
    );
  },

  _sendMsg: function(val){
    this.setState({
      msg: val
    });
  },

  _sender: function(){
    var msg = this.state.msg;
    var index = this.state.index;
    var room_num = this.props.room_num;
    var num = this.props.num;

    socket.emit('messageSender', {
      value: tabMenu[index],
      index: index,
      msg: msg,
      room_num: room_num,
      num: num
    });
  },

  _valueChange: function(val){
    if(val === '公共频道'){
      this.setState({
        index: 0
      });
    }
    if(val === '特殊频道'){
      this.setState({
        index: 1
      });
    }
  },

  componentDidMount: function(){
    var that = this;
    var room_num = this.props.room_num;
    //公共频道
    socket.on(room_num + '_messageSender_common', function(data){
      var text = that.state.textCommon;
      text += data.num + '号说：' + data.msg + '\n' ;
      that.setState({
        textCommon: text
      });
    });
    //特殊频道
    socket.on(room_num + '_messageSender_special', function(data){
      var text = that.state.textSpecial;
      text += data.num + '：' + data.msg + '\n';
      that.setState({
        textSpecial: text
      });
    });
  }
});

var styles = StyleSheet.create({
  wrapper:{
    height:200,
    marginTop:20,
  },
  textShow:{
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    borderWidth:Util.pixel,
    borderColor:'#ABABAB',
    borderRadius:3,
    paddingLeft:5,
    flex:1
  },
  input:{
    borderWidth:Util.pixel,
    marginLeft:10,
    marginRight:10,
    height:35,
    borderColor:'#ABABAB',
    borderRadius:3,
    marginTop:10,
    paddingLeft:10,
    fontSize:15,
    lineHeight:25
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    height:35,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#007AFF',
    marginTop:15,
    borderRadius:4
  }
});
