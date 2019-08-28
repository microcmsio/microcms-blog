<template>
  <div class="wrapper">
    <h1 class="pageTitle">最新の記事</h1>
    <ul v-for="content in contents" :key="content.id">
      <li class="list">
        <a v-bind:href="content.id" class="link">
          <dl class="content">
            <dt class="title">{{content.title}}</dt>
            <dd>
              <Meta :createdAt="content.createdAt" :author="content.author" />
            </dd>
          </dl>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async created() {
    let { data } = await axios.get(`https://microcms.microcms.io/api/v1/blog`, {
      headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
    });
    this.contents = data.contents;
  },
  data() {
    return {
      contents: this.contents || []
    };
  }
};
</script>

<style scoped>
@media (min-width: 1160px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
  }

  .list {
    border-bottom: 1px solid #eee;
  }

  .link {
    display: block;
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
  }

  .list {
    border-bottom: 1px solid #eee;
  }

  .link {
    display: block;
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }
}
@media (max-width: 820px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
  }

  .list {
    border-bottom: 1px solid #eee;
  }

  .link {
    display: block;
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }
}
</style>
