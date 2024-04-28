import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user', // store 的唯一标识符

    state: () => ({
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',// 初始值从 localStorage 中获取
        userAccount:localStorage.getItem('userAccount') || '',
    }),
    actions: {
        // 用户登录操作
        login(userAccount) {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true'); // 登录成功后将登录状态存储到 localStorage

            this.userAccount= userAccount;
            localStorage.setItem('userAccount',userAccount);
        },

        // 用户登出操作
        logout(userAccount) {
            this.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false'); // 登出时将登录状态更新并存储到 localStorage

            this.userAccount= '';
            localStorage.removeItem('userAccount');
        }
    },

    // getters 用于获取状态的值
    getters: {
        // 判断用户是否已登录
        isUserLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ['isLoggedIn']
            }
        ]
    }
});
