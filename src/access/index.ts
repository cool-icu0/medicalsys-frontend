/**
 * 自动登录
 */
// @ts-ignore
import router from "@/router";
// @ts-ignore
import store from "@/store";
// @ts-ignore
import ACCESS_ENUM from "@/access/accessEnum";
// @ts-ignore
import checkAccess from "@/access/checkAccess";
// @ts-ignore
import message from "@arco-design/web-vue/es/message";

// @ts-ignore
router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  // 获取后端的token
  // console.log("token", localStorage.getItem("token"));
  // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      message.warning("请登录！");
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
