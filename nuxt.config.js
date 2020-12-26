let development = process.env.NODE_ENV !== 'production'
console.log(development)
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'expense-tracking',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
      },
      {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js'
      }
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/node_modules/animate.css/animate'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-imports',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslinteslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    'vue-currency-input/nuxt',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseURL: 'http://localhost:5000/expense/api/v1'
    baseURL: development ? 'http://localhost:5000/expense/api/v1' : 'https://api.sarathe.com/expense/api/v1'
    // baseURL: development ? 'https://api.sarathe.com/expense/api/v1' : 'http://api.sarathe.com/expense/api/v1'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  fontawesome: {
    icons: {
      solid: true
    }
  },
  loading: {
    color: 'red',
    height: '2px'
  }


  // tailwindcss: {
  //   cssPath: '~/assets/css/tailwind.css',
  // }
}
