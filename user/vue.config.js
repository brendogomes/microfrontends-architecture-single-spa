const { defineConfig } = require("@vue/cli-service");
const { DefinePlugin } = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
    plugins: [
      new DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      }),
    ],
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          isCustomElement: (tag) => tag.startsWith("web-"),
        };
        return options;
      });
  },
});
