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
import Friends from "../pages/Chat/Friends.vue";
import ChatCommon from "../pages/Chat/ChatCommon.vue";
import CaseList from "../pages/Health/CaseList.vue";
import MyDoc from "../pages/Chat/MyDoc.vue";
import Prescription from "../pages/Index/Prescription.vue";
import Remind from "../pages/Chat/Remind.vue";
import MedicalAny from "../pages/Index/MedicalAny.vue";
import test from "../components/toast/test.vue";

//定义一些路由
const routes =[
    // 主页
    { path:'/',component:Index },
    { path:'/index/medicineLib',meta:{title:'药品库'},component: MedicineLib},
    { path:'/index/feature',meta: {title:'极速问诊'},component: Feature},
    { path: '/index/doctorInfo',meta:{title:'医生信息'},component: DoctorInfo},
    { path: '/index/prescription',meta: {title: '开处方'},component: Prescription},
    { path: '/index/medicalAny',meta: {title: '医疗百科'},component: MedicalAny},
    //健康相关页面
    { path:'/health',meta:{title:'健康'},component:Health },
    { path:'/health/search',meta:{title:'搜索'},component:Search },
    { path:'/health/caseList',meta:{title:'病例清单'},component:CaseList },
    // 用户相关页面
    { path:'/user', component:User, name:'User',},
    { path:'/user/login',meta:{title:'用户登录'},name:'UserLogin',component: UserLogin},
    { path:'/user/register',meta:{title:'用户注册'},name:'UserRegister',component: UserRegister},
    { path:'/user/main',meta:{title:'用户信息'},name:'UserMain',component: UserMain},
    { path:'/user/info',name:'UserInfo',component: UserInfo},
    { path:'/user/edit',meta:{title:'信息编辑'},name:'UserEdit',component: UserEdit},
    //聊天相关页面
    { path:'/message',meta:{title:'大厅聊天'},component:Message },
    { path:'/message/common',meta:{title:'私人聊天'},component:ChatCommon },
    { path:'/message/friends',meta:{title:'医师列表'},component:Friends },
    { path:'/message/myDoc',meta:{title:'私聊'},component:MyDoc },
    { path: '/message/remind',meta: {title: '提醒'},component: Remind},

    // { path:'/c',name:'Room',component:ChatRoom },
    {path: '/test',meta: {title: '测试'},component: test},
    // 找不到的路由页面
    { path: '/:catchAll(.*)', component: NotFound },

]
export default routes