<template>
  <div id="author" class="wrapper">
    <Header />

    <div class="profile">
      <div class="inner">
        <picture v-if="author.image">
          <source
            type="image/webp"
            :data-srcset="author.image.url + '?w=180&h=180&fm=webp'"
          />
          <img
            :data-src="author.image.url + '?w=180&h=180'"
            :width="180"
            :height="180"
            class="ogimage lazyload"
            alt
          />
        </picture>
        <dl>
          <dt class="name">
            <span>{{ author.name }}</span
            ><a v-if="author.twitter" :href="author.twitter" target="twitter"
              ><img
                src="/images/icon_twitter.svg"
                alt="Twitter"
                width="32"
                height="32" /></a
            ><a v-if="author.facebook" :href="author.facebook" target="facebook"
              ><img
                src="/images/icon_facebook.svg"
                alt="Facebook"
                width="32"
                height="32"
            /></a>
          </dt>
          <dd>
            {{ author.text }}
          </dd>
        </dl>
        <div class="post">
          <span class="number">{{ totalCount }}</span
          ><span>Posts</span>
        </div>
      </div>
    </div>

    <div class="divider">
      <div class="container">
        <h2>{{ author.name }}が執筆した記事</h2>
        <ul class="lists">
          <li v-for="content in contents" :key="content.id" class="list">
            <nuxt-link :to="`/${content.id}`" class="link">
              <picture v-if="content.ogimage">
                <source
                  type="image/webp"
                  :data-srcset="content.ogimage.url + '?w=340&fm=webp'"
                />
                <img
                  :data-src="content.ogimage.url + '?w=340'"
                  :width="340"
                  class="ogimage lazyload"
                  alt
                />
              </picture>
              <dl class="content">
                <dt class="title">
                  {{ content.title }}
                </dt>
                <dd>
                  <div class="upper">
                    <span class="category">{{ content.category.name }}</span>
                  </div>
                  <div class="meta">
                    <div class="author">
                      <img
                        :data-src="author.image.url + '?w=40&h=40'"
                        :width="40"
                        :height="40"
                        class="ogimage lazyload"
                        alt
                      />
                      <span>{{ author.name }}</span>
                    </div>
                    <div class="timestamp">
                      <time
                        :datetime="
                          $dayjs(
                            content.publishedAt || content.createdAt
                          ).format('YYYY-MM-DD')
                        "
                      >
                        {{
                          $dayjs(
                            content.publishedAt || content.createdAt
                          ).format('YYYY/MM/DD')
                        }}
                      </time>
                    </div>
                  </div>
                </dd>
              </dl>
            </nuxt-link>
          </li>
        </ul>
        <Pagination
          v-if="contents.length > 0"
          :pager="pager"
          :current="Number(page)"
          :author="author"
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
    const authorId = params.authorId;
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
    const author = await $microcms.get({
      endpoint: `authors/${authorId}`,
    });
    const data = await $microcms.get({
      endpoint: 'blog',
      queries: {
        limit,
        offset: (page - 1) * limit,
        filters: `writer[equals]${authorId}`,
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
    return {
      ...data,
      author,
      categories: categories.contents,
      tags: tags.contents,
      authorId,
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
