var webpack = require("webpack");
var path = require('path');

var BUILD_DIR = path.resolve(__dirname);
var APP_DIR = path.resolve(__dirname);
var config = {
    target: "electron",
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [],
    entry: {
        // build対象
        //main:  APP_DIR + "/src/typescript/main.tsx",
        index: APP_DIR + "/src/typescript/index.tsx"
    },
    output: {
        // 出力先のディレクトリを指定する
        path: BUILD_DIR + "/dist/",
        // 出力するファイル名
        filename: "[name].js",
    },
    devtool: "inline-source-map",
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.tsx', '.ts', '.js', '.css', '.scss'],
        alias: {
            ons_css: __dirname + "/node_modules/onsenui/css/onsenui.css",
            ons_component_css: __dirname + "/node_modules/onsenui/css/onsen-css-components.css"
        }
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader" 
            }
        ],
    },
};

module.exports = config;