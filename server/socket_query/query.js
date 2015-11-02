
var fs = require('fs');
var FILE_NAME = './db.json';


module.exports = function(socket){


  /**
   * 测试socket.io是否联通
   * @method: link 触发事件
   */
  socket.emit('link', {message: "socket.io服务启动"});

  /**
   * 加入房间操作，两个作用：（1）更新数据库 （2）刷新所有用户界面
   *
   * @param {number} allCounts
   * @param {number} policeCounts
   * @param {number} killerCounts
   * @return {object}
   * @api private
   */
  socket.on('joinRoom', function (message) {
    var client_id = message.client_id; /*用户的设备ID*/
    var room_num = message.room_num; /*房间号*/
    //写进数据库
    var db = null;
    //读取数据
    try{
      db = JSON.parse(fs.readFileSync(FILE_NAME).toString());
    }catch(e){
      return res.send({
        status: 0,
        info:'读取数据失败'
      })
    }

    for(var i in db){
      if(db[i].room_num === room_num){
        var room = db[i];
        //(1)直接进入
        for(var j in room.people){
          if(room.people[j] && room.people[j].client_id === client_id){
            var msgObj = {
              status:1,
              all_counts: room.all_counts,
              num: j
            };
            return socket.emit('roomShow', msgObj);
          }
        }
        //(2)房主，返回所有信息
        if(room.create_id === client_id ){
          delete room.people;
          var msgObj = {
            status:1,
            type: 'admin_room', /*房主，即创建者*/
            room: room
          };
          return socket.emit('roomShow', msgObj);
        }

        //(3)房间人数已满，拒绝进入
        if(room.people.length >= room.all_counts){
          var msgObj = {
            status: 0,
            info: '房间人数已满'
          };
          return socket.emit('roomShow', msgObj);
        }

        //(4)如果第一次进入，则添加进数据库
        room.people.push({
          client_id: client_id,
          count: 0,
          is_over: 'false'
        });

        try{
          //写入到db.json
          fs.writeFileSync(FILE_NAME, JSON.stringify(db));
          //返回第一次进入的编号
          var index = room.people.length - 1;
          var msgObj = {
            status: 1,
            all_counts: room.all_counts,
            num: index
          };
          return socket.emit('roomShow', msgObj);
        }catch(e){
          var msgObj = {
            status: 0,
            info: '服务出错'
          };
          return socket.emit('roomShow', msgObj);
        }
      }
    }

    return socket.emit('roomShow', {
      status: 0,
      info: '该房间已过期'
    });

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
