<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <article class="article">
        <img
          :src="data.ogimage.url + '?w=820&q=100'"
          :srcset="data.ogimage.url + '?w=375&q=100 375w,' + data.ogimage.url + '?w=750&q=100 750w,' + data.ogimage.url + '?w=820&q=100 820w'"
          class="ogimage"
          ref="ogimage"
        />
        <div class="main">
          <div class="share">
            <ul class="shareLists">
              <li class="shareList">
                <a v-bind:href="getTwitterLink()" target="_blank">
                  <img src="/blog/images/icon_twitter.svg" alt="Twitter" />
                </a>
              </li>
              <li class="shareList">
                <a v-bind:href="getFacebookLink()" target="_blank">
                  <img src="/blog/images/icon_facebook.svg" alt="Facebook" />
                </a>
              </li>
              <li class="shareList">
                <a v-bind:href="getHatenaLink()" target="_blank">
                  <img src="/blog/images/icon_hatena.svg" alt="はてなブックマーク" />
                </a>
              </li>
            </ul>
          </div>
          <div class="container">
            <h1 class="title">{{ data.title }}</h1>
            <Meta :createdAt="data.createdAt" :author="data.writer.name" />
            <Post :body="data.body" />
            <Writer :writer="writer" />
          </div>
        </div>
      </article>
      <aside class="aside">
        <a href="https://microcms.io" class="banner">
          <img class="logo" src="/blog/images/banner_logo.svg" alt="microCMS" />
          <p>APIベースの日本製ヘッドレスCMS</p>
          <span class="detail">詳しく見る</span>
        </a>
        <Latest />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Latest from '~/components/Latest.vue';
import Meta from '~/components/Meta.vue';
import Writer from '~/components/Writer.vue';
import Post from '~/components/Post.vue';

export default {
  async created() {
    const query = this.$route.query;
    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }
    let { data } = await axios.get(
      `https://microcms.microcms.io/api/v1/blog/${query.id}?draftKey=${query.draftKey}`,
      {
        headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
      }
    );
    this.data = data;
    setTimeout(() => hljs.initHighlighting(), 1);
  },
  data() {
    return {
      data: this.data || {
        ogimage: {
          url: ''
        },
        body: '',
        title: '',
        createdAt: '',
        author: ''
      }
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.data.description
        },
        { hid: 'og:title', property: 'og:title', content: this.data.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.data.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://microcms.io/blog/${this.data.id}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.data.ogimage.url
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/darcula.min.css'
        }
      ],
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
        }
      ]
    };
  },
  methods: {
    getTwitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.data.title}&url=https://microcms.io/blog/${this.data.id}&hashtags=microcms`;
    },
    getFacebookLink() {
      return `https://www.facebook.com/sharer.php?u=https://microcms.io/blog/${this.data.id}`;
    },
    getHatenaLink() {
      return `https://b.hatena.ne.jp/entry/https://microcms.io/blog/${this.data.id}`;
    }
  },
  components: {
    Header,
    Footer,
    Latest,
    Meta,
    Writer,
    Post
  },
  mounted: function() {
    this.$refs.ogimage.classList.add('loaded');
  }
};
</script>

<style scoped>
@media (min-width: 1160px) {
  .wrapper {
    position: relative;
  }

  .divider {
    display: flex;
    justify-content: space-between;
    width: 1160px;
    margin: 20px auto 0;
  }

  .article {
    width: 820px;
  }

  .aside {
    width: 300px;
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .breadcrumbList {
    color: #616269;

    a {
      color: #331cbf;
    }

    &::after {
      content: '>';
      margin: 0 10px;
    }

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }

  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 20px;
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .ogimage {
    display: block;
    width: 100%;
    opacity: 0;
    transform: scale(1.1);
    transition: transform 0.5s ease, opacity 0.5s ease;

    &.loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  .container {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-left: 80px;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .wrapper {
    position: relative;
  }

  .divider {
    margin: 20px auto 0;
    width: 740px;
  }

  .article {
    width: 740px;
  }

  .aside {
    margin-top: 100px;
    margin-left: 104px;
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .breadcrumbList {
    color: #616269;
    font-size: 14px;

    a {
      color: #331cbf;
    }

    &::after {
      content: '>';
      margin: 0 10px;
    }

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    align-items: strech;
  }

  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 20px;
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .ogimage {
    display: block;
    width: 100%;
    opacity: 0;
    transform: scale(1.1);
    transition: transform 0.5s ease;

    &.loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  .container {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-left: 80px;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }

  .meta {
    padding: 10px 0 40px;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;

    img {
      margin-right: 6px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;

    img {
      margin-right: 6px;
    }
  }
}
@media (min-width: 600px) and (max-width: 820px) {
  .wrapper {
    position: relative;
  }

  .divider {
    margin: 20px 0 0;
    padding: 0 20px;
  }

  .article {
    width: 100%;
  }

  .aside {
    margin-top: 60px;
    margin-left: 104px;
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .breadcrumbList {
    color: #616269;
    font-size: 14px;

    a {
      color: #331cbf;
    }

    &::after {
      content: '>';
      margin: 0 10px;
    }

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    align-items: strech;
  }

  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 20px;
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .ogimage {
    display: block;
    width: 100%;
    opacity: 0;
    transform: scale(1.1);
    transition: transform 0.5s ease;

    &.loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  .container {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-left: 80px;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }
}
@media (max-width: 600px) {
  .wrapper {
    position: relative;
  }

  .divider {
    padding: 0 16px;
  }

  .article {
    width: 100%;
  }

  .aside {
    margin-top: 60px;
    width: 100%;
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    margin-bottom: -20px;
  }

  .breadcrumbList {
    color: #616269;
    font-size: 14px;

    a {
      color: #331cbf;
    }

    &::after {
      content: '>';
      margin: 0 10px;
    }

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .main {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 30px;
  }

  .share {
    margin: 40px 0 0;

    img {
      max-height: 20px;
    }
  }

  .shareLists {
    display: flex;
    justify-content: center;
  }

  .shareList {
    text-align: center;
    margin: 0 20px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 270px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    width: calc(100% + 32px);
    margin: 0 -16px;
  }

  .ogimage {
    display: block;
    width: 100%;
    opacity: 0;
    transform: scale(1.1);
    transition: transform 0.5s ease;

    &.loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  .container {
    position: relative;
    flex: 1;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: bold;
    font-size: 24px;
    color: #2b2c30;
  }
}
</style>
