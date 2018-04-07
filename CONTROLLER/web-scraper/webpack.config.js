

var webpack = require('webpack');
var UglifyJSPlugin =  require("uglifyjs-webpack-plugin")

module.exports = {
  entry:{
    player : ["./app.js"],
  },

  mode : 'production',

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },


  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : [
          {
            loader :'babel-loader',
            options : {
              presets : ['env'],
            }
         } 
       ]
      }
    ]
  },


  output: {
    filename: "index.js"
  },
  plugins: [
  
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
  }),
  ],
  resolve: {
    extensions: ['.css','.sass', '.js', '.es6']
  },
  
    target : "node"
 
};