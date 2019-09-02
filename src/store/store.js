import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        networkSuccess: true, //true为联网成功，false为断网
        openid: null,
        version:"1.18.0"
    },
    mutations: {
        changeNetworkSuccess(state, val) { //改变状态
            state.networkSuccess = val
        }
    }
})