var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var argv = process.argv || [];
var PORT = 8080;
var HOST = 'localhost';
if (argv.includes('--port') > -1) {
    PORT = argv[argv.indexOf('--port') + 1]
}

if (argv.includes('--host') > -1) {
    HOST = argv[argv.indexOf('--host') + 1]
}

var entryPoints = [
    './src/index.tsx'
];
var plugins = [];
var isProduction = argv.includes('--prod');
var isRunningOnServer = argv.find(function (v) {
    v.includes('webpack-dev-server');
})

if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    )
} else {

    if (isRunningOnServer) {
        entryPoints.push(
            'webpack-dev-server/client?http:' + HOST + ':' + PORT,
            'webpack/hot/only-dev-server'
        )
    }

    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    )
}

plugins.push(
    new HtmlWebpackPlugin({
        template: 'index.ejs',
        filename: 'index.html'
    })
);

var config = {
    entry: entryPoints,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.json']
    },
    module: {
        preLoaders: [
            {test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.tsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'ts-loader']},
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'},
            {test: /\.(jpg|jpeg|gif|png)$/, loader: 'url-loader?limit=10&mimetype=image/(jpg|jpeg|gif|png)&name=images/[name].[ext]'},
            {test: /\.json$/, loader: 'json-loader' }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.ejs'
        })
    ]
}

if (isRunningOnServer) {
    config.devServer = {
        contentBase: 'dist',
        hot: true,
        inline: true
    }
}

module.exports = config;