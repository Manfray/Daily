const path = require('path');

module.exports = {
  // mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'scss-loader'
        ]
      },
      // {
      //   test: /\.txt$/,
      //   use: {
      //     loader: path.resolve('./src/loader/test.js')
      //   }
      // }
    ]
  },
  plugins: [
    
  ]
};