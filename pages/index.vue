<template>
  <div class="container">
    <div>
      <h1 class="title">microCMS blog</h1>
      <ul v-for="content in contents" :key="content.id">
        <li>
          <a v-bind:href="content.id">{{content.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData() {
    let { data } = await axios.get(`https://microcms.microcms.io/api/v1/blog`, {
      headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
    });
    return data;
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
