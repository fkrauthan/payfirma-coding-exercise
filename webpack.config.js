var path = require('path');
var webpack = require('webpack')
// var ROOT = path.resolve(__dirname, 'src/main/resources/static');
var ROOT = path.resolve(__dirname, 'src/main/webapp');
var SRC = path.resolve(ROOT, 'javascript');
// var DEST = path.resolve(__dirname, 'src/main/resources/static/dist');
var DEST = path.resolve(__dirname, 'src/main/webapp/dist');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            "bootstrap-webpack!./bootstrap.config.js",
            SRC + '/index.jsx'
        ]
    },
    resolve: {
        root: [
            path.resolve(ROOT, 'javascript'),
            path.resolve(ROOT, 'css')
        ],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: DEST,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: SRC
            },
            { test: /\.json$/, loader: "json-loader" },

            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss/, loader: 'style!css!sass' },
            { test: /\.less/, loader: 'style!css!less' },

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
        ]
    }
};
