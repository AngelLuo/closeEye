
var fs = require('fs');
var FILE_NAME = './db.json';


module.exports = function(socket){


  /**
   * 测试socket.io是否联通
   * @method: link 触发事件
   */
  socket.emit('link', {message: "socket.io服务启动"});

  socket.on('messageSender', function(data){
    var room_num = data.room_num;
    var msg = data.msg;
    var index = data.index;
    var num = data.num;

    //公共频道
    if(index === 0){
      socket.emit(room_num + '_messageSender_common', {msg: msg, num: num});
    }else{
      socket.emit(room_num + '_messageSender_special', {msg: msg, num: 'XX说：'});
    }

  });




  //触发客户端更新

  ////加入某个房间
  ////该房间1～n号都能进
  //socket.join(room_num);
  ////查询用户信息
  //var userInfo = query.getUserTypeByClientID(client_id, room_num);
  //
  ////加入身份房间
  ////警察和杀手分别进入自己的房间
  //if(userInfo.type === 'police' || userInfo.type === 'killer'){
  //  socket.join(room_num + '_' + userInfo.type);
  //}

  //显示加入过程
  //socket.on('showMember', function(message){
  //  var room_num = message.room_num;
  //
  //
  //});
  //
  ////根据房间号广播消息
  //socket.on('day_broadcast', function(room_num, message){
  //  //向所有的同伴广播消息，包括自己
  //  io.sockets.in(room_num).emit('message', message);
  //});
  //
  ////杀手间广播消息
  //socket.on('killer_broadcast', function(client_id, room_num, message){
  //  var userInfo = query.getUserTypeByClientID(client_id, room_num);
  //  if(userInfo.type === 'killer'){
  //    io.sockets.in(room_num + '_killer').emit('message', message);
  //  }
  //  //else do noting
  //});
  //
  ////警察间广播消息
  //socket.on('police_broadcast', function(client_id, room_num, message){
  //  var userInfo = query.getUserTypeByClientID(client_id, room_num);
  //  if(userInfo.type === 'police'){
  //    io.sockets.in(room_num + '_police').emit('message', message);
  //  }
  //  //else do noting
  //});

  //io.sockets.connected[socket.id].emit('message', '针对单个客户端推送');

};
