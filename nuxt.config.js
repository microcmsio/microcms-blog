import { client } from './utils/microcms';
const { API_KEY, SERVICE_ID, GTM_ID, FB_PIXEL_ID } = process.env;

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    titleTemplate: '%s | microCMSブログ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'microCMSブログ',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://blog.microcms.io',
      },
      { hid: 'og:title', property: 'og:title', content: 'microCMSブログ' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://blog.microcms.io/images/ogp.png',
      },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@micro_cms' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://blog.microcms.io/favicon.png',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://blog.microcms.io/feed.xml',
        title: 'Atom',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js',
        async: true,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#331cbf' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/reset.css',
    '@/assets/styles/colors.css',
    {
      src: '~/node_modules/highlight.js/styles/hybrid.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-scrollto'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/dayjs'],
    GTM_ID ? ['@nuxtjs/gtm'] : undefined,
    FB_PIXEL_ID
      ? [
          'nuxt-facebook-pixel-module',
          {
            track: 'PageView',
            pixelId: FB_PIXEL_ID,
            autoPageView: true,
            disabled: false,
          },
        ]
      : undefined,
    ['@nuxtjs/sitemap'],
    '@nuxtjs/feed',
    '@nuxtjs/proxy',
    'nuxt-microcms-module',
  ].filter((v) => v),
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  gtm: {
    id: GTM_ID || undefined,
  },
  proxy: ['http://localhost:9000/.netlify'],
  pwa: {
    workbox: {
      offlineAssets: [
        '/images/banner_logo.svg',
        '/images/icon_author.svg',
        '/images/icon_clock.svg',
        '/images/icon_facebook.svg',
        '/images/icon_feed.svg',
        '/images/icon_hatena.svg',
        '/images/icon_menu.svg',
        '/images/icon_quote.svg',
        '/images/icon_search.svg',
        '/images/icon_twitter.svg',
        '/images/icon_link.svg',
        '/images/logo.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },
  microcms: {
    options: {
      serviceDomain: SERVICE_ID,
      apiKey: API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          preserve: false,
          importFrom: ['assets/styles/colors.css'],
        },
        'postcss-nested': {},
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/category/:categoryId/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'categories',
      });
      routes.push({
        path: '/tag/:tagId/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tags',
      });
      routes.push({
        path: '/author/:authorId/page/:id',
        component: resolve(__dirname, 'pages/author/_authorId.vue'),
        name: 'authors',
      });
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    interval: 100,
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = (
        await client.get({
          endpoint: 'popular-articles',
        })
      ).articles;
      const banner = await client.get({
        endpoint: 'banner',
      });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return client
          .get({
            endpoint: 'blog',
            queries: {
              offset,
              limit,
              depth: 2,
            },
          })
          .then(async (res) => {
            let articles = [];
            if (res.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles, banner },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles, banner },
      };

      // 一覧のページング
      const pages = await client
        .get({
          endpoint: 'blog',
          queries: {
            limit: 0,
          },
        })
        .then((res) =>
          range(1, Math.ceil(res.totalCount / 10)).map((p) => ({
            route: `/page/${p}`,
            payload: { popularArticles, banner },
          }))
        );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles, banner },
      };

      const categories = await client
        .get({
          endpoint: 'categories',
          queries: {
            fields: 'id',
          },
        })
        .then(({ contents }) => {
          return contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          client
            .get({
              endpoint: 'blog',
              queries: {
                limit: 0,
                filters: `category[equals]${category}`,
              },
            })
            .then((res) => {
              return range(1, Math.ceil(res.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);

      const tags = await client
        .get({
          endpoint: 'tags',
          queries: {
            fields: 'id',
            limit: 1000,
          },
        })
        .then(({ contents }) => {
          return contents.map((content) => content.id);
        });

      // タグページ
      const tagPages = await Promise.all(
        tags.map((tag) =>
          client
            .get({
              endpoint: 'blog',
              queries: {
                limit: 0,
                filters: `tag[contains]${tag}`,
              },
            })
            .then((res) => {
              return range(1, Math.ceil(res.totalCount / 10)).map((p) => ({
                route: `/tag/${tag}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenTagPages = [].concat.apply([], tagPages);

      return [
        index,
        search,
        ...articles,
        ...pages,
        ...flattenCategoryPages,
        ...flattenTagPages,
      ];
    },
    dir: 'dist',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://blog.microcms.io',
    exclude: ['/draft', '/404'],
    gzip: true,
    trailingSlash: true,
  },
  feed: async () => {
    const authors = await client
      .get({
        endpoint: 'authors',
        queries: {
          limit: 1000,
        },
      })
      .then((res) => res.contents);
    const authorsSettings = authors.map((author) => {
      return {
        path: `/author/${author.id}/feed.xml`,
        async create(feed) {
          feed.options = {
            title: `${author.name}が執筆した記事 | microCMSブログ`,
            link: 'https://blog.microcms.io/feed.xml',
            description:
              'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
          };
          const posts = await client
            .get({
              endpoint: 'blog',
              queries: {
                filters: `writer[equals]${author.id}`,
              },
            })
            .then((res) => res.contents);
          posts.forEach((post) => {
            feed.addItem({
              title: post.title,
              id: post.id,
              link: `https://blog.microcms.io/${post.id}/`,
              description: post.description,
              content: post.description,
              date: new Date(post.publishedAt || post.createdAt),
              image: post.ogimage && post.ogimage.url,
            });
          });
        },
        cacheTime: 1000 * 60 * 15,
        type: 'rss2',
      };
    });
    return [
      {
        path: '/feed.xml',
        async create(feed) {
          feed.options = {
            title: 'microCMSブログ',
            link: 'https://blog.microcms.io/feed.xml',
            description:
              'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
          };

          const posts = await client
            .get({
              endpoint: 'blog',
            })
            .then((res) => res.contents);

          posts.forEach((post) => {
            feed.addItem({
              title: post.title,
              id: post.id,
              link: `https://blog.microcms.io/${post.id}/`,
              description: post.description,
              content: post.description,
              date: new Date(post.publishedAt || post.createdAt),
              image: post.ogimage && post.ogimage.url,
            });
          });
        },
        cacheTime: 1000 * 60 * 15,
        type: 'rss2',
      },
      {
        path: '/feed_update.xml',
        async create(feed) {
          feed.options = {
            title: '更新情報｜microCMSブログ',
            link: 'https://blog.microcms.io/feed.xml',
            description:
              'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
          };

          const posts = await client
            .get({
              endpoint: 'blog',
              queries: {
                filters: 'category[equals]update',
              },
            })
            .then((res) => res.contents);

          posts.forEach((post) => {
            feed.addItem({
              title: post.title,
              id: post.id,
              link: `https://blog.microcms.io/${post.id}/`,
              description: post.description,
              content: post.description,
              date: new Date(post.publishedAt || post.createdAt),
              image: post.ogimage && post.ogimage.url,
            });
          });
        },
        cacheTime: 1000 * 60 * 15,
        type: 'rss2',
      },
      {
        path: '/feed_usecase.xml',
        async create(feed) {
          feed.options = {
            title: '導入事例｜microCMSブログ',
            link: 'https://blog.microcms.io/feed.xml',
            description:
              'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
          };

          const posts = await client
            .get({
              endpoint: 'blog',
              queries: {
                filters: 'category[equals]usecase',
              },
            })
            .then((res) => res.contents);

          posts.forEach((post) => {
            feed.addItem({
              title: post.title,
              id: post.id,
              link: `https://blog.microcms.io/${post.id}/`,
              description: post.description,
              content: post.description,
              date: new Date(post.publishedAt || post.createdAt),
              image: post.ogimage && post.ogimage.url,
            });
          });
        },
        cacheTime: 1000 * 60 * 15,
        type: 'rss2',
      },
      ...authorsSettings,
    ];
  },
};
