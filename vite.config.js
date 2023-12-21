import { fileURLToPath, URL } from 'node:url'

import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

const resolveAlias = Object.fromEntries(
  Object.entries({
    '@components': './src/components',
    '@pages': './src/pages',
    '@views': './src/views',
    '@router': './src/router',
    '@stores': './src/stores',
    '@utils': './src/utils',
    '@api': './src/api',
    '@assets': './src/assets',
    '@dist': './dist'
    //   '@composable': './src/composable',
    //   '@cstore': './src/composable/store',
    //   '@directive': './src/directive',
    //   '@plugins': './src/plugins',
    //   '@postcss': './src/assets/postcss',
  }).map(([key, value]) => [key, path.resolve(__dirname, value)])
)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(__dirname, './env'), '')
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: resolveAlias
    },
    envPrefix: 'VUE_',
    envDir: './env',
    server: {
      host: true,
      proxy: {}
    }
  }
})
