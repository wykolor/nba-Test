import {
    get,
    post
} from '../http';
let goodsUrl = "/nba/company/list";
export default {
    goodsAddress: function (goodsObj) {
        return get(goodsUrl, goodsObj)
    }
}