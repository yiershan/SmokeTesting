var webpack = require('webpack')
module.exports = {
    entry: {
        index: './index.ts',
        test: './test.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: '[name].js'
    },
    externals: {
        jquery: 'window.jQuery'
    }
};