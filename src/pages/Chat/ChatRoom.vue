<template>
  <div class="chat-container">
    <div class="header">
      <h1>项目文档</h1>
      <div class="date">618超优惠</div>
    </div>
    <div class="chat-content">
      <!-- 消息列表 -->
      <div class="messages">
        <!-- 消息项 -->
        <div class="message" v-for="(item, index) in messages" :key="index">
          <div class="user">{{ item.user }}</div>
          <div class="time">{{ item.time }}</div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>
    <!--footer-->
    <div class="footer">
      <!-- 输入框和发送按钮 -->
      <van-field
          v-model="inputValue"
          label="输入消息"
          placeholder="请输入消息内容"
          @keypress.enter="sendMessage"
      />
      <van-button size="large" type="primary" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      messages: [
        // 模拟消息数据
        { user: '南易（郑州）', time: '11:45', text: '@ChatGLM2你哈哈' },
        { user: 'ChatGLM2 (未知)', time: '11:45', text: '@南易得加钱' },
        { user: '一只大大怪 (嘉兴)', time: '13:33', text: '来聊点什么吧~' },
      ],
    };
  },
  methods: {
    sendMessage() {
      // 将输入的消息添加到消息列表
      this.messages.push({
        user: '我',
        time: '当前时间',
        text: this.inputValue,
      });
      // 清空输入框
      this.inputValue = '';
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  background-color: #f2f3f5;
  padding: 10px;
  text-align: center;
}
.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
.messages {
  margin-bottom: 10px;
}
.message {
  margin-bottom: 10px;
}
.user {
  font-weight: bold;
}
.time {
  color: #888;
}
.footer {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f2f3f5;
}
</style>