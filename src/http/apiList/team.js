import {
    get,
    post
} from '../http';
// 查询球队
let getTeamUrl = '/nba/team/list';
// 增加球队
let addTeamUrl = '/nba/team/add';
// 修改球队
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
