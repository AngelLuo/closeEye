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
  render: function() {
    return (
      <ScrollView style={[styles.flex_1]}>

        <View style={[styles.row, {height:90, marginTop:20}]}>
          <View style={[styles.flex_1, styles.center, styles.border]}>
            <Image style={styles.img}/>
            <Text>1号</Text>
          </View>
          <View style={[styles.flex_1, styles.center, styles.border]}>
            <Image style={styles.img}/>
            <Text>2号</Text>
          </View>
          <View style={[styles.flex_1, styles.center, styles.border]}>
            <Image style={styles.img}/>
            <Text>3号</Text>
          </View>
        </View>

        <View style={[styles.row, {height:90, marginTop:20}]}>
          <View style={[styles.flex_1, styles.center, styles.border]}>
            <Image style={styles.img}/>
            <Text>4号</Text>
          </View>
          <View style={[styles.flex_1, styles.center, styles.border]}>
            <Image style={styles.img}/>
            <Text>5号</Text>
          </View>
          <View style={[styles.flex_1, styles.center, styles.border]}>
            <Image style={styles.img}/>
            <Text>6号</Text>
          </View>
        </View>

        <View style={[styles.btn, styles.center]}>
          <Text>结束</Text>
        </View>
      </ScrollView>
    );
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
  border:{
    borderWidth: Util.pixel
  },
  img:{
    borderWidth: Util.pixel,
    height:65,
    width:65,
    borderRadius:4
  },
  btn:{
    marginLeft:30,
    marginRight:30,
    height:40,
    borderWidth:Util.pixel,
    marginTop:30,
    borderRadius:5,
    borderColor:'#DDD'
  }
});