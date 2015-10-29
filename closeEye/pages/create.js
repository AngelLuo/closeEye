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
  Navigator
  } = React;

module.exports = React.createClass({
  render: function(){
    return (
      <View style={{flex:1}}>

        <View style={[styles.row, styles.m10, {marginTop:40}]}>
          <Text style={styles.w70}>总人数</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue="6"/>
        </View>

        <View style={[styles.row,styles.m10]}>
          <Text style={styles.w70}>警察</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue="1"/>
        </View>

        <View style={[styles.row,styles.m10]}>
          <Text style={styles.w70}>杀手</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue="1"/>
        </View>

        <View style={[styles.row,styles.m10]}>
          <Text style={styles.w70}>平民</Text>
          <TextInput style={styles.input} keyboardType="numeric" editable={false} defaultValue="4"/>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>生成房间</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    alignItems: 'center'
  },
  m10:{
    marginTop:10,
    paddingLeft:10
  },
  input:{
    flex:1,
    height:35,
    borderWidth:Util.pixel,
    paddingLeft:5,
    marginLeft:10,
    marginRight:10,
    borderRadius:4,
    borderColor:'#ccc'
  },
  w70:{
    width:45
  },
  btn:{
    marginTop:20,
    height:40,
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderRadius:4,
    borderColor:'#FC9720',
    backgroundColor:'#FC9720',
    justifyContent:'center',
    alignItems:'center'
  }
});