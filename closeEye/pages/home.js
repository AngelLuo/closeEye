var React = require('react-native');
var Util = require('./util');
var Create = require('./create_room');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBarIOS,
  TouchableOpacity,
  Navigator
  } = React;

module.exports =  React.createClass({
  render: function(){
    return (
      <View style={styles.container}>

        <View style={styles.title}>
          <Text style={{fontSize:20,}}>天黑，请闭眼</Text>
        </View>

        <View style={styles.textInputView}>
          <TextInput style={styles.textInput} placeholder="请输入房间号" keyboardType="numeric"/>
        </View>

        <TouchableOpacity style={[styles.btn, {marginTop:10}]}>
          <Text style={styles.btnText}>进入房间</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, {backgroundColor:'#5EBE00'}]} onPress={this._loadPage}>
          <Text style={styles.btnText}>创建房间</Text>
        </TouchableOpacity>

      </View>
    );
  },
  //创建房间
  _loadPage: function(){
    this.props.navigator.push({
        component: Create
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