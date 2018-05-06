import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/components/PageTransition'
import HelloWorld from '@/components/HelloWorld'
import News_Search from '@/components/News_Search'
import Home from '@/components/Home'
import News_cnt from '@/components/News_cnt'
import User_Login from '@/components/User_Login'
import User_register from '@/components/User_register'
import User_edit from '@/components/User_edit'
import Admin_user from'@/components/Admin_user'
import Admin_news from '@/components/Admin_news'
Vue.use(Router)

Router.prototype.goback = function(){
  this.isBack=true
  window.history.go(-1)
}
/*要实现页面前进后台动画，首先必须知道页面状，改写router.go方法记录回退状态*/
const router= new Router({
  routes: [
    {
      path: '/',
      name: 'NewsRecom',
      component: PageTransition,
      children:[
        {
          path:'',
          component: Home
        },
        {
          path:'/Search',
          component: News_Search
        },
        {
          path:'/Login',
          component:User_Login
        },
        {
          path:'/register',
          component:User_register
        },
        {
          path:'/user_edit',
          component:User_edit
        },
        {
          path:'/Admin_user',
          component:Admin_user
        },
        {
          path:'/Admin_news',
          component:Admin_news
        },
        {
          path:'/:id',
          component:News_cnt
        }
      ]
    },
  ]
})
export default router
