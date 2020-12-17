/* eslint-disable */
const path = require("path");
const fs = require("fs");
const NodeOutputFileSystem = require('webpack/lib/node/NodeOutputFileSystem')


// 在这里要实现memory-fs的所有方法， 否则将不能在浏览直接访问到
// 因为在访问时浏览器报了一个错误
class MyOutputFileSystem extends NodeOutputFileSystem {
    constructor() {
        super()
    }
}

function addStyleResource(rule) {
    rule
        .use("style-resource")
        .loader("style-resources-loader")
        .options({
            patterns: [path.resolve(process.cwd(), "src/shared/bem.scss")]
        });
}

module.exports = {
    publicPath: './',
    // outputDir: path.resolve(process.cwd(), '../src/page'),
    devServer: {
        fs: new MyOutputFileSystem(),
        port: 9527,
        proxy: {
            // 数据包
            "/dataSource": {
                target: "http://10.1.1.6:7066/data-visual/frontend/data/package",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/dataSource": ""
                }
            },
            // 图片
            "/wp-content": {
                target: "http://10.1.234.4",
                ws: true,
                changeOrigin: true,
                pathRewrite: {}
            },
            // 接口
            "/data-visual": {
                target: "http://10.1.1.6:7065",
                ws: true,
                changeOrigin: true
            },
            "/map": {
                target: "http://10.1.234.4",
                pathRewrite: {
                    "/map": ""
                },
                ws: true,
                changeOrigin: true
            },
        },
        setup(app) {

        }
    },
    chainWebpack: config => {
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        types.forEach(type => addStyleResource(config.module.rule("scss").oneOf(type)));
        config.module
            .rule("scss")
            .oneOf("vue")
            .include.add(path.resolve(process.cwd(), "src/components"))
            .end()
            .use("px2rem-loader")
            .loader("px2rem-loader")
            .before("postcss-loader") // this makes it work.
            .options({
                baseDpr: 2, // base device pixel ratio (default: 2)
                remUnit: process.env.VUE_APP_HTML_FONT_SIZE, // rem unit value (default: 75)
                remPrecision: 8, // rem value precision (default: 6)
                forcePxComment: "px", // force px comment (default: `px`)
                keepComment: "use px" // no transform value comment (default: `no`)
            })
            .end();
    },
    configureWebpack: config => {
        const childs = fs.readdirSync(path.resolve(process.cwd(), "src"));
        childs.forEach(child => {
            const isDirectory = fs.statSync(path.resolve(process.cwd(), "src/" + child)).isDirectory();
            if (isDirectory) {
                config.resolve.alias[child] = path.resolve(process.cwd(), `src/${child}`);
            }
        });
        config.resolve.alias["editor"] = path.resolve(process.cwd(), `src/page-admin/views/editor`);
        config.resolve.alias["swiper$"] = "swiper/swiper-bundle.min.js";
        // config.output.publicPath = './'
    },
    pages: {
        "page-web": {
            // page 的入口
            entry: "src/page-web/main.ts",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "web.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "智慧中心展示页面",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "page-web"]
        }
    }
};