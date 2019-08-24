import axios from 'axios';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
        .get(`https://microcms.microcms.io/api/v1/blog`, {
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
