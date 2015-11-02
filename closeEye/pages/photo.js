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

module.exports = React.createClass({
  render: function(){
    return (
      <View style={[styles.flex_1, styles.center]}>
        <Image style={styles.img} source={{uri: this.props.url}}/>
        <Text>{this.props.num}号</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex_1: {
    flex: 1,
    borderRightWidth:Util.pixel,
    borderTopWidth:Util.pixel,
    borderBottomWidth:Util.pixel
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
    resizeMode: Image.resizeMode.contain,
    marginTop:6,
    borderColor: '#ccc'
  }
});