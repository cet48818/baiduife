/**
** 去掉了devServer, dev-tool,jshint等开发有关内容的config文件
** 要上线的时候运行 npm run build
**/
var path = require('path');
var webpack = require('webpack');
// 定义文件夹路径
var ROOT_PATH = path.resolve(__dirname); // path.resolve, 从相对路径解析出绝对路径
var APP_PATH = path.resolve(ROOT_PATH, 'app'); // 将'app'解析成绝对路径, 'ROOT_PATH'是源路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    // entry: APP_PATH,
    entry: {
        app: path.resolve(APP_PATH, 'main.js'),
    },
    output: {
    	path: BUILD_PATH,
        // 生成Hash名称的script来防止缓存
    	filename: 'bundle.js' // 注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
    },
    module: {
        loaders: [
            {
            	test: /\.css$/,
            	loaders: ['style', 'css'],
            	include: APP_PATH
            },
            // {
            // 	test: /\.scss$/,
            // 	loaders: ['style', 'css', 'sass'],
            // 	include: APP_PATH
            // },
            {
            	test: /\.(png|jpg)$/,
            	loader: 'url?limit=40000' // 图片小于40kb时自动启用base64
            },
            {
            	test: /\.jsx?$/,
            	loader: 'babel',
            	include: APP_PATH,
            	query: {
            		presets: ['es2015'] // "presets": ["latest"] // npm install --save-dev babel-cli babel-preset-latest
            	}
            }
        ],
    },
    plugins: [
        // 使用uglifyJs压缩js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // // 入口文件里的数组打包成vendors.js
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    ],
};