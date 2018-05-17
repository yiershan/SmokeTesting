var webpack = require('webpack')
module.exports = {
    entry: {
        index: './index.js',
        test: './test.js'
    },
    output: {
        filename: '[name].js'
    },
    externals: {
        jquery: 'window.jQuery'
    }
};