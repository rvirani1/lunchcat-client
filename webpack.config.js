var webpack = require('webpack');

// Load environment config
var nodeEnv = process.env.NODE_ENV || 'development';
var envConfig;
try {
  envConfig = require('./config/'+nodeEnv);
} catch(error) {
  console.error('The NODE_ENV must correspond to a module defined in the config directory. Value was', nodeEnv);
  throw error;
}

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    // hot: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envConfig)
  ]
};
