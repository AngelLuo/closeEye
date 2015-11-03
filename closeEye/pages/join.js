var React = require('react-native');
var Util = require('./util');
var Item = require('./item');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  } = React;

module.exports = React.createClass({
  getInitialState: function(){
   return {
     rows: null,
     type: '',
     num: 0
   };
  },

  render: function(){
    var rows = this.state.rows;
    return (
      <ScrollView>
        <View style={styles.room_num}>
          <Text style={{fontSize:35, color:'#F70225'}}>{this.props.room_num}</Text>
          <Text>(房间号)</Text>
        </View>
        {rows}
        <View style={{marginLeft:10, marginTop:20}}>
          <Text style={{marginBottom:5}}>编号：{this.state.num}</Text>
          <Text>身份：{this.state.type}</Text>
        </View>
      </ScrollView>
    );

  },

  componentDidMount: function(){
    var data = this.props.data;
    if(data.status){
      if(data.type && data.type !== 'admin_room'){
        var type = '平民';
        if(data.type === 'police'){
          type = '警察';
        }
        if(data.type === 'killer'){
          type = '杀手';
        }
        this.setState({
          rows: <Item data={data}/>,
          type: type,
          num: '你是' + data.num + '号'
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

