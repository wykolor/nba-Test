import {
    get,
    post
} from '../http';
// 查询球队
let getTeamUrl = '/nba/team/list';
// 增加球队
let addTeamUrl = '/nba/team/add';
// 修改球队获取回显数据
let uodateTeamDataUrl = '/nba/team/one';
// 修改球队
let updateTeamUrl = '/nba/team/update';
// 删除球队
let deleteTeamUrl = '/nba/team/delete';
export default {
    getTeamAddress: function (getTeamObj) {
        return get(getTeamUrl, getTeamObj)
    },
    addTeamAddress: function (addTeamObj) {
        return post(addTeamUrl, addTeamObj)
    },
    updateTeamDataAddress: function (uodateTeamDataObj) {
        return get(uodateTeamDataUrl, uodateTeamDataObj)
    },
    updateTeamAddress: function (updateTeamObj) {
        return post(updateTeamUrl, updateTeamObj)
    },
    deleteTeamAddress: function (deleteTeamObj) {
        return post(deleteTeamUrl, deleteTeamObj)
    }
}
