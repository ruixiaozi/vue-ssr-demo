// webpack插件
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");

// 环境变量：决定入口是客户端还是服务端
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = {

  css: {
    extract:  {
      filename:"css/[name].css",//"css/[chunkhash].css",
      chunkFilename: "css/[name].css",//"css/[chunkhash].css"
    }
  },
  outputDir: './dist/'+target,
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    // 这允许 webpack 以 Node 适用方式处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: TARGET_NODE ? "node" : "web",
    node: TARGET_NODE ? undefined : false,
    output: {
      // 此处告知 server bundle 使用 Node 风格导出模块
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined,
      filename:TARGET_NODE ? undefined :"js/[name].js", //"js/[chunkhash].js",
      chunkFilename: TARGET_NODE ? undefined :"js/[name].js", //"js/[chunkhash].js"
    },
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件。
    externals: TARGET_NODE
      ? nodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块。
          // 可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
          // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
          allowlist: [/\.css$/]
        })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE?false:{
        chunks: 'async', // 仅提取按需载入的module
        minSize: 30000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
        maxSize: 0, // 提取出的新chunk在两次压缩之前要小于多少kb，默认为0，即不做限制
        minChunks: 1, // 被提取的chunk最少需要被多少chunks共同引入
        maxAsyncRequests: 5, // 最大按需载入chunks提取数
        maxInitialRequests: 3, // 最大初始同步chunks提取数
        automaticNameDelimiter: '~', // 默认的命名规则（使用~进行连接）
        name: true,
        cacheGroups: { // 缓存组配置，默认有vendors和default
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }

    },
    // 这是将服务器的整个输出构建为单个 JSON 文件的插件。
    // 服务端默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [(TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin())]
  }),
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
};
