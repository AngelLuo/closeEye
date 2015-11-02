
var React = require('react-native');
var Home = require('./pages/home');
var judge = require('./pages/judge');

var {
  AppRegistry,
  Navigator,
  View
  } = React;


window.navigator.userAgent = "react-native-closeEye";
var io = require('socket.io-client/socket.io');

var socket = io.connect('http://localhost:3000');

socket.on('link', function (data) {
  console.log('连接成功');
});


socket.on('showMember', function (data) {
  alert('显示用户');
});



var App = React.createClass({
  getInitialState: function(){
    return null;
  },
  render: function(){
    return(
      <Navigator
        initialRoute={{name: 'home', component: Home, index:0}}
        configureScene={()=>{return Navigator.SceneConfigs.FloatFromBottom;}}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return (
            <View style={{flex: 1}}>
              <Component navigator={navigator} route={route} {...route.passProps}/>
            </View>
          )
        }}
        />
    );
  }
});




AppRegistry.registerComponent('closeEye', () => App);
