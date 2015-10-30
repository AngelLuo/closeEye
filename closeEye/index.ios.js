
var React = require('react-native');
var Home = require('./pages/home');
var judge = require('./pages/judge');

var {
  AppRegistry,
  Navigator,
  } = React;


window.navigator.userAgent = "react-native-closeEye";
var io = require('socket.io-client/socket.io');

var socket = io.connect('http://localhost:3000');
socket.on('link', function (data) {
  console.log('连接成功');
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
          if (route.component) {
            return React.createElement(route.component, { navigator });
          }
        }}
        />
    );
  }
});




AppRegistry.registerComponent('closeEye', () => App);
