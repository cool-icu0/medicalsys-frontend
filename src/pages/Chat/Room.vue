<template>
  <van-grid :column-num="1" style="float: left;">
    <van-grid-item v-for="value in 1" :key="value" :text="`您正在和${user.toName}聊天`"/>
  </van-grid>
  <!--展示-->
  <div id="Content" style="overflow-y: scroll;">
    <!--内容-->
    <div v-for="talk in contents">
      <!--发送时间-->
      <van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        {{ talk.sendTime }}
      </van-divider>
      <!--判断发送和接收-->
      <van-row v-if="talk.fromName===user.username">
        <van-col span="2">
        </van-col>
        <van-col span="14" offset="4">
          <!--消息内容-->
          <van-notice-bar color="#1989fa" background="#ecf9ff">
            {{ talk.message }}
          </van-notice-bar>
        </van-col>
        <van-col span="1">
        </van-col>
        <!--头像框-->
        <van-col span="2">
          <van-image
              round
              width="3rem"
              height="3rem"
              :src=talk.img
          />

        </van-col>

      </van-row>
      <!--判断发送和接收-->
      <van-row v-else>
        <!--头像框-->
        <van-col span="2">
          <van-image
              round
              width="3rem"
              height="3rem"
              :src=talk.img
          />
        </van-col>
        <van-col span="1">
        </van-col>
        <van-col span="16" offset="0">
          <!--消息内容-->
          <van-notice-bar color="#1989fa" background="#ecf9ff">
            {{ talk.message }}
          </van-notice-bar>
        </van-col>
        <van-col span="4">
        </van-col>
      </van-row>

    </div>
    <van-back-top target="#Content" bottom="30vh"/>
  </div>

  <div id="chat-input">
    <!-- 聊天框 -->
    <van-row>
      <van-col span="4">
        <div @click="isAudio=!isAudio">
          <van-icon v-show="!isAudio" name="play-circle-o" size="3rem" color="#1989fa"/>
          <van-icon v-show="isAudio" name="comment-circle-o" size="3rem" color="#1989fa"/>
        </div>
      </van-col>
      <van-col span="16">
        <!-- 录音区域 -->
        <div v-if="isAudio" class="recorded" @mousedown="startRecord" @mouseup="stopRecord"
             @touchstart.passive="startRecord" @touchend.passive="stopRecord">
          <div class="recorded-tips" style="display: flex;align-items: center">
            {{ isRecording ? `录制中 ${second}s` : '按住说话' }}
            <br>
            {{messageText}}
          </div>
        </div>
        <!-- 文本输入区域 -->
        <van-field v-if="!isAudio"
                   v-model="messageText"
                   placeholder="请输入消息内容"
        />
      </van-col>
      <van-col span="4">
        <!-- 按钮 -->
        <van-button block type="primary" id="submit" @click="sendMessage">发送</van-button>
      </van-col>
    </van-row>
  </div>
  <van-cell-group>
  </van-cell-group>
</template>

<script setup>
// import Recorder from 'js-audio-recorder';
import {onMounted, ref} from "vue";
import myAxios from "../../config/myAxios.js";
import {useUserStore} from "../../config/store.js";

import {showToast, Toast} from 'vant';

let Token = ref([]);
const text = ref(null);
const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userAccount = userStore.userAccount;
const user = ref({
  username: 'zhangsan',
  toName: "lisi",
})
const contents = ref([
  {messageId: '1', toName: 'zhangsan',
    img: 'https://profile-avatar.csdnimg.cn/cec5c664c7394beca664dc74ed8e3e33_qq_57473444.jpg!1',
    fromName: 'lisi', message: '你好', sendTime: '19:30'},
  {messageId: '2', toName: 'lisi',
    img: 'https://profile-avatar.csdnimg.cn/cec5c664c7394beca664dc74ed8e3e33_qq_57473444.jpg!1',
    fromName: 'zhangsan', message: '好久不见', sendTime: '19:50'}
])
const isAudio = ref(false); // 是否激活语音输入
const isRecording = ref(false); // 是否正在录音
const second = ref(0); // 录音时间
const messageText = ref(''); // 文本消息
const messages = ref([]); // 消息列表
let timer = null;
onMounted(() =>
    getData(userAccount),
)
const getData = async (userAccount) => {
  const res = await myAxios.get('/select/chat', {params: {userAccount}});
  console.log(res.data, "这个是res的值")
  user.value.username = res.data
  if (res.data) {
    console.log(res.data, "这个是获取的值")
    user.value.username = res.data
  }
}
const doSearchResult = () => {

  const name = user.value.username;
  const ws = new WebSocket("ws://localhost:8039/chat");
  ws.onopen = () => {
    console.log("Socket 已连接");
  }
  if (text.value !== "") {
    Token.value.push(text.value);
  }

  /**
   **关闭连接时将聊天记录存储
   */
  ws.onclose = () => {
    sessionStorage.setItem(user.value.username, Token);
    console.log("Socket已关闭");
  }
  const json = {"toName": user.value.toName, "message": text.value}
  console.log(json)
  console.log(JSON.stringify(json))
  ws.onerror = function () {
    showToast.fail("Socket发生了错误");
    //此时可以尝试刷新页面
  }
}
/**
 * 开始计时方法
 * @returns {function(): void}
 */
const startRecord = () => {
  isRecording.value = true;
  // 清除之前的定时器
  if (timer) {
    clearInterval(timer);
  }
  // 启动录音逻辑...
  // 开启一个定时器，每隔1秒更新一次second的值
  timer = setInterval(() => {
    if (isRecording.value) {
      second.value++;
    }
  }, 1000)

  // 这里应该处理录音数据，例如发送到服务器或转换为文本
  // 录音结束时，清除定时器
  return () => clearInterval(timer);
};

const stopRecord = () => {
  isRecording.value = false;
  // 停止录音逻辑...
  // 这里应该处理录音数据，例如发送到服务器或转换为文本
  second.value = 0
  // 创建语音识别实例
  const recognition = new webkitSpeechRecognition();

  // 开始识别语音
  recognition.start();

  // 监听语音识别结果
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    messageText.value = speechToText;
    console.log("成功")
  };

  // 监听语音识别错误
  recognition.onerror = (event) => {
    console.error('语音识别出错：', event.error);
  };
};

const sendMessage = () => {
  if (messageText.value.trim()) {
    console.log(messageText.value)
    messageText.value = ''; // 清空输入框
  }
};
</script>

<style scoped>
#Content {
  width: 99.9%;
  height: 500px;
  background-color: #f0f0f0;
}

.recorded {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 其他样式... */
}

.recorded-container recorded-tips {
  text-align: center;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* 可以根据需要添加更多样式 */
}

#submit {
  height: 3rem;
}
</style>