import Vue from "vue";
import VueRouter from 'vue-router'
import Main from '../views/main'
import Wallet from '../views/wallet/index.vue'
Vue.use(VueRouter)

// 重写push方法和replace方法
let origiPush = VueRouter.prototype.push;
let origiReplace = VueRouter.prototype.replace;
// call||apply区别
// 相同点:都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点:call和apply传递函数：call传递函数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        origiPush.call(this,location,resolve,reject)
    }else{
        origiPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        origiReplace.call(this,location,resolve,reject)
    }else{
        origiReplace.call(this,location,()=>{},()=>{});
    }
}

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/home',
            component:Main,
            redirect:'/wallet',
            children:[
                {
                    path:"/wallet",
                    component:()=>import("@/views/wallet/index.vue")
                },
                {
                    path:"/hotspot",
                    component:()=>import("@/views/hotspot/index.vue")
                },
                {
                    path:"/money",
                    component:()=>import("@/views/money/index.vue")
                }
            ]
               
        },
        {
            path:'*',
            redirect:'/home'
        }
      
    ]
})