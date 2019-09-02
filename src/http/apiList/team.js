import {
    get,
    post
} from '../http';
// 查询比赛
let getTeamUrl = '/nba/team/list';
// 增加比赛
let addTeamUrl = '/nba/team/add';
// 修改比赛
let updateTeamUrl = '/nba/team/update';
export default {
    getTeamAddress: function (getTeamObj) {
        return get(getTeamUrl, getTeamObj)
    },
    addTeamAddress: function (addTeamObj) {
        return post(addTeamUrl, addTeamObj)
    },
    updateTeamAddress: function (updateTeamObj) {
        return post(updateTeamUrl, updateTeamObj)
    }
}
