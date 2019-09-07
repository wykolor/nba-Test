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
    }
}
