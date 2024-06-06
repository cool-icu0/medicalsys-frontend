import Index from "../pages/Index.vue";
import Health from "../pages/Health.vue";
import Message from "../pages/Chat/Message.vue";
import User from "../pages/User/User.vue";
import NotFound from "../pages/404.vue";
import UserRegister from "../pages/User/UserRegister.vue";
import UserLogin from "../pages/User/UserLogin.vue";
import UserInfo from "../pages/User/UserInfo.vue";
import UserMain from "../pages/User/UserMain.vue";
import UserEdit from "../pages/User/UserEdit.vue";
import Search from "../pages/Health/Search.vue";
import MedicineLib from "../pages/Index/MedicineLib.vue";
import Feature from "../pages/Index/Feature.vue";
import DoctorInfo from "../pages/Index/DoctorInfo.vue";
// import ChatRoom from "../pages/Chat/ChatRoom.vue";

//定义一些路由
const routes =[
    // 主页
    { path:'/',component:Index },
    { path:'/index/medicineLib',component: MedicineLib},
    { path:'/index/feature',component: Feature},
    { path: '/index/doctorInfo',component: DoctorInfo},
    //健康相关页面
    { path:'/health',component:Health },
    { path:'/health/search',component:Search },
    // 用户相关页面
    { path:'/user', component:User, name:'User',},
    { path:'/user/login',name:'UserLogin',component: UserLogin},
    { path:'/user/register',name:'UserRegister',component: UserRegister},
    { path:'/user/main',name:'UserMain',component: UserMain},
    { path:'/user/info',name:'UserInfo',component: UserInfo},
    { path:'/user/edit',name:'UserEdit',component: UserEdit},
    //聊天相关页面
    { path:'/message',component:Message },
    // { path:'/c',name:'Room',component:ChatRoom },
    // 找不到的路由页面
    { path: '/:catchAll(.*)', component: NotFound },

]
export default routes