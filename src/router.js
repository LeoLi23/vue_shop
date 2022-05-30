import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/users/Users.vue'

Vue.use(Router)

const router = new Router({
    routes:[
        { path: '/', redirect: '/login'},
        { path: '/login', component: Login},
        { path: '/Home', component: Home, redirect: '/welcome', children: [
            {path: '/welcome',component: Welcome},
            {path: '/users', component: Users},
        ]},
        
    ]
})

// 挂载router导航守卫
router.beforeEach((to,from,next) => {
    // next 代表放行
    if (to.path == '/login') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next();
})


export default router