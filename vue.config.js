const { defineConfig } = require("@vue/cli-service");
const port = process.env.port || 8070;
const CompressionPlugin = require("compression-webpack-plugin");
// const port = process.env.port || process.env.npm_config_port || 5000; // dev port
const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = defineConfig({
  devServer: {
    port: port,
    open: false,
  },
  chainWebpack(config) {
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        automaticNameDelimiter: "-",
        chunks: "all",
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        cacheGroups: {
          spread: {
            name: "chunk-spread",
            //   test: /[\\/]node_modules[\\/]element-ui(.*)[\\/]/,
            test: /[\\/]node_modules[\\/]_?@grapecity(.*)/, // 为了适应cnpm
            priority: 30,
            minSize: 1200,
            maxSize: 524288,
            chunks: "async",
            minChunks: 2,
          },
          elementUI: {
            name: "chunk-elementUI",
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // 为了适应cnpm
            priority: 30,
          },
          chunk: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            minSize: 131072,
            maxSize: 524288,
            chunks: "async",
            minChunks: 2,
            priority: 10,
          },
        },
      });
    });
  },
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: "./",
  outputDir: "html",

  configureWebpack: () => {
    if (process.env.NODE_ENV) {
      return {
        cache: {
          type: "filesystem",
        },
        module: {
          rules: [
            {
              test: /.js$/,
              use: ["babel-loader"],
              exclude: /node_modules/,
            },
          ],
        },

        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
          }),
          //   解决spreadjs 打包太慢的问题
        ],
      };
    }
  },
  // css 相关选项
  css: {
    loaderOptions: {},
  },
});
