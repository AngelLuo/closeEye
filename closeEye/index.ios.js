
var React = require('react-native');
var Home = require('./pages/home');
var create = require('./pages/create');
var judge = require('./pages/judge');

var {
  AppRegistry,
  Navigator,
  } = React;

//var App = React.createClass({
//  render: function(){
//    return(
//      <Navigator
//        initialRoute={{name: 'home', component: Home, index:0}}
//        configureScene={()=>{return Navigator.SceneConfigs.FloatFromRight;}}
//        renderScene={(route, navigator) => {
//          if (route.component) {
//            return React.createElement(route.component, { navigator });
//          }
//        }}
//        />
//    );
//  }
//});




AppRegistry.registerComponent('closeEye', () => judge);
