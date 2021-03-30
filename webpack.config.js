module.exports = {
    entry: __dirname + "/static/pre-required.ts", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/static", //打包后的文件存放的地方
        filename: "pre-required.js", //打包后输出文件的文件名
        libraryTarget: 'umd',
        globalObject: 'typeof window === \'undefined\' ? global : window'
    },
    mode: "production"
}