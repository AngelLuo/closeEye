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

module.exports = React.createClass({
  render: function(){
    return (
      <View style={styles.wrapper}>
        <View style={styles.center}>
          <SegmentedControlIOS values={['公共频道', '特殊频道']} selectedIndex={0} style={{width:200}}/>
        </View>
        <View>
          <TextInput style={styles.inputArea} multiline={true} editable={false}/>
        </View>

        <View>
          <TextInput style={styles.input} multiline={true}/>
        </View>

        <TouchableOpacity style={[styles.center, styles.btn]}>
          <Text style={{color:'#fff'}}>发送</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  wrapper:{
    height:200,
    marginTop:20,
  },
  inputArea:{
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    borderWidth:Util.pixel,
    height:150,
    borderColor:'#ABABAB',
    borderRadius:3,
    paddingLeft:10
  },
  input:{
    borderWidth:Util.pixel,
    marginLeft:10,
    marginRight:10,
    height:30,
    borderColor:'#ABABAB',
    borderRadius:3,
    marginTop:10,
    paddingLeft:10,
    fontSize:15
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
