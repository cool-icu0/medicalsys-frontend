<template>
  <div class="medical-encyclopedia">
    <div class="article-list">
      <article v-for="article in articles" :key="article.docid" class="article-item">
        <img v-if="article.hasImg" :src="article.imgsrc" alt="文章图片" class="article-img" />
        <div class="article-info">
          <h2 @click="goToArticle(article.url)">{{ article.title }}</h2>
          <p class="digest">{{ article.digest }}</p>
          <div class="article-meta">
            <span class="source">{{ article.source }}</span>
            <span class="ptime">{{ new Date(article.ptime).toLocaleString() }}</span>
            <span class="commentCount">评论数: {{ article.commentCount }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

const articles = ref(null);



onMounted(async () => {
  // 如果需要在组件挂载后获取数据，可以在这里调用API
  //
  articles.value= await axios.get("https://apis.tianapi.com/health/index?key=6c32f20b454c578d32ed4c4396cd607c&num=10");
  console.log("articles.value：",articles.value)
});
</script>

<style scoped>
.medical-encyclopedia {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.article-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.article-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.article-info {
  padding: 10px;
}

.article-info h2 {
  margin: 0;
  cursor: pointer;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
}

.digest {
  margin: 10px 0;
}

@media (max-width: 600px) {
  .article-list {
    grid-template-columns: 1fr;
  }
}
</style>