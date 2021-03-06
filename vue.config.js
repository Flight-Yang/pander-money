const path = require('path')


module.exports = {
  lintOnSave: false,

  chainWebpack: config =>{
    const dir = path.resolve(__dirname,'src/assets/icons')
    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir).end() //只包含icons目录
        .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end() //表示不要解析出文件来
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) //其他svg loader排除 icons目录
  }

}
