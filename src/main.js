import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter, createWebHistory} from 'vue-router'

import './style.css'
import App from './App.vue'

import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Posts from './views/Posts.vue'
import Todos from './views/Todos.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component: Home
        },
        {
            path:'/profile',
            component: Profile
        },
        {
            path:'/todos',
            component: Todos
        },
        {
            path:'/posts',
            component: Posts
        },
    ]
})

createApp(App).use(router).use(createPinia()).mount('#app')
