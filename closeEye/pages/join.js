var React = require('react-native');
var Util = require('./util');
var Item = require('./item');

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
     rows: null
   };
  },

  render: function(){
    var rows = this.state.rows;

    return (
      <ScrollView>
        <View style={styles.room_num}>
          <Text style={{fontSize:35, color:'#F70225'}}>{this.props.room_num}</Text>
        </View>
        {rows}
      </ScrollView>
    );

  },

  componentDidMount: function(){
    var data = this.props.data;
    if(data.status){
      
      if(data.type && data.type !== 'admin_room'){
        this.setState({
          rows: <Item data={data}/>
        });
      }

    }else{
      alert(data.info || '服务出错');
    }
  }
});

var styles = StyleSheet.create({
  room_num:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:25
  }
});

