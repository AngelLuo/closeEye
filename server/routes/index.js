var express = require('express');
var router = express.Router();
var fs = require('fs');

var FILE_NAME = './db.json';

/*创建房间*/
/*url: http://localhost:3000/create?all_counts=6&police_counts=1&killer_counts=1*/
router.get('/create', function(req, res, next) {
  //总人数
  var all_counts = parseInt(req.param('all_counts'));
  //警察人数
  var police_counts = parseInt(req.param('police_counts'));
  //杀手人数
  var killer_counts = parseInt(req.param('killer_counts'));
  //设备ID
  var client_id = req.param('client_id');

  if(!all_counts || !police_counts || !killer_counts || !client_id){
    return res.send({
      status: 0,
      info: '参数不完整或者有误'
    });
  }
  //数据表
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

  var num = '';
  //生成房间号
  var room_num = randomRoomNum(num, db);
  //生成身份数组
  var gen = genPeople(all_counts, police_counts, killer_counts);
  if(!gen){
    return res.send({
      status: 0,
      info: '人数有问题'
    });
  }

  var room = {
    "create_id": client_id,
    "room_num": room_num,
    "is_over": "false",
    "all_counts": all_counts,
    "police": gen.policeArr,
    "killer": gen.killerArr,
    "people":[]
  };

  db.push(room);
  //写入到db.json
  try{
    fs.writeFileSync(FILE_NAME, JSON.stringify(db));
    return res.send({status:1, room: room});
  }catch(e){
    return res.send({
      status: 0,
      info: '创建失败'
    });
  }

});


/**
 * 产生可用房间号
 *
 * @param {number} num
 * @param {object} db
 * @return {number}
 * @api private
 */

function randomRoomNum(num, db){
  //生成随即数
  num = '';
  for(var i = 0; i < 4; i++){
    num += parseInt(Math.random()*10).toString();
  }
  //查询是否有重复的房间
  for(var k in db){
    var obj = db[k];
    //重新生成
    if(obj.room_num === num && obj.is_over === 'false'){
      return randomNum();
    }
    //去掉重复房间
    if(obj.room_num === num && obj.is_over === 'over'){
      delete obj;
    }
  }
  return num;
}

/**
 * 生成警察、杀手、平民
 *
 * @param {number} allCounts
 * @param {number} policeCounts
 * @param {number} killerCounts
 * @return {object}
 * @api private
 */
function genPeople(allCounts, policeCounts, killerCounts){
  if(policeCounts >= allCounts || killerCounts >= allCounts || (policeCounts + killerCounts) >= allCounts){
    return null; /*人数不对，返回null对象*/
  }
  //随即数占位
  var arr = [];
  //警察标志
  var policeArr = [];
  //杀手标志
  var killerArr = [];
  //有身份的人数
  var len = policeCounts + killerCounts;

  randomNum(allCounts, policeCounts, arr, 'police', policeArr, killerArr);
  randomNum(allCounts, killerCounts, arr, 'killer', policeArr, killerArr);

  return {
    arr: arr,
    policeArr: policeArr,
    killerArr: killerArr
  };

}


/**
 * 生成随机的身份数组
 *
 * @param {number} allCounts
 * @param {number} typeCounts
 * @param {array} arr
 * @param {string} type
 * @param {array} policeArr
 * @param {array} killerArr
 * @api private
 */
function randomNum(allCounts, typeCounts, arr, type, policeArr, killerArr){
  for(var i = 0; i < typeCounts; i++){
    var num = randomN(allCounts, arr);
    arr.push(num);
    if(type === 'police'){
      policeArr.push(num);
    }
    if(type === 'killer'){
      killerArr.push(num);
    }
  }
}


/**
 * 生成不在数组里的随机数
 *
 * @param {number} allCounts
 * @param {array} arr
 * @return {object}
 * @api private
 */
function randomN(allCounts, arr){
  var num = parseInt(Math.random() * allCounts);
  for(var j = 0; j < arr.length; j++){
    //如果已经存在当前数字，则重新随机
    if(num === arr[j]){
      return randomN(allCounts, arr);
    }
  }
  return num;
}




/*几号进哪个房间*/
/*url: http://localhost:3000/join?client_id=wlh&room_num=0358*/
router.get('/join', function(req, res, next) {
  //房间号
  var room_num = req.param('room_num');
  //设备ID
  var client_id = req.param('client_id');
  //数据表
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

      //如果存在client_id，则直接返回号码和身份
      var room = db[i];
      for(var j in room.people){
        if(room.people[j] && room.people[j].client_id === client_id){
          //返回当前用户的编号
          return res.send({status:1, num: j});
        }
      }

      //房主，返回所有信息
      if(room.create_id === client_id ){
        delete room.people;
        return res.send({status:1, room: room});
      }

      //房间人数已满，拒绝进入
      if(room.people.length >= room.all_counts){
        return res.send({
          status: 0,
          info: '房间人数已满'
        });
      }
      //如果不存在，直接push到数组
      room.people.push({
        client_id: client_id, //用户设备ID
        count: 0,  //表示用户被投票几次
        is_over: 'false' //表示用户是否死亡
      });

      try{
        //写入到db.json
        fs.writeFileSync(FILE_NAME, JSON.stringify(db));
        //返回第一次进入的编号
        return res.send({status:1, num: room.people.length - 1});
      }catch(e){
        return res.send({status: 0});
      }
    }
  }

  return res.send({
    status: 0,
    info: '该房间已过期'
  });

});


//黑夜
router.get('/night/sha', function(req, res, next) {
  var client_id = req.param('client_id');
  var room_num = req.param('room_num');

});



module.exports = router;


