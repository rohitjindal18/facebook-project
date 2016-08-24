var config = {
   entry: './Main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 9998,
      historyApiFallback: true,
      contentBase: './',
      hot: true
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react','stage-2'],
               plugins: ["transform-object-assign", "transform-class-properties"]
            }
         }
      ]
   }
}

module.exports = config;
