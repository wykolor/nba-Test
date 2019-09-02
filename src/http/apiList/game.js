import {
    get,
    post
} from '../http';
// 查询比赛
let getGameUrl = '/nba/game/list';
// 增加比赛
let addGameUrl = '/nba/game/add';
// 修改比赛
let updateGameUrl = '/nba/game/update';
export default {
    getGameAddress: function (getGameObj) {
        return get(getGameUrl, getGameObj)
    },
    addGameAddress: function (addGameObj) {
        return post(addGameUrl, addGameObj)
    },
    updateGameAddress: function (updateGameObj) {
        return post(updateGameUrl, updateGameObj)
    }
}
