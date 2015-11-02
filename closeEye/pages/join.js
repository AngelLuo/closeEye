var React = require('react-native');
var Util = require('./util');
var Item = require('./item');
var Talk = require('./talk');

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
     talk: null
   };
  },

  render: function(){
    var rows = this.state.rows;
    var talk = this.state.talk;
    return (
      <ScrollView>
        <View style={styles.room_num}>
          <Text style={{fontSize:35, color:'#F70225'}}>{this.props.room_num}</Text>
        </View>
        {rows}
        {talk}
      </ScrollView>
    );

  },

  componentDidMount: function(){
    var data = this.props.data;
    if(data.status){

      if(data.type && data.type !== 'admin_room'){
        this.setState({
          rows: <Item data={data}/>,
          talk: <Talk/>
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

