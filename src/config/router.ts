import Index from "../pages/Index.vue";
import Find from "../pages/Find.vue";
import Health from "../pages/Health.vue";
import Message from "../pages/Message.vue";
import User from "../pages/User.vue";
import NotFound from "../pages/404.vue";

//定义一些路由
const routes =[
    { path:'/',component:Index },
    { path:'/find',component:Find },
    { path:'/health',component:Health },
    { path:'/message',component:Message },
    { path:'/user',component:User },
    { path: '/:catchAll(.*)', component: NotFound },

]
export default routes