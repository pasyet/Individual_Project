import Vue from 'vue';
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage'



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginPage.vue')
    },
    {
        path: '/mybookmark',
        name: 'BookmarkPage',
        component: () => import('../views/BookmarkPage.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterPage.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/DetailPage.vue')
    },
    {
        path: '/details/:id',
        name: 'Details',
        component: () => import('../views/DetailsNowPlaying.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('access_token') && to.name === 'login') {
        next({ name: 'home' })
    }
    else if (localStorage.getItem('access_token') && to.name === 'register') {
        next({ name: 'home' })
    }
    else if (!localStorage.getItem('access_token') && to.name === 'BookmarkPage') {
        next({ name: 'home' })
    }
    else {
        next()
    }
})

export default router
