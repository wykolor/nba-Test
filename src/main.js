// The Vue build version to load with the `import` command
import Vue from 'vue'
import store from './store/store'
import App from './App'
import router from './router'

// 引入接口文件
import server from './http/api.js'
//定义全局变量
Vue.prototype.$server = server;
let echarts = require("echarts/lib/echarts");
Vue.prototype.$echarts = echarts;
// 解决跨域的准备
// 不是生产环境
Vue.config.productionTip = false;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 自定义指令
Vue.directive('preventReClick', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 2000)
            }
        })
    }
})
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
    data: {
        eventHub: new Vue() //使用集中的时间处理器，一劳永逸的在任何组件调用事件发射，接受的方法,中央处理
    }
})
