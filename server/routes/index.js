var express = require('express');
var router = express.Router();
var fs = require('fs');

var FILE_NAME = './db.json';

/*创建房间*/
router.get('/create', function(req, res, next) {
  var all_counts = parseInt(req.param('all_counts'));
  var police_counts = parseInt(req.param('police_counts'));
  var killer_counts = parseInt(req.param('killer_counts'));

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
  var room_num = randomNum(num, db);
  //生成身份数组
  var genPeople = genPeople(all_counts, police_counts, killer_counts);
  if(!genPeople){
    return res.send({
      status: 0,
      info: '人数有问题'
    });
  }

  var room = {
    "room_num": room_num,
    "is_over": "false",
    "all_counts": all_counts,
    "police": genPeople.policeArr,
    "killer": genPeople.killerArr
  };

  db.push(room);
  //写入到db.json
  try{
    fs.writeFileSync(FILE_NAME, JSON.stringify(db));
    return res.send(room);
  }catch(e){
    return res.send({
      status: 0,
      info: '创建失败'
    });
  }

});

/*几号进哪个房间*/
router.get('/room_num', function(req, res, next) {
  return res.send(genPeople(6, 1, 1));
});


//产生可用房间号
function randomNum(num, db){
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

//生成警察、杀手、平民
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


/*生成随机的身份数组*/
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

module.exports = router;































