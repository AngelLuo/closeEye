var React = require('react-native');
var Util = require('./util');
var Killer = require('./killer');

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
        <View>
          <Text>{this.props.room_num}</Text>
        </View>
        {rows}
      </ScrollView>
    );

  },

  componentDidMount: function(){
    var data = this.props.data;
    if(data.status){

      //平民
      if(data.type && data.type === 'people'){

      }
      //警察
      if(data.type && data.type === 'police'){

      }
      //杀手
      if(data.type && data.type === 'killer'){
        this.setState({
          rows: <Killer data={data}/>
        });
      }

    }else{
      alert(data.info || '服务出错');
    }
  }
});

var styles = StyleSheet.create({

});

