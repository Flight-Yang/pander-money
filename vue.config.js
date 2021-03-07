const path = require('path')


module.exports = {
  lintOnSave: false,

  chainWebpack: config =>{
    const dir = path.resolve(__dirname,'src/assets/icons')
    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir).end() //只包含icons目录
        .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract:false}).end() //表示不要解析出文件来
        .use('svgo-loader').loader('svgo-loader')//这行和下面这行表示会把svg自带的fill颜色给删除掉
        .tap(options => ({...options,plugins: [{removeAttrs: {attrs:'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) //其他svg loader排除 icons目录
  }
}
