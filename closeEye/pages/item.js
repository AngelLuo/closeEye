var React = require('react-native');
var Util = require('./util');
var Photo = require('./photo');

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
        for(var j = 0; j < 3; j++){
          var index = i + j;
          if(index < len){
            var url = defaultURL;
            if(partnerStr.indexOf('@' + index + '@') >= 0){
              url = avatar;
            }
            items.push(
              <Photo num={index + 1} url={url}/>
            );
          }
        }

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
  row: {
    flexDirection:'row'
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  }
});