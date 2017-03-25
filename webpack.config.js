var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var autoprefixer = require('autoprefixer')
/*
 * Default webpack configuration for development
 */
// "/app/BoardContainer.js"
var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/BoardContainer.js",
  output: {
    path: __dirname + "/public",
    publicPath: '/open/',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader', //不能写成简写
      query: {
        presets: ['es2015','react']
      }
    },
    {
      test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader',
    },
    {
      test: /\.css$/, loader: 'style-loader!css-loader',
    }]
  },
  devServer: {
    historyApiFallback: true,
  }

  // devServer: {
  //   contentBase: "./public",
  //   colors: true,
  //   historyApiFallback: true,
  //   inline: true
  // },//去掉之后不报错？
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;//生产环境中不起用地图查找
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),//压缩脚本
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
