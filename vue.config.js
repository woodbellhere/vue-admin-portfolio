const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  transpileDependencies: true,
  // 读取所有文件的默认路径，一般就是根目录，但是打包之后有变化，所以./基本就够了
  // 打包后index.html中script的src里的路径就比较对劲了
  publicPath: "./",
  outputDir: "./build",
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     components: "@/components",
    //     view: "@/views",
    //   },
    // },
    // plugins: [
    //   require("unplugin-vue-components/webpack").default({
    //     /* options */
    //   }),
    //   require("unplugin-auto-import/webpack").default({
    //     /* options */
    //   }),
    // ],
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://codercba.com:5000",
        // target: "http://152.136.185.210:5000",
        // 换地址之后api这几个字母本身就可以不要了
        pathRewrite: {
          "^/api": "",
        },
        // 修改host头，而非origin头，似乎多数情况下没啥用
        changeOrigin: true,
      },
    },
  },
});
