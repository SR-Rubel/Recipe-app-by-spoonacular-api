const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const extract_plugin=require('mini-css-extract-plugin');
// const devMode=process.env.NODE_ENV != 'production';
module.exports={
    entry:['babel-polyfill','./src/js/index.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js',
        // publicPath: '/dist/'
    },
    devServer:{
        contentBase: './dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        // new extract_plugin({
        //     filename: devMode?'css/main.css':'css/main.[hash].css',
        //     chunkFilename: devMode?'bundle.css':'bundle.[hash].css',
        //    // ignoreOrder:false,
        // }),

        
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modeles/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },

            // {
            //     test:/\.scss$/,
            //     use:[
            //     {
            //         loader:extract_plugin.loader,
            //         options:{
            //             publicPath:'/dist',
            //             hmr:process.env.NODE_ENV==='production',
            //         },
            //     },
            //     'css-loader',
            //     'postcss-loader',
            //     'sass-loader',
            //     ]
                
            // }

        ]
    }
};