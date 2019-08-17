<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        {{ title }}
      </h1>
      <div v-html="body"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://microcms.microcms.io/api/v1/blog/${params.slug}`, {
      headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
    })
    return data;
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
