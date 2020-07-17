<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <article class="article">
        <div class="ogimageWrap">
          <picture>
            <source
              type="image/webp"
              :srcset="ogimage.url + '?w=820&fm=webp'"
            />
            <img
              ref="ogimage"
              :src="ogimage.url + '?w=820&q=100'"
              class="ogimage"
              alt
            />
          </picture>
        </div>
        <Breadcrumb :category="category" />
        <div class="main">
          <div class="share">
            <ul class="shareLists">
              <li class="shareList">
                <a :href="getTwitterLink()" target="_blank">
                  <img src="/blog/images/icon_twitter.svg" alt="Twitter" />
                </a>
              </li>
              <li class="shareList">
                <a :href="getFacebookLink()" target="_blank">
                  <img src="/blog/images/icon_facebook.svg" alt="Facebook" />
                </a>
              </li>
              <li class="shareList">
                <a :href="getHatenaLink()" target="_blank">
                  <img
                    src="/blog/images/icon_hatena.svg"
                    alt="はてなブックマーク"
                  />
                </a>
              </li>
              <li class="shareList">
                <a href="https://microcms.io/blog/feed.xml" target="_blank">
                  <img src="/blog/images/icon_feed.svg" alt="フィード" />
                </a>
              </li>
            </ul>
          </div>
          <div class="container">
            <h1 class="title">{{ title }}</h1>
            <Meta
              :created-at="publishedAt || createdAt"
              :author="writer.name"
              :category="category"
            />
            <Toc :id="id" :toc="toc" :visible="toc_visible" />
            <Post :body="body" />
            <Writer :writer="writer" />
            <RelatedBlogs
              v-if="related_blogs.length > 0"
              :blogs="related_blogs"
            />
          </div>
        </div>
      </article>
      <aside class="aside">
        <a href="https://microcms.io" class="banner">
          <img class="logo" src="/blog/images/banner_logo.svg" alt="microCMS" />
          <p>APIベースの日本製ヘッドレスCMS</p>
          <span class="detail">詳しく見る</span>
        </a>
        <Search />
        <Categories :categories="categories" />
        <Latest :contents="contents" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

export default {
  async asyncData({ params, payload }) {
    let data;
    if (payload !== undefined) {
      data = payload;
    } else {
      const result = await axios.get(
        `https://microcms.microcms.io/api/v1/blog/${params.slug}?depth=2`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY },
        }
      );
      data = result.data;
    }
    const {
      data: { contents },
    } = await axios.get('https://microcms.microcms.io/api/v1/blog', {
      headers: { 'X-API-KEY': process.env.API_KEY },
    });
    const categories = await axios.get(
      `https://microcms.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY },
      }
    );
    const $ = cheerio.load(data.body);
    const headings = $('h1, h2, h3').toArray();
    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      };
    });
    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text());
      $(elm).html(res.value);
      $(elm).addClass('hljs');
    });
    $('img').each((_, elm) => {
      $(elm).attr('decoding', 'async');
    });

    return {
      ...data,
      body: $.html(),
      toc,
      categories: categories.data.contents,
      contents,
    };
  },
  data() {
    return {
      publishedAt: '',
    };
  },
  mounted() {
    this.$refs.ogimage.classList.add('loaded');
  },
  methods: {
    getTwitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.title}&url=https://microcms.io/blog/${this.id}&hashtags=microcms`;
    },
    getFacebookLink() {
      return `https://www.facebook.com/sharer.php?u=https://microcms.io/blog/${this.id}`;
    },
    getHatenaLink() {
      return `https://b.hatena.ne.jp/entry/https://microcms.io/blog/${this.id}`;
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:title', property: 'og:title', content: this.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://microcms.io/blog/${this.id}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.ogimage && this.ogimage.url,
        },
      ],
    };
  },
};
</script>

<style scoped>
.category {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 3px;
  color: #fff;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

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
    top: 120px;
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
    margin-top: 60px;
    margin-left: 104px;
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
    top: 120px;
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
    top: 100px;
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
