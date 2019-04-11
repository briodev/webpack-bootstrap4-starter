const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor/index.js',
  },
  output: {
    filename: 'js/[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "production",
    // using mode: "production" attaches the following configuration:
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin()
        ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0
    }
  },
  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      //SCSS
      {
        test: /\.(s*)css$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          
          MiniCssExtractPlugin.loader,
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },

      //Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000
            }
          },
          {
            loader: 'file-loader',
            options: {
              //name: '[path][name].[ext]',
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ]
      },
      //Fonts
      {
        test: /\.(eot|ttf|woff|woff2|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //name: '[path][name].[ext]',
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({template: './src/index.html'}), 
    new MiniCssExtractPlugin(
      {
        filename: "css/main.css"
      }
    )
  ],
};


