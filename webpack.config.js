var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: NODE_ENV=='development' ? './src/main.js' : './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'tiny-report.js',
    library: 'tiny-report',
    libraryTarget:'umd',
    umdNamedDefine: true 
  },
  module: {
    rules: [

      {
        //test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG)(\?\S*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        //loader: 'babel-loader',        
        
        use: [{
          loader: 'babel-loader',
          options: {
             presets: ['es2015']
          }
        }],
        exclude: /node_modules/
        
      },

    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  //devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /*
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    */
    //new UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else{
  module.exports.devtool = '#eval-source-map'
}
