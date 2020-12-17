/* eslint-disable */
const path = require("path");
const fs = require("fs");

function addStyleResource(rule) {
    rule
        .use("style-resource")
        .loader("style-resources-loader")
        .options({
            patterns: [path.resolve(process.cwd(), "src/shared/bem.scss")]
        });
}

module.exports = {
    outputDir: "dist/admin",
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
    },
    pages: {
        "app": {
            // page 的入口
            entry: "src/page-admin/main.ts",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "智慧中心后台管理",
        }
    }
};