var React = require('react-native');
var Util = require('./util');
var Judge = require('./judge');

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
  AdSupportIOS
  } = React;

module.exports = React.createClass({
  getInitialState: function(){
    return {
      all_counts: '6',
      police_counts: '1',
      killer_counts: '1',
      people_counts: '4',
      is_create: false
    };
  },
  render: function(){
    return (
      <ScrollView style={{flex:1}}>

        <View style={{height:280}}>
          <View style={[styles.row, styles.m10, {marginTop:30}]}>
            <Text style={styles.w70}>总人数</Text>
            <TextInput style={styles.input} keyboardType="numeric" defaultValue="6"
                       onChangeText={this._allCounts} textAlign="center"/>
          </View>

          <View style={[styles.row,styles.m10]}>
            <Text style={styles.w70}>警察</Text>
            <TextInput style={styles.input} keyboardType="numeric" defaultValue="1"
                       onChangeText={this._policeCounts} textAlign="center"/>
          </View>

          <View style={[styles.row,styles.m10]}>
            <Text style={styles.w70}>杀手</Text>
            <TextInput style={styles.input} keyboardType="numeric" defaultValue="1"
                       onChangeText={this._killerCounts} textAlign="center"/>
          </View>

          <View style={[styles.row,styles.m10]}>
            <Text style={styles.w70}>平民</Text>
            <TextInput style={styles.input} keyboardType="numeric" defaultValue="4"
                       onChangeText={this._peopleCounts} textAlign="center"/>
          </View>

          <TouchableOpacity style={styles.btn} onPress={this._createRoom}>
            <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>生成房间</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  },

  _allCounts: function(val){
    this.setState({
      all_counts: val
    });
  },

  _peopleCounts: function(val){
    this.setState({
      people_counts: val
    });
  },

  _policeCounts: function(val){
    this.setState({
      police_counts: val
    });
  },

  _killerCounts: function(val){
    this.setState({
      killer_counts: val
    });
  },

  _createRoom: function(){
    var all_counts = parseInt(this.state.all_counts);
    var police_counts = parseInt(this.state.police_counts);
    var killer_counts = parseInt(this.state.killer_counts);
    var p_c = parseInt(this.state.people_counts);
    var people_counts = all_counts - police_counts - killer_counts;

    if(people_counts < 0 || p_c !== people_counts){
      return alert('总人数与设定人数不符，请检查!');
    }

    var that = this;
    var path = 'create?all_counts=' + all_counts;
    path += '&police_counts=' + police_counts;
    path += '&killer_counts=' + killer_counts;

    AdSupportIOS.getAdvertisingTrackingEnabled(function(e){
      if(e){
        AdSupportIOS.getAdvertisingId(function(uuid){
          var client_id = uuid;
          path += '&client_id=' + client_id;

          Util.get(path, function(data){
            if(data.status){
              that.props.navigator.push({
                component: Judge,
                passProps:{
                  data: data,
                  client_id: client_id
                }
              });
            }else{
              alert('创建房间失败');
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