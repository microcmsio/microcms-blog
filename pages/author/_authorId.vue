<template>
  <div id="author" class="wrapper">
    <Header />

    <div class="profile">
      <div class="inner">
        <picture v-if="author.image">
          <source
            type="image/webp"
            :data-srcset="author.image.url + '?w=360&h=360&fm=webp'"
          />
          <img
            :data-src="author.image.url + '?w=360&h=360'"
            :width="180"
            :height="180"
            class="authorImg lazyload"
            alt
          />
        </picture>
        <dl class="content">
          <dt class="nameWrapper">
            <span class="name">{{ author.name }}</span>
            <a v-if="author.twitter" :href="author.twitter" target="twitter">
              <img
                src="/images/icon_twitter.svg"
                alt="Twitter"
                class="icon lazyload"
                width="32"
                height="32"
              />
            </a>
            <a v-if="author.facebook" :href="author.facebook" target="facebook">
              <img
                src="/images/icon_facebook.svg"
                alt="Facebook"
                class="icon lazyload"
                width="32"
                height="32"
              />
            </a>
            <a v-if="author.github" :href="author.github" target="github">
              <img
                src="/images/icon_github.svg"
                alt="GitHub"
                class="icon lazyload"
                width="32"
                height="32"
              />
            </a>
            <a :href="`/author/${author.id}/feed.xml`" target="rss">
              <img
                src="/images/icon_feed.svg"
                alt="RSS"
                class="icon lazyload"
                width="32"
                height="32"
              />
            </a>
          </dt>
          <dd class="text">
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
        <Breadcrumb />
        <h2 class="title">{{ author.name }}が執筆した記事</h2>
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <ul class="lists">
          <li v-for="content in contents" :key="content.id" class="list">
            <Card :content="content" :author="author" />
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
import getDefaultOgimage from '../../utils/getDefaultOgimage';

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

    data.contents.forEach((content) => {
      content.defaultOgimage = getDefaultOgimage(content);
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
      title: `${this.author.name}が執筆した記事 | microCMSブログ`,
    };
  },
};
</script>

<style scoped>
.profile {
  background-color: var(--color-bg-purple-lightest);
  padding: 64px 0;
  margin: -45px auto 64px;
}
.inner {
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
}
.content {
  margin-left: 60px;
}
.nameWrapper {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.name {
  font-size: 32px;
  font-weight: 900;
  margin-right: 24px;
}
.text {
  margin-top: 8px;
}
.icon {
  margin-right: 16px;
}
.authorImg {
  border-radius: 50%;
}
.post {
  text-align: center;
  font-weight: 800;
  font-size: 24px;
  margin-left: 60px;
}
.number {
  display: block;
  font-size: 72px;
  margin-bottom: -10px;
}
.lists {
  display: flex;
  flex-wrap: wrap;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0 24px;
}
.list {
  width: 340px;
  padding: 0 0 64px;
}
.loader {
  color: var(--color-text-disabled);
  font-size: 20px;
  text-align: center;
  padding: 150px;
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
  .list:nth-child(odd) {
    margin-right: 60px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .profile {
    margin: 0 auto 64px;
  }
  .inner {
    max-width: 740px;
    display: block;
    text-align: center;
  }
  .post,
  .content {
    margin: 16px 0;
  }
  .divider {
    margin: 20px auto 0;
    width: 740px;
  }
  .aside {
    margin-top: 60px;
  }
  .nameWrapper {
    justify-content: center;
  }

  .list:nth-child(odd) {
    margin-right: 60px;
  }
}
@media (max-width: 820px) {
  .lists {
    width: 100%;
  }
  .profile {
    margin: 0 auto 64px;
    padding: 64px 20px;
  }
  .inner {
    max-width: 740px;
    display: block;
    text-align: center;
  }
  .content,
  .post {
    margin: 16px 0;
  }
  .divider {
    margin: 20px 0 0;
    padding: 0 20px;
  }

  .aside {
    margin-top: 60px;
    width: 100%;
  }
  .nameWrapper {
    display: block;
  }
  .name {
    display: block;
    margin-right: 0;
    margin-bottom: 16px;
  }
  .list {
    width: 100%;
    padding: 32px 0;
    border-bottom: 1px solid var(--color-border-light);

    &:first-child {
      padding-top: 16px;
    }
  }
  .loader {
    color: var(--color-text-disabled);
    font-size: 16px;
    padding-top: 20px;
  }
}
</style>
