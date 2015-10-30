
var fs = require('fs');
var FILE_NAME = './db.json';


/*
* 供socket.io查询使用
* @api: private
* */

module.exports = {
  /**
   * 根据用户的设备ID查询用户身份
   *
   * @param {string} client_id
   * @param {string} room_num
   * @return {object}
   * @api private 其中status代表是否存在正确结果
   */
  getUserTypeByClientID: function(client_id, room_num){
    var db = null;
    try{
      db = JSON.parse(fs.readFileSync(FILE_NAME).toString());
    }catch(e){
      return {
        status: 0,
        info:'读取数据失败'
      };
    }
    //默认用户类型是平民
    var type = 'pingmin';
    for(var i in db){
      if(db[i].room_num === room_num){
        var people = db[i].people;
        //查询client ID的位置
        for(var c in people){
          if(people[c] === client_id){
            //判断是否是警察
            for(var p in db[i].police){
              if(c === db[i].police[p]){
                type = "police";
                break;
              }
            }
            //判断是否是杀手
            for(var k in db[i].killer){
              if(c === db[i].killer[k]){
                type = "killer";
                break;
              }
            }

            return {
              status: 1,
              num: c, /*几号*/
              type: type /*身份*/
            };
          }
        }
      }else{
        return {
          status: 0,
          info: '查询不到该用户'
        };
      }

    }
  }

};