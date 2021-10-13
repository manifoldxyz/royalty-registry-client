const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_reset.scss";
          @import "@/scss/_base.scss";
          @import "@/scss/_overwrites.scss";
        `
      }
    }
  },
  configureWebpack: {
    entry: './src/main.ts',
    resolve: {
      symlinks: false,
      extensions: ['.js', '.vue', '.ts']
    },
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
        fix: true
      })
    ],
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map'
  }
}
