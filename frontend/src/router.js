import { createWebHistory, createRouter } from 'vue-router'

import Person from './components/Person.vue'
import Login from './components/Login.vue'

const routes = [
    {path : '/person', component: Person},
    {path:'/', component: Login},
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
  })
  export default router