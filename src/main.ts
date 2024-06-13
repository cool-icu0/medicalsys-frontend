import { createApp } from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import * as VueRouter from 'vue-router';
import routes from "./config/router";
import {createPinia} from "pinia";


const app = createApp(App);
const pinia = createPinia();

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)
app.use(pinia)
app.mount('#app')