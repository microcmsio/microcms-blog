<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <div class="container">
        <Breadcrumb :category="selectedCategory" />
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <ul>
          <li class="list" v-for="content in contents" :key="content.id">
            <nuxt-link v-bind:to="`/${content.id}`" class="link">
              <picture>
                <source
                  type="image/webp"
                  :srcset="content.ogimage.url + '?w=670&fm=webp'"
                />
                <img
                  :src="content.ogimage.url + '?w=670'"
                  class="ogimage"
                  alt
                />
              </picture>
              <dl class="content">
                <dt class="title">{{ content.title }}</dt>
                <dd>
                  <Meta
                    :createdAt="content.publishedAt || content.createdAt"
                    :author="content.writer.name"
                    :category="content.category"
                  />
                </dd>
              </dl>
            </nuxt-link>
          </li>
        </ul>
        <ul class="pager" v-show="contents.length > 0">
          <li
            class="page"
            v-bind:class="{ active: page === `${p + 1}` }"
            v-for="p in pager"
            :key="p"
          >
            <a
              v-bind:href="
                `/blog/${
                  selectedCategory !== undefined
                    ? `category/${selectedCategory.id}/`
                    : ''
                }page/${p + 1}`
              "
              >{{ p + 1 }}</a
            >
          </li>
        </ul>
      </div>
      <aside class="aside">
        <a href="https://microcms.io" class="banner">
          <img class="logo" src="/blog/images/banner_logo.svg" alt="microCMS" />
          <p>APIベースの日本製ヘッドレスCMS</p>
          <span class="detail">詳しく見る</span>
        </a>
        <Categories :categories="categories" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Meta from '~/components/Meta.vue';
import Breadcrumb from '~/components/Breadcrumb.vue';
import Categories from '~/components/Categories.vue';

export default {
  data() {
    return {
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      pager: this.pager || [],
      loading: true
    };
  },
  async asyncData({ params, error, payload }) {
    const page = params.id || '1';
    const categoryId = params.categoryId;
    const limit = 10;
    const { data } = await axios.get(
      `https://microcms.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
      }
    );
    const categories = await axios.get(
      `https://microcms.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
      }
    );
    const selectedCategory =
      categoryId !== undefined
        ? categories.data.contents.find(content => content.id === categoryId)
        : undefined;
    return {
      ...data,
      categories: categories.data.contents,
      selectedCategory,
      page,
      pager: [...Array(Math.ceil(data.totalCount / limit)).keys()]
    };
  },
  head() {
    return {
      titleTemplete: null,
      title: 'microCMSブログ'
    };
  },
  components: {
    Header,
    Footer,
    Meta,
    Breadcrumb,
    Categories
  }
};
</script>

<style scoped>
@media (min-width: 1160px) {
  .loader {
    color: #ccc;
    font-size: 20px;
    text-align: center;
    padding: 150px;
  }

  .pager {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    color: #3067af;
    border-radius: 5px;
    margin: 0 10px;

    &.active {
      color: #fff;
      background-color: #3067af;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .divider {
    display: flex;
    justify-content: space-between;
    width: 1160px;
    margin: 20px auto 0;
  }

  .container {
    width: 820px;
  }

  .aside {
    width: 300px;
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

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }

  .list {
    padding: 20px 0;
  }

  .link {
    display: flex;
    justify-content: space-between;
  }

  .ogimage {
    width: 335px;
    height: 176px;
    border-radius: 5px;
  }

  .content {
    flex: 1;
    margin-left: 40px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .loader {
    color: #ccc;
    font-size: 16px;
    padding-top: 20px;
  }

  .pager {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    color: #3067af;
    border-radius: 5px;
    margin: 0 10px;

    &.active {
      color: #fff;
      background-color: #3067af;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
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
    width: 300px;
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

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }

  .list {
    padding: 20px 0;
  }

  .link {
    display: flex;
    justify-content: space-between;
  }

  .ogimage {
    width: 335px;
    height: 176px;
    border-radius: 5px;
  }

  .content {
    flex: 1;
    margin-left: 40px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (max-width: 820px) {
  .loader {
    color: #ccc;
    font-size: 16px;
    padding-top: 20px;
  }

  .pager {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 32px;
    height: 32px;
    background-color: #e5eff9;
    color: #3067af;
    border-radius: 5px;
    margin: 0 6px;

    &.active {
      color: #fff;
      background-color: #3067af;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
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
    width: 100%;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }

  .list {
    padding: 32px 0 0;
    border-bottom: 1px solid #eee;

    &:first-child {
      padding-top: 16px;
    }
  }

  .link {
  }

  .ogimage {
    width: 100%;
    border-radius: 5px;
  }

  .content {
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
}
</style>
