<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <div class="container">
        <Breadcrumb :category="selectedCategory" :tag="selectedTag" />
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <ul>
          <li v-for="content in contents" :key="content.id" class="list">
            <nuxt-link :to="`/${content.id}/`" class="link">
              <picture v-if="content.ogimage">
                <source
                  type="image/webp"
                  :data-srcset="content.ogimage.url + '?w=670&fm=webp'"
                />
                <img
                  :data-src="content.ogimage.url + '?w=670'"
                  :width="content.ogimage.width"
                  :height="content.ogimage.height"
                  class="ogimage lazyload"
                  alt
                />
              </picture>
              <picture v-else>
                <source
                  type="image/webp"
                  :data-srcset="content.defaultOgimage"
                />
                <img
                  :data-src="content.defaultOgimage"
                  class="ogimage lazyload"
                  alt
                />
              </picture>
              <dl class="content">
                <dt class="title">{{ content.title }}</dt>
                <dd>
                  <Meta
                    :created-at="content.publishedAt || content.createdAt"
                    :author="content.writer"
                    :category="content.category"
                    :tags="content.tag"
                  />
                </dd>
              </dl>
            </nuxt-link>
          </li>
        </ul>
        <Pagination
          v-if="contents.length > 0"
          :pager="pager"
          :current="Number(page)"
          :category="selectedCategory"
          :tag="selectedTag"
        />
      </div>
      <aside class="aside">
        <Banner id="list" :banner="banner" />
        <Search />
        <Categories :categories="categories" />
        <Tags :tags="tags" />
        <PopularArticles :contents="popularArticles" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import getDefaultOgimage from '../utils/getDefaultOgimage';

export default {
  async asyncData({ params, payload, $microcms }) {
    const page = params.id || '1';
    const categoryId = params.categoryId;
    const tagId = params.tagId;
    const articleFilter =
      categoryId !== undefined
        ? `category[equals]${categoryId}`
        : tagId !== undefined
        ? `tag[contains]${tagId}`
        : undefined;
    const limit = 10;
    const popularArticles =
      payload !== undefined && payload.popularArticles !== undefined
        ? payload.popularArticles
        : (
            await $microcms.get({
              endpoint: 'popular-articles',
            })
          ).articles;
    const banner =
      payload !== undefined
        ? payload.banner
        : await $microcms.get({
            endpoint: 'banner',
          });
    const data = await $microcms.get({
      endpoint: 'blog',
      queries: {
        limit,
        offset: (page - 1) * limit,
        filters: articleFilter,
      },
    });
    const categories = await $microcms.get({
      endpoint: 'categories',
      queries: {
        limit: 100,
      },
    });
    const tags = await $microcms.get({
      endpoint: 'tags',
      queries: {
        limit: 1000,
      },
    });
    const selectedCategory =
      categoryId !== undefined
        ? categories.contents.find((content) => content.id === categoryId)
        : undefined;
    const selectedTag =
      tagId !== undefined
        ? tags.contents.find((content) => content.id === tagId)
        : undefined;

    // デフォルト画像を設定
    data.contents.forEach((content) => {
      content.defaultOgimage = getDefaultOgimage(content);
    });

    return {
      ...data,
      categories: categories.contents,
      tags: tags.contents,
      selectedCategory,
      selectedTag,
      popularArticles,
      banner,
      page,
      pager: [...Array(Math.ceil(data.totalCount / limit)).keys()],
    };
  },
  data() {
    return {
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      pager: this.pager || [],
      loading: true,
    };
  },
  head() {
    return {
      titleTemplate: null,
      title: 'microCMSブログ',
    };
  },
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
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
    margin-top: 60px;
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
    height: auto;
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 32px;
    height: 32px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 6px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
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

  .ogimage {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
}
</style>
