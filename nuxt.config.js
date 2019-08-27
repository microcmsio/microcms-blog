import axios from 'axios';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
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
        content: 'https://microcms.io/assets/images/ogp.png'
      },

      { name: 'twitter:card', content: 'summary' },
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
  modules: [['@nuxtjs/moment', ['ja']]],
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
  generate: {
    routes() {
      return axios
        .get(`https://microcms.microcms.io/api/v1/blog?limit=100`, {
          headers: { 'X-API-KEY': '1c801446-5d12-4076-aba6-da78999af9a8' }
        })
        .then(res =>
          res.data.contents.map(content => ({
            route: content.id,
            payload: content
          }))
        );
    }
  }
};
