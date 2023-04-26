import {createRouter, createWebHistory} from "vue-router"
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from "@/views/Register.vue"
import NotFound from '@/views/404.vue'

const routes: any[] = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;