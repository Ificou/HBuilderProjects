import Vue from 'vue'
import App from './App'
import vPinyin from './vue-py.js'

Vue.config.productionTip = false
console.log(vPinyin.chineseToPinYin('中国'))
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
