// const fs = require('fs')
// const path = require('path')
// const join = path.join
// const resolve = (dir) => path.join(__dirname, './', dir)
// var isProduct = process.env.NODE_ENV === 'production'
// var target = process.env.tagrget

// console.log('环境变量:', isProduct, process.env.tagrget)
// function toLine (name) {
//   return name.replace(/([A-Z])/g, '-$1').toLowerCase()
// }
// const utils = {
//   resolve,
//   getComponentEntries (path) {
//     const files = fs.readdirSync(resolve(path))
//     const componentEntries = files.reduce((ret, item) => {
//       const itemPath = join(path, item)
//       const isDir = fs.statSync(itemPath).isDirectory()
//       if (!['types', 'utils', 'mixins', 'index.js'].includes(item)) {
//         if (['styles'].includes(item)) {
//           item = 'theme'
//         } else if (!['index.js'].includes(item)) {
//           item = 'xl-' + toLine(item)
//         }
//         if (isDir) {
//           ret[item] = resolve(join(itemPath, 'index.js'))
//         } else {
//           const [name] = item.split('.')
//           ret[name] = resolve(`${itemPath}`)
//         }
//       }
//       return ret
//     }, {})
//     console.dir(componentEntries)
//     return componentEntries
//   }
// }

// const pub = {
//   resolve: {
//     extensions: ['.js', '.vue', '.json'],
//     alias: {
//       src: utils.resolve('src'),
//       components: utils.resolve('components'),
//       'demo-vuecli3-ui': utils.resolve('components/index.js')
//     }
//   }
// }

// module.exports = () => {
//   if (isProduct) {
//     if (target === 'COMP') {
//       return {
//         publicPath: isProduct ? './' : './',
//         outputDir: resolve('lib'),
//         productionSourceMap: false,
//         configureWebpack: {
//           entry: {
//             ...utils.getComponentEntries('packages')
//           },
//           output: {
//             filename: '[name]/index.js',
//             libraryTarget: 'commonjs2',
//             libraryExport: 'default',
//             library: 'demo-vuecli3-ui'
//           },
//           resolve: pub.resolve
//         },
//         css: {
//           sourceMap: false,
//           // extract: false
//           extract: {
//             filename: '[name]/style.css'
//           }
//         },
//         chainWebpack: config => {
//           config.optimization.delete('splitChunks')
//           config.plugins.delete('copy')
//           config.plugins.delete('preload')
//           config.plugins.delete('prefetch')
//           config.plugins.delete('html')
//           config.plugins.delete('hmr')
//           config.entryPoints.delete('app')

//           config.module
//             .rule('fonts')
//             .use('url-loader')
//             .tap(option => {
//               option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
//               return option
//             })
//         }
//       }
//     } else {
//       return {
//         outputDir: resolve('lib'),
//         productionSourceMap: false,
//         configureWebpack: {
//           entry: 'package/index.js',
//           output: {
//             filename: 'index.js',
//             libraryTarget: 'commonjs2',
//             libraryExport: 'default',
//             library: 'demo-vuecli3-ui'
//           },
//           resolve: pub.resolve
//         },
//         css: {
//           sourceMap: false,
//           extract: {
//             filename: '[name]/style.css'
//           }
//         },
//         chainWebpack: config => {
//           config.optimization.delete('splitChunks')
//           config.plugins.delete('copy')
//           config.plugins.delete('preload')
//           config.plugins.delete('prefetch')
//           config.plugins.delete('html')
//           config.plugins.delete('hmr')
//           config.entryPoints.delete('app')

//           config.module
//             .rule('fonts')
//             .use('url-loader')
//             .tap(option => {
//               option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
//               return option
//             })
//         }
//       }
//     }
//   } else {
//     return {
//       publicPath: isProduct ? './' : './',
//       outputDir: 'build',
//       assetsDir: 'assets',
//       indexPath: 'index.html',
//       filenameHashing: true,
//       pages: {
//         index: {
//           entry: 'example/main.js',
//           template: 'public/index.html',
//           filename: 'index.html'
//         }
//       },
//       runtimeCompiler: false,
//       productionSourceMap: false,
//       configureWebpack: {
//         devtool: 'source-map'
//       },
//       chainWebpack: (config) => {
//         config.resolve.alias
//           .set('@', path.resolve('example'))
//           .set('~', path.resolve('packages'))

//         config.module
//           .rule('js')
//           .include.add(/packages/).end()
//           .include.add(/example/).end()
//           .use('babel')
//           .loader('babel-loader')
//           // .loader('vue-loader-v16')

//           .tap(options => {
//             return options
//           })
//         config.module
//           .rule('fonts')
//           .use('url-loader')
//           .tap(option => {
//             option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
//             return option
//           })
//         // config.module.rule('vue').use('vue-loader-v16').loader('vue-loader-v16')
//         // config.module.rule('js').use('vue-loader-v16')
//       }
//     }
//   }
// }

const path = require('path')

// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

var isProduct = process.env.NODE_ENV === 'production'
console.log('变量测试:' + process.env.NODE_ENV)
module.exports = {
  // 应用包基本 URL
  publicPath: isProduct ? './' : './',

  // 打包目录
  // outputDir: process.env.OUTDIR,
  outputDir: 'D:/nginx-1.20.1/html/sp',

  // 放置生成的静态资源
  assetsDir: 'assets',

  // 生成的 index.html 的输出路径
  indexPath: 'index.html',

  // 静态资源文件名中包含 hash
  filenameHashing: true,

  // multi-page 模式
  // pages: entryConfig.createEntryConfig_dev(),
  pages: {
    // index: './src/main.js', // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
    // main: './src/views/main/main.js'
    index: {
      // page 的入口
      entry: 'example/main.ts',
      template: 'example/index.html',
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },

  // 使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // babel-loader 加载的 node_modules 中的文件
  transpileDependencies: [],

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  //   crossorigin:''
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: 'true',
  // webpack配置
  configureWebpack: (config) => {
    if (isProduct) {
      // 生产环境
      config.mode = 'production'
    } else {
      // 开发环境
      config.mode = 'development'
    }
    config.externals = {
      'highlight.min.js': 'hljs'
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias
      // .set('vue$', 'vue/dist/vue.esm.js')//含 编译器 的 vue 版本时
      // .set('@', resolve('src'))
      // .set('%', resolve('config'))
      // .set('?', resolve('src/components'))
      // .set('>', resolve('public'))
      .set('~', path.resolve('example'))
      .set('@', path.resolve('packages'))
    if (isProduct) { // 打包分析
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },

  // css相关配置
  css: {
    // 分离css（插件ExtractTextPlugin）
    extract: true,
    // 开启 CSS source maps
    sourceMap: false
    // css预设器配置项
    // loaderOptions: {
    //   less: {
    //     // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
    //     // `primary` is global variables fields name
    //     globalVars: {
    //       primary: '#fff'
    //     }
    //     // import: resolve('src/styles/main.less')
    //   }
    // }
    // 启用 CSS modules for all css / pre-processor files.
    // false会导致elementplus样式失效
    // requireModuleExtension: true
  },

  // 使用 thread-loader
  parallel: require('os').cpus().length > 1,

  // PWA 插件相关配置
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    open: true, // run serve自动打开浏览器
    disableHostCheck: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // http 代理配置
    proxy: {
      '/api': {
        target: 'http://url',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: (app) => {}
  },

  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
      ]
    }
  }
}
