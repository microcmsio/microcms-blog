import axios from 'axios';
require('dotenv').config();
const { API_KEY } = process.env;

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
  },
  privateRuntimeConfig: {
    apiKey: API_KEY,
  },
  mode: 'universal',
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    titleTemplete: '%s | microCMSブログ',
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
        content: 'https://microcms.io/blog/',
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
        content: 'https://microcms.io/blog/images/ogp.png',
      },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@micro_cms' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://microcms.io/images/favicon.png',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://microcms.io/blog/feed.xml',
        title: 'Atom',
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
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-109902480-8',
      },
    ],
    ['@nuxtjs/sitemap'],
    '@nuxtjs/feed',
  ],
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja'
  },
  pwa: {
    workbox: {
      offlineAssets: [
        '/blog/images/banner_logo.svg',
        '/blog/images/icon_author.svg',
        '/blog/images/icon_clock.svg',
        '/blog/images/icon_facebook.svg',
        '/blog/images/icon_feed.svg',
        '/blog/images/icon_hatena.svg',
        '/blog/images/icon_menu.svg',
        '/blog/images/icon_quote.svg',
        '/blog/images/icon_search.svg',
        '/blog/images/icon_twitter.svg',
        '/blog/images/icon_link.svg',
        '/blog/images/logo.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
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
    base: '/blog',
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
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = await axios
        .get(`https://microcms.microcms.io/api/v1/popular-articles`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.articles;
        });
      const getArticles = (offset = 0) => {
        return axios
          .get(
            `https://microcms.microcms.io/api/v1/blog?offset=${offset}&limit=${limit}&depth=2`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then(async (res) => {
            let articles = [];
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles },
      };

      // 一覧のページング
      const pages = await axios
        .get(`https://microcms.microcms.io/api/v1/blog?limit=1&fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
            route: `/page/${p}`,
            payload: { popularArticles },
          }))
        );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles },
      };

      const categories = await axios
        .get(`https://microcms.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios
            .get(
              `https://microcms.microcms.io/api/v1/blog?limit=1&fields=id&filters=category[equals]${category}`,
              {
                headers: {
                  'X-API-KEY': API_KEY,
                },
              }
            )
            .then((res) => {
              return range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);
      return [index, search, ...articles, ...pages, ...flattenCategoryPages];
    },
    dir: 'dist/blog',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://microcms.io/blog',
    exclude: ['/draft'],
    routes(callback) {
      axios
        .get(`https://microcms.microcms.io/api/v1/blog?limit=100`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then((res) =>
          callback(
            null,
            res.data.contents.map((content) => `${content.id}/`)
          )
        );
    },
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'microCMSブログ',
          link: 'https://microcms.io/blog/feed.xml',
          description:
            'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
        };

        const posts = await axios
          .get(`https://microcms.microcms.io/api/v1/blog?limit=100`, {
            headers: { 'X-API-KEY': API_KEY },
          })
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://microcms.io/blog/${post.id}`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'atom1',
    },
  ],
};
