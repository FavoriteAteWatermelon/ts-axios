const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    mode:'development',
    entry:path.resolve(__dirname,'index.ts'),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'

    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'awesome-typescript-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts','.tsx','.js'
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          title: 'webpack4使用plugin',　　　// 生成的HTML文件的标题
          template: path.resolve(__dirname, 'index.html')　　// 使用的模板路径
      })
  ]
}