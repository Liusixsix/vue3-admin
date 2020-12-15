const path = require('path')
const webpack = require('webpack')
const { config } = require('process')
const resolve = dir => path.join(__dirname, dir) // 路径

module.exports = {
    chainWebpack:config=>{
        config.resolve.alias
            .set('@/',resolve('src'))
    },
    lintOnSave: false,
    devServer: {
        open:true,
        overlay: {
           warnings: false,
           errors: false
        },
        // lintOnSave: false,
        // proxy:{

        // }
    }
}