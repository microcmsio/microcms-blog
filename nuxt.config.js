import axios from 'axios';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'jp'
    },
    titleTemplete: '%s | microCMSブログ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'microCMSブログ'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://microcms.io/blog/'
      },
      { hid: 'og:title', property: 'og:title', content: 'microCMSブログ' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://microcms.io/blog/images/ogp.png'
      },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@micro_cms' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://microcms.io/assets/images/favicon.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/styles/reset.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/moment', ['ja']],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-109902480-8'
      }
    ],
    ['@nuxtjs/sitemap']
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    }
  },
  router: {
    base: '/blog',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'paging'
      });
    }
  },
  generate: {
    routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      return axios
        .get(`https://microcms.microcms.io/api/v1/blog?limit=100&depth=3`, {
          headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
        })
        .then(res => {
          const articles = res.data.contents.map(content => ({
            route: content.id,
            payload: content
          }));
          return [
            ...articles,
            ...range(1, Math.ceil(res.data.contents.length / 10)).map(p => ({
              route: `/page/${p}`
            }))
          ];
        });
    },
    dir: 'dist/blog'
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://microcms.io/blog',
    exclude: ['/draft'],
    routes(callback) {
      axios
        .get(`https://microcms.microcms.io/api/v1/blog?limit=100`, {
          headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
        })
        .then(res =>
          callback(
            null,
            res.data.contents.map(content => content.id)
          )
        );
    }
  }
};
