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
  render: function(){
    var data = this.props.data;
    var rows = [];
    var len = parseInt(data.all_counts);

    var defaultURL = Util.avatarImg.people;
    //获得特殊头像
    var avatar = Util.avatarImg[data.type];
    var partnerStr =  '@' + data.partner.join('@') + '@';

    for(var i = 0; i < len; i++){
      if(i % 3 === 0){
        var items = [];
        var url_1 = defaultURL;
        if(partnerStr.indexOf('@' + i + '@') >= 0){
          url_1 = avatar;
        }
        items.push(
          <View style={[styles.flex_1, styles.center]}>
            <View>
              <Image source={{uri: url_1}} style={styles.imgWH}/>
            </View>
            <Text>{i + 1}号</Text>
          </View>
        );
        var url_2 = defaultURL;
        if(partnerStr.indexOf('@' + (i + 1) + '@') >= 0){
          url_2 = avatar;
        }
        i + 2 <= len && items.push(
          <View style={[styles.flex_1, styles.center]}>
            <View>
              <Image source={{uri: url_2}} style={styles.imgWH}/>
            </View>
            <Text>{i + 2}号</Text>
          </View>
        );

        var url_3 = defaultURL;
        if(partnerStr.indexOf('@' + (i + 2) + '@') >= 0){
          url_3 = avatar;
        }
        i + 3 <= len && items.push(
          <View style={[styles.flex_1, styles.center]}>
            <View>
              <Image source={{uri: url_3}} style={styles.imgWH}/>
            </View>
            <Text>{i + 3}号</Text>
          </View>
        );

        rows.push(
          <View style={[styles.row, {marginTop:10}]}>
            {items}
          </View>
        );
      }
    }


    return (
      <View style={{flex:1}}>
        <ScrollView>
          {rows}
        </ScrollView>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  chat: {
    position:'absolute',
    left:0,
    top:0,
    right:0,
    height:150,
    borderWidth:1
  },
  row: {
    flexDirection:'row'
  },
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
  imgWH:{
    width:60,
    height:60,
    resizeMode: Image.resizeMode.contain
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