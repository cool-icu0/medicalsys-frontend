<template>
  <template v-if="isLoggedIn">
    <!-- 用户已登录，显示聊天信息界面 -->
    <div id="room">
      <van-cell-group class="user-info">
        <van-popup v-model:show="show"
                   position="right"
                   :style="{ width: '30%', height: '80%' }"
        >在线列表
        </van-popup>
        <van-cell  title="用户列表" is-link @click="showPopup">
          <template #value>
            {{ data.username }} <span v-if="data.isOnline" style="color: green">在线</span><span v-else style="color: red">离线</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-pull-refresh v-model="data.isLoading" @refresh="onRefresh">
        <div class="chat-container">
          <!-- 消息列表 -->
          <van-list
              v-model="data.loading"
              :finished="data.finished"
              _finished-text="没有更多了"
          >
            <div v-for="message in data.historyMessage" :key="message.id" class="message-item">
              <div
                  :class="{'my-message': message.fromName === data.username, 'other-message': message.fromName !== data.username}"
                  class="message"
              >
                <van-cell
                    :title="message.message"
                    :value="message.toName"
                    class="message-content"
                    @click="showChat(message.toName)"
                />
              </div>
            </div>
          </van-list>
        </div>
      </van-pull-refresh>

      <van-submit-bar
          class="fieldSize"
          button-text="发送"
          button-type="primary"
          @submit="submit"
      >
        <van-field
            v-model="data.sendMessage.message"
            rows="1"
            autosize
            type="textarea"
            maxlength="30"
            safe-area-inset-bottom
            placeholder="在此输入文字信息..."
        />
      </van-submit-bar>
    </div>
  </template>
  <template v-else>
    <!-- 用户未登录，显示注册界面 -->
    <NotLogin/>
  </template>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import myAxios from "../../config/myAxios.js";
import {useUserStore} from "../../config/store.js";
import NotLogin from "./NotLogin.vue";
//获取store信息
const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userAccount =userStore.userAccount;
const show = ref(false);
let ws;
const data =ref( {
  isLoading: false,
  loading: false,
  finished: false,
  username: 'zhangsan',
  isOnline: true,
  sendMessage: {
    toName: '',
    message: ''
  },
  historyMessage:[
    { id: "001", message: "你好张三", toName: "zhangsan", fromName: "lisi" },
    { id: "002", message: "你好李四", toName: "lisi", fromName: "zhangsan" },
  ],
})

const showPopup = () => {
  show.value = true;
};
onBeforeMount(()=>{

})
onMounted(()=>
    getData(userAccount),
)
const getData= async (userAccount)=>{
  console.log('1111111这是测试')
  const res = await myAxios.get('/select/chat',{params:{userAccount}});
  console.log(res.data,"这个是res的值")
  data.value.username=res.data
  //创建webSocket对象
  ws = new WebSocket("ws://localhost:8039/chat");

  //给ws绑定事件
  ws.onopen = this.onopen;
  console.log(ws.onopen,"1241412412")
  //接收到服务端推送的消息后触发
  ws.onmessage = this.onMessage;

  ws.onclose = this.onClose;
  if (res.data) {
    console.log(res.data,"这个是获取的值")
    data.value.username=res.data
  }
}

const onRefresh=()=> {
  // 下拉刷新逻辑
}
const showChat=(name)=> {
  this.toName = name;
  //清除聊天区的数据
  let history = sessionStorage.getItem(this.toName);
  if (!history) {
    this.historyMessage = [];
  } else {
    this.historyMessage = JSON.parse(history);
  }
  //展示聊天对话框
  this.value.isShowChat = true;
  //显示“正在和谁聊天”
  this.value.chatMes = true;

  console.log("sessionStorage仓库如下：");
  console.log(sessionStorage);
  console.log("toName为：");
  console.log(this.toName);
  console.log("historyMessage为：");
  console.log(this.historyMessage);
}
const submit = () => {
  // 确保 WebSocket 连接已经建立
  if (ws.readyState === WebSocket.OPEN) {
    // 创建一个消息对象
    const message = {
      toName: data.value.sendMessage.toName,
      message: data.value.sendMessage.message
    };
    // 通过 WebSocket 发送消息
    ws.send(JSON.stringify(message));
    // 清空输入框
    data.value.sendMessage.message = "";
  } else {
    // 如果 WebSocket 没有打开，可以在这里处理错误或者提示用户
    console.error('WebSocket is not open. Cannot send message.');
  }
};
const onOpen=()=> {
  this.isOnline = true;
}
const onClose=()=> {
  sessionStorage.clear();
  this.isOnline = false;
}
const onMessage=(evt)=> {
  //获取服务端推送过来的消息
  const dataStr = evt.data;
  //将dataStr 转换为json对象
  const res = JSON.parse(dataStr);

  //判断是否是系统消息
  if(res.system) {
    //系统消息  好友列表展示
    const names = res.message;
    this.friendsList = [];
    this.systemMessages = [];
    for (let i = 0; i < names.length; i++) {
      if(names[i] !== this.username) {
        this.value.friendsList.push(names[i]);
        this.value.systemMessages.push(names[i]);
      }
    }
  }else {
    //非系统消息
    const history = sessionStorage.getItem(res.fromName);
    if (!history) {
      this.value.historyMessage = [res];
    } else {
      this.value.historyMessage.push(res);
    }
    sessionStorage.setItem(res.fromName, JSON.stringify(this.value.historyMessage));
  }
}
</script>

<style>
.user-info {
  margin-top: 10px;
}
.chat-container {
  /* 聊天内容区域样式 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
}
.message-item {
  margin-bottom: 10px;
}

.my-message {
  margin-left: auto; /* 居右显示 */
  background-color: #e0e0e0; /* 发送者消息背景色 */
  border-radius: 10px 10px 0 10px; /* 边框圆角 */
  padding: 10px;
  text-align: right;
}

.other-message {
  background-color: #ffffff; /* 接收者消息背景色 */
  border-radius: 10px 10px 10px 0; /* 边框圆角 */
  padding: 10px;
  text-align: left;
}

.message-content {
  width: fit-content;
  max-width: 70%;
  word-wrap: break-word;
}
.fieldSize{
  margin-bottom: 70px;
}
</style>
请帮我改一下代码，让ws连接建立