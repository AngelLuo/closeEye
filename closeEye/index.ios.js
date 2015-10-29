
var React = require('react-native');
var Home = require('./pages/home');
var create = require('./pages/create');
var judge = require('./pages/judge');

var {
  AppRegistry,
  Navigator,
  } = React;


window.navigator.userAgent = "react-native-closeEye";
var io = require('socket.io-client/socket.io');

var socket = io.connect('http://localhost:3000');
socket.on('news', function (data) {
  console.log(data);
  alert(socket.id);
  socket.emit('my other event', "shsh", {test: 'test'});
});

socket.on('message', function (data) {
  alert(data);
});


var App = React.createClass({
  getInitialState: function(){
    return null;
  },
  render: function(){
    return(
      <Navigator
        initialRoute={{name: 'home', component: Home, index:0}}
        configureScene={()=>{return Navigator.SceneConfigs.FloatFromRight;}}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator });
          }
        }}
        />
    );
  }
});




AppRegistry.registerComponent('closeEye', () => judge);
