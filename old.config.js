const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const PATHS = {
    pug: path.resolve(__dirname, './src'),
    output: path.resolve(__dirname, './dist'),
};

const pugTemplate = (name) => new HtmlWebpackPlugin({
    title: name,
    hash: true,
    filename: `${name }.html`,
    template: `${PATHS.pug }/${ name }.pug`,
});

module.exports = {
    entry: {
        index: './src/index.js',
        default: './src/default/index.js',
        mosaic: './src/mosaic/index.js',
        shake: './src/shake/index.js',
        spin: './src/spin/index.js',
        thought: './src/thought/index.js',
        sam: './src/sam/index.js',
    },
    output: {
        path: PATHS.output,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: 'dist',
                }),
            },
            {
                test: /\.pug$/,
                loaders: [{
                    loader: 'html-loader',
                }, {
                    loader: 'pug-html-loader',
                    options: {
                        data: {
                            background: 'https://s3-eu-west-1.amazonaws.com/bots-palringo-com/bots/mimic_bot/images/[name].jpg',
                            message: 'This is a test message',
                            language: 'en',
                            avatar: '',
                            noAvatar: 'https://s3-eu-west-1.amazonaws.com/bots-palringo-com/bots/mimic_bot/noavatar.jpeg',
                            css: '',
                            uniqueId: '12345',
                        },
                    },
                }],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [{
                    loader: 'file-loader',
                    options: {
                        name: '/images/[name].[ext]',
                    },
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                    },
                },
                ],
            },
        ],
    },
    devServer: {
        contentBase: PATHS.output,
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: true,
    },
    plugins: [
        pugTemplate('index'),
        new ExtractTextPlugin({
            filename: 'styles/[name].css',
            disable: false,
            allChunks: true,
        }),
    ],
};
