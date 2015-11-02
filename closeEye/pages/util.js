var React = require('react-native');
var Dimensions = require('Dimensions');


var {
  PixelRatio,
  AlertIOS
  } = React;

var Util = {

  pixel: 1 / PixelRatio.get(), /*单位像素*/

  size: { /*屏幕尺寸*/
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
};



/**
 * XMLHttpRequest POST
 * @method fetch
 * @param {string} url 请求的URL
 * @param {object} data
 * @param {function} callback 请求完成的callback
 * @return {null} 没有返回值
 */

Util.fetch = function(url, data, callback){
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open('POST', url);
  xmlHttp.send(data);

  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState === 4){
      if (xmlHttp.status === 200) {
        var text = xmlHttp.responseText;
        callback(JSON.parse(text));
      } else {
        alert('请重试');
      }
    }else{
      alert('服务异常');
    }
  };

};


/**
 * 基于fetch的POST方法
 * @method post
 * @param {string} url
 * @param {object} data
 * @param {function} successCallback 成功的回调
 * @param {function} errCallback 失败的回调
 * @return {null} 没有返回值
 */

Util.post = function (url, data, successCallback, errCallback) {

  var fetchOptions = {
    method: 'POST',
    headers: {
      'Content-length': data.length
    },
    body: data
  };

  fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
        successCallback(JSON.parse(responseText));
    })
    .catch(function(err){
      errCallback(err);
    });
};

//服务请求基础URL
Util.baseURL = 'http://localhost:3000/';

//用户身份头像
Util.avatarImg = {
  police: 'http://vczero.github.io/ctrip/jincha.png',
  killer: 'http://vczero.github.io/ctrip/shashou.png',
  people: 'http://vczero.github.io/ctrip/pingmin.png'
};

/**
 * 基于fetch的get方法
 * @method post
 * @param {string} url
 * @param {function} callback 回调
 * @return {null} 没有返回值
 */
Util.get = function(path, callback){
  var url = Util.baseURL + path;
  fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    })
    .catch(function(err){
      alert('功能出错，请联系XXX－XXXX');
    });
};



module.exports = Util;