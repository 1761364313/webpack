const path = require('path')
const glob = require('glob');
const devMode = process.env.NODE_ENV !== 'production'
const Webpack = require('webpack')
// 自动把JS 加载到html文件里面去
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 删除之前的打包记录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoadePlugin  = require('vue-loader/lib/plugin')
// copy 静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 採分css 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩 js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 单线程
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin') // 多线程

//动态添加入口
function getEntry(){
  const entry = {};
  //读取src目录所有page入口
  glob.sync('./src/pages/*/*.js').forEach((name) => {
    let start = name.indexOf('src/') + 4;
    let end = name.length - 3;
    let eArr = [];
    let n = name.slice(start, end);      
    n= n.split('/')[1];
    eArr.push('@babel/polyfill');
    eArr.push(name);      
    entry[n] = eArr;
  })  
  return entry;
}

// 本地服务页面配置
const historyApiFallback = (page = {}) => {
  const obj = { rewrites: [] }
  Object.keys(page).forEach(i => {
    obj.rewrites.push({  
      from: new RegExp(`\/${i}`),
      to: `/${i}.html`
    })
  })  
  return obj
}
// 多页面配置
const entryObj = getEntry();
const htmlArray = [];

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'eval-source-map' : '',  
  entry: getEntry(),
  output: {
    filename: 'js/[name].[hash:8].js',
    path: devMode ? path.resolve(__dirname, './dist') : path.resolve(__dirname, 'F:/test/www'),
    publicPath:'/', // 资源地址
    // library: path.resolve(__dirname, '[name]_library')    
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']                   
          },        
        },
        exclude:/node_modules/,
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.vue$/, 
        use: 'vue-loader',
        exclude:/node_modules/,
        include: [path.resolve(__dirname, 'src')]
      },     
      {
        test: /\.(css|stylus)$/,
        use: [
          MiniCssExtractPlugin.loader,        
          'css-loader', 
          {
            loader:'postcss-loader',
            options:{
              plugins:[
                require('autoprefixer')({
                  overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          'stylus-loader'
        ],
        exclude:/node_modules/,
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ],
        exclude:/node_modules/,
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/, // 媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }                
              }
            }
          }
        ],
        exclude:/node_modules/,
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(woff2?|eto|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ],
        exclude:/node_modules/,
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, './src/pages'),    
      common: path.resolve(__dirname, './src/common')      
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [  
    new VueLoadePlugin(), // vue 插件
    new Webpack.HotModuleReplacementPlugin(), // 热更新
    new CleanWebpackPlugin(), // 清除打包历史记录
    // 採分css   
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash:8].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash:8].css',
    }),  
    // // 抽离第三方模块
    // new Webpack.DllPlugin({
    //   path: path.resolve(__dirname, '[name]-manifest.json'),
    //   name: '[name]_library', 
    //   context: __dirname
    // }),

    new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      {from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, devMode ? path.resolve(__dirname, './dist') :'F:/test/www')}
    ]),

    /**
     *  提取SourceMap到独立文件
     */
    // new Webpack.SourceMapDevToolPlugin({
    //     filename: 'js/[name].js.map'        
    // }) ,          
  ],
  optimization: {   
    minimizer:[
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   /**
      //    *  sourceMap 和 devtool: 'inline-source-map', 冲突
      //    */
      //   sourceMap: false, // set to true if you want JS source maps,
      //   /**
      //    *  extractComments 导出备注
      //    */
      //   // extractComments: 'all'
      // }),
      new ParallelUglifyPlugin({ 
        cacheDir: '.cache/',       
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            // warnings: false,        
            drop_console: true,
            // collapse_consts: true,
            reduce_vars: true
          },
          warnings: false
        }    
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks:{
      chunks:'all',
      cacheGroups:{
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  },
  devServer: {
    port: 8080,
    // compress: true,
    hot: true,
    contentBase: './',
    inline: true,   
    disableHostCheck: true,   
    historyApiFallback: historyApiFallback(entryObj),   
    proxy: {
      '/api': {
        target: 'http://user-do-dev.yunjiglobal.com',// 接口的域名
        //secure: false,// 如果是https接口，需要配置这个参数
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
// 　　　　 pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址
// 　　　　  '^api': '/api'
//         }
      }
    }
  }
}

//动态生成html
//获取html-webpack-plugin参数的方法
const getHtmlConfig = function(name){
  return {
    template: path.resolve(__dirname, './public/index.html'), // html模板所在的文件路径
    filename:`${name}.html`, // 输出的html的文件名称    
    inject: true,   
    chunks:[name] // chunks 就能选择你要使用那些js文件 而如果没有指定 chunks 选项，默认会全部引用  excludeChunks 去掉不需要的
  }
}

Object.keys(entryObj).forEach((key) => {  
  htmlArray.push({
    name:key,
    title:'',
    chunks:[key]  
  })
})
// 自动生成html模板
htmlArray.forEach(function(i) {  
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(i.name)))
})
