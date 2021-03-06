import {
    get,
    post
} from '../http';
// 查询联盟
let getAllianceUrl = "/nba/company/list";
// 新增联盟
let addAllianceUrl = "/nba/company/add";
// 修改联盟
let updateAllianceUrl = "/nba/company/update";
// 删除联盟
let deleteAllianceUrl = "/nba/company/delete";
// 联盟下的比赛比分
let scoreEchartsUrl = "/nba/echarts/echartsByScore";
// 联盟第一节比赛情况
let scoreFirstUrl = "/nba/echarts/echartByFirst";
// 联盟第二节比赛情况
let scoreSecondUrl = "/nba/echarts/echartByFirstAndSecond";
export default {
    getAllianceAddress: function (getAllianceObj) {
        return get(getAllianceUrl, getAllianceObj)
    },
    addAllianceAddress: function (addAllianceObj) {
        return post(addAllianceUrl, addAllianceObj)
    },
    updateAllianceAddress: function (updateAllianceObj) {
        return post(updateAllianceUrl, updateAllianceObj)
    },
    deleteAllianceAddress: function (deleteAllianceObj) {
        return post(deleteAllianceUrl, deleteAllianceObj)
    },
    scoreEchartsAddress: function (scoreEchartsObj) {
        return get(scoreEchartsUrl, scoreEchartsObj)
    },
    scoreFirstAddress: function (scoreFirstObj) {
        return get(scoreFirstUrl, scoreFirstObj)
    },
    scoreSecondAddress: function (scoreSecondObj) {
        return get(scoreSecondUrl, scoreSecondObj)
    }
}
