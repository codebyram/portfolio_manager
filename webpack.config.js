const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: ['./src/main.js','./scss/main.scss'],
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    inline: true,
    port: 8800,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'latest', 'stage-3']
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
};