import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        alliance: [], //联盟列表
        team: [], //球队列表
        game: [], //比赛列表
        tabActive: "/alliance"
    },
    getters: {
        allianceList(state) {
            return state.alliance;
        },
        teamList(state) {
            return state.team;
        },
        gameList(state) {
            return state.game;
        },
    },
    mutations: {
        changeAlliance(state, alliance) {
            state.alliance = alliance;
        },
        changeTeam(state, team) {
            state.team = team;
        },
        changeGame(state, game) {
            state.game = game;
        },
        changeActiveTab(state, active) {
            state.tabActive = active;
        }
    }
})
