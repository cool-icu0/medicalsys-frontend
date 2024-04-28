import Index from "../pages/Index.vue";
import Find from "../pages/Find.vue";
import Health from "../pages/Health.vue";
import Message from "../pages/Message.vue";
import User from "../pages/User/User.vue";
import NotFound from "../pages/404.vue";
import UserRegister from "../pages/User/UserRegister.vue";
import UserLogin from "../pages/User/UserLogin.vue";

//定义一些路由
const routes =[
    { path:'/',component:Index },
    { path:'/find',component:Find },
    { path:'/health',component:Health },
    { path:'/message',component:Message },
    { path:'/user',
        component:User,
        name:'User',
        children:[
            { path:'login',name:'UserLogin',component: UserLogin},
            { path:'register',name:'UserRegister',component: UserRegister},
        ],
        meta: {
            hideInMenu: true,
        },
    },
    { path: '/:catchAll(.*)', component: NotFound },

]
export default routes