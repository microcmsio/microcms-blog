<template>
  <div id="author" class="wrapper">
    <Header />

    <div class="profile">
      <div class="inner">
        <img
          src="https://pbs.twimg.com/profile_images/1401823780809285642/eu7emWfl_400x400.jpg"
          width="180"
          height="180"
          alt=""
        />
        <dl>
          <dt class="name">
            <span>ひまらつ</span
            ><a href="#"
              ><img
                src="/images/icon_twitter.svg"
                alt="Twitter"
                width="32"
                height="32" /></a
            ><a href="#"
              ><img
                src="/images/icon_facebook.svg"
                alt="Facebook"
                width="32"
                height="32"
            /></a>
          </dt>
          <dd>
            SwiftやPythonやスプラトゥーンを楽しんでます<br />
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </dd>
        </dl>
        <div class="post">
          <span class="number">120</span><span>Posts</span>
        </div>
      </div>
    </div>

    <div class="divider">
      <div class="container">
        <h2>ひまらつが執筆した記事</h2>
        <ul class="lists">
          <li class="list">
            <a href="#" class="link">
              <picture
                ><img
                  src="https://images.blog.microcms.io/assets/f5d83e38f9374219900ef1b0cc4d85cd/f05f7242158e42f098ec1826088bd5fc/media-tags-and-fiter.png?w=670"
              /></picture>
              <dl class="content">
                <dt class="title">
                  メディアのタグ管理・フィルタ機能をリリースしました
                </dt>
                <dd>
                  <div class="upper">
                    <span class="category">更新情報</span
                    ><span class="category">運用</span>
                  </div>
                  <div class="meta">
                    <div class="author">
                      <img
                        src="https://pbs.twimg.com/profile_images/1401823780809285642/eu7emWfl_400x400.jpg"
                        width="40"
                        height="40"
                        alt=""
                      /><span>ひまらつ</span>
                    </div>
                    <div class="timestamp">2022.10.18</div>
                  </div>
                </dd>
              </dl>
            </a>
          </li>
          <li class="list">
            <a href="#" class="link">
              <picture
                ><img
                  src="https://images.blog.microcms.io/assets/f5d83e38f9374219900ef1b0cc4d85cd/f05f7242158e42f098ec1826088bd5fc/media-tags-and-fiter.png?w=670"
              /></picture>
              <dl class="content">
                <dt class="title">
                  メディアのタグ管理・フィルタ機能をリリースしました
                </dt>
                <dd>
                  <div class="upper">
                    <span class="category">更新情報</span
                    ><span class="category">運用</span>
                  </div>
                  <div class="meta">
                    <div class="author">
                      <img
                        src="https://pbs.twimg.com/profile_images/1401823780809285642/eu7emWfl_400x400.jpg"
                        width="40"
                        height="40"
                        alt=""
                      /><span>ひまらつ</span>
                    </div>
                    <div class="timestamp">2022.10.18</div>
                  </div>
                </dd>
              </dl>
            </a>
          </li>
          <li class="list">
            <a href="#" class="link">
              <picture
                ><img
                  src="https://images.blog.microcms.io/assets/f5d83e38f9374219900ef1b0cc4d85cd/f05f7242158e42f098ec1826088bd5fc/media-tags-and-fiter.png?w=670"
              /></picture>
              <dl class="content">
                <dt class="title">
                  メディアのタグ管理・フィルタ機能をリリースしました
                </dt>
                <dd>
                  <div class="upper">
                    <span class="category">更新情報</span
                    ><span class="category">運用</span>
                  </div>
                  <div class="meta">
                    <div class="author">
                      <img
                        src="https://pbs.twimg.com/profile_images/1401823780809285642/eu7emWfl_400x400.jpg"
                        width="40"
                        height="40"
                        alt=""
                      /><span>ひまらつ</span>
                    </div>
                    <div class="timestamp">2022.10.18</div>
                  </div>
                </dd>
              </dl>
            </a>
          </li>
          <li class="list">
            <a href="#" class="link">
              <picture
                ><img
                  src="https://images.blog.microcms.io/assets/f5d83e38f9374219900ef1b0cc4d85cd/f05f7242158e42f098ec1826088bd5fc/media-tags-and-fiter.png?w=670"
              /></picture>
              <dl class="content">
                <dt class="title">
                  メディアのタグ管理・フィルタ機能をリリースしました
                </dt>
                <dd>
                  <div class="upper">
                    <span class="category">更新情報</span
                    ><span class="category">運用</span>
                  </div>
                  <div class="meta">
                    <div class="author">
                      <img
                        src="https://pbs.twimg.com/profile_images/1401823780809285642/eu7emWfl_400x400.jpg"
                        width="40"
                        height="40"
                        alt=""
                      /><span>ひまらつ</span>
                    </div>
                    <div class="timestamp">2022.10.18</div>
                  </div>
                </dd>
              </dl>
            </a>
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
.profile {
  background-color: #f8f9fd;
  padding: 64px 0;
  margin: -45px auto 64px;
  .inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    img {
      border-radius: 100px;
    }
    dl {
      margin-left: 60px;
      .name {
        span {
          font-size: 32px;
          font-weight: 900;
          margin-right: 24px;
        }
        img {
          margin-right: 16px;
          border-radius: 0;
        }
      }
      dd {
        margin-top: 8px;
      }
    }
    .post {
      text-align: center;
      font-weight: 800;
      font-size: 24px;
      margin-left: 60px;
      span {
        display: block;
      }
      .number {
        font-size: 72px;
        margin-bottom: -10px;
      }
    }
  }
}
.divider {
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .lists {
    display: flex;
    flex-wrap: wrap;
    .list {
      width: 340px;
      padding: 0 0 64px;
      .link {
        display: block;
        picture img {
          width: 340px;
        }
        .content {
          margin: 16px 0 0;
          .title {
            font-size: 20px;
            font-weight: bold;
          }
          .upper {
            margin-top: 16px;
            .category {
              display: inline-block;
              padding: 8px 16px;
              white-space: nowrap;
              color: #21213b;
              font-weight: bold;
              border-radius: 4px;
              font-size: 14px;
              margin-right: 16px;
              background: #ececec;
            }
          }
          .meta {
            display: flex;
            align-items: center;
            margin-top: 16px;
            .author,
            .timestamp {
              display: inline-flex;
              align-items: center;
              margin-right: 16px;
              color: #666;
              img {
                border-radius: 100px;
                margin-right: 8px;
              }
            }
            .author {
              font-weight: bold;
            }
          }
        }
      }
    }
    li:nth-child(odd) {
      margin-right: 60px;
    }
  }
}

@media (min-width: 1160px) {
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

  .link {
    display: flex;
    justify-content: space-between;
  }

  .content {
    flex: 1;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .profile {
    margin: 0 auto 64px;
    .inner {
      max-width: 740px;
      display: block;
      text-align: center;
      dl,
      .post {
        margin: 16px 0;
        .name {
          margin-bottom: 16px;
        }
      }
    }
  }
  .divider {
    margin: 20px auto 0;
    width: 740px;
  }

  .aside {
    margin-top: 60px;
  }

  .link {
    display: flex;
    justify-content: space-between;
  }

  .content {
    flex: 1;
  }
}
@media (max-width: 820px) {
  .divider {
    .lists {
      width: 100%;

      li:nth-child(odd) {
        margin-right: 0;
      }
      .list {
        width: 100%;
        .link {
          picture img {
            width: 100%;
          }
        }
      }
    }
  }
  .profile {
    margin: 0 auto 64px;
    padding: 64px 20px;
    .inner {
      max-width: 740px;
      display: block;
      text-align: center;
      dl,
      .post {
        margin: 16px 0;
        .name {
          margin-bottom: 16px;
        }
      }
    }
  }
  .divider {
    margin: 20px 0 0;
    padding: 0 20px;
  }

  .aside {
    margin-top: 60px;
    width: 100%;
  }

  .list {
    padding: 32px 0 0;
    border-bottom: 1px solid #eee;

    &:first-child {
      padding-top: 16px;
    }
  }

  .title {
    margin-top: 10px;
  }
}
</style>
