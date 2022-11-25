<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <article class="article">
        <div class="ogimageWrap">
          <picture v-if="ogimage">
            <source
              media="(min-width: 1160px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=820&fm=webp, ${ogimage.url}?w=1640&fm=webp 2x`"
            />
            <source
              media="(min-width: 820px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=740&fm=webp, ${ogimage.url}?w=1480&fm=webp 2x`"
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=728&fm=webp, ${ogimage.url}?w=1456&fm=webp 2x`"
            />
            <source
              media="(max-width: 768px)"
              type="image/webp"
              :srcset="`${ogimage.url}?w=375&fm=webp, ${ogimage.url}?w=750&fm=webp 2x`"
            />
            <img
              ref="ogimage"
              :src="ogimage.url + '?w=820&q=100'"
              class="ogimage"
              alt
            />
          </picture>
          <picture v-else>
            <source type="image/webp" :srcset="defaultOgimage" />
            <img ref="ogimage" :src="defaultOgimage" class="ogimage" alt />
          </picture>
        </div>
        <Breadcrumb :category="category" />
        <div class="main">
          <Share :id="id" :title="title" />
          <div class="container">
            <h1 class="title">{{ title }}</h1>
            <Meta
              :created-at="publishedAt || createdAt"
              :author="writer"
              :category="category"
              :tags="tag"
              :is-single-page="true"
            />
            <Toc :id="id" :toc="toc" :visible="toc_visible" />
            <Post :body="body" />
            <ShareButtons :id="id" :title="title" />
            <NextBlogNavigation :previous="previous_blog" :next="next_blog" />
            <ConversionPoint
              :id="id"
              :contents="cv_point"
              :theme="
                cv_point === null || cv_point.length <= 0 ? '' : 'thumbnail'
              "
            />
            <Writer v-if="writer" :writer="writer" />
            <Partner v-if="partner" :partner="partner" />
            <RelatedBlogs
              v-if="related_blogs.length > 0"
              :blogs="related_blogs"
            />
          </div>
        </div>
      </article>
      <aside class="aside">
        <Search />
        <Categories :categories="categories" />
        <Tags :tags="tags" />
        <PopularArticles :contents="popularArticles" />
        <div class="followArea">
          <Banner :id="`blog-${id}`" :banner="banner" />
          <Latest :contents="contents" />
        </div>
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import getDefaultOgimage from '../../utils/getDefaultOgimage';

export default {
  async asyncData({ params, payload, $microcms }) {
    const data =
      payload !== undefined
        ? payload.content
        : await $microcms.get({
            endpoint: 'blog',
            contentId: params.slug,
            queries: {
              depth: 2,
            },
          });
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
    const { contents } = await $microcms.get({
      endpoint: 'blog',
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
      $(elm).attr('class', 'lazyload');
      $(elm).attr('data-src', elm.attribs.src);
      $(elm).removeAttr('src');
    });

    data.related_blogs.forEach((blog) => {
      blog.defaultOgimage = getDefaultOgimage(blog);
    });

    return {
      ...data,
      defaultOgimage: getDefaultOgimage(data),
      popularArticles,
      banner,
      body: $.html(),
      toc,
      categories: categories.contents,
      tags: tags.contents,
      contents,
    };
  },
  data() {
    return {
      publishedAt: '',
      ogimage: null,
    };
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
          content: `https://blog.microcms.io/${this.id}/`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.ogimage ? this.ogimage.url : this.defaultOgimage,
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

  .followArea {
    position: sticky !important;
    top: 115px;
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
    margin-top: 40px;
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
    margin-top: 40px;
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
