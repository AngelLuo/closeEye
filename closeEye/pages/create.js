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
  getInitialState: function(){
    return {
      all_counts: '6',
      police_counts: '1',
      killer_counts: '1',
      people_counts: '4'
    };
  },
  render: function(){
    return (
      <View style={{flex:1}}>

        <View style={[styles.row, styles.m10, {marginTop:40}]}>
          <Text style={styles.w70}>总人数</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue={this.state.all_counts}
                     value={this.state.all_counts} onChangeText={this._allCounts} textAlign="center"/>
        </View>

        <View style={[styles.row,styles.m10]}>
          <Text style={styles.w70}>警察</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue={this.state.police_counts}
                     value={this.state.police_counts} onChangeText={this._policeCounts} textAlign="center"/>
        </View>

        <View style={[styles.row,styles.m10]}>
          <Text style={styles.w70}>杀手</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue={this.state.killer_counts}
                     value={this.state.killer_counts} onChangeText={this._killerCounts} textAlign="center"/>
        </View>

        <View style={[styles.row,styles.m10]}>
          <Text style={styles.w70}>平民</Text>
          <TextInput style={styles.input} keyboardType="numeric" defaultValue={this.state.people_counts}
                     editable={false}  value={this.state.people_counts} textAlign="center"/>
        </View>

        <TouchableOpacity style={styles.btn} onPress={this._createRoom}>
          <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>生成房间</Text>
        </TouchableOpacity>
      </View>
    );
  },

  _allCounts: function(val){
    this.setState({
      all_counts: parseInt(val)
    });
  },

  _policeCounts: function(val){
    this.setState({
      police_counts: parseInt(val)
    });
  },

  _killerCounts: function(val){
    this.setState({
      killer_counts: parseInt(val)
    });
  },

  _createRoom: function(){
    Util.get('create?all_counts=6&police_counts=1&killer_counts=1', function(data){
      alert(JSON.stringify(data));
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