import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import socialFeed from './views/social-feed.vue'
import login from './views/login.vue'
import signup from './views/signup.vue'



import userDetails from './views/user-details.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
      path: '/login',
      name: 'login',
      component: login
    },
  
      {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/',
      name: 'Home',
      component: home
    },
   
    {
      path: '/social-feed',
      name: 'socialFeed',
      component: socialFeed
    }, 
 
  
     {
      path: '/user/:userId',
      name: 'user-details',
      component: userDetails
    }, 
 
  ]
})
