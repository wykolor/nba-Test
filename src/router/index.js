import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
// 联盟
import Alliance from "../views/Alliance";
// 球队
import Team from "../views/Team";
// 比赛
import Game from "../views/Game";
// 
import AllianceEcharts from "../views/AllianceEcharts";
Vue.use(Router)
// 挂载页面路由文件
const router = new Router({
    // 保证每个页面一进入就在页面顶部--可配置
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition //如果有后退、前进功能，就保留浏览器原始位置
    //   } else {
    //     return { x: 0, y: 0 } //保证每次进入页面都是在页面的顶部
    //   }
    // },
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/alliance',
        children: [{
                path: 'alliance',
                component: Alliance
            },
            {
                path: 'team',
                component: Team
            },
            {
                path: 'game',
                component: Game
            },
            {
                path: 'allianceEcharts',
                component: AllianceEcharts
            }
        ]
    }]
});
// 路由守卫 全部配置  在每个路由页面进入的时候，判断是否登录--权限配置
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem('token')) {
            next()
        } else {
            Toast({
                message: '您还未登录，跳转登录页面中...',
                duration: 800,
                onClose: function () {
                    next({
                        path: '/login',
                        query: {
                            redirect: to.fullPath
                        }
                    })
                }
            })
        }
    } else {
        next()
    }
});
export default router;
