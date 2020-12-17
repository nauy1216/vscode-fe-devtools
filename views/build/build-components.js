/* eslint-disable */
const path = require("path");

function addStyleResource(rule) {
    rule
        .use("style-resource")
        .loader("style-resources-loader")
        .options({
            patterns: [path.resolve(process.cwd(), "src/shared/bem.scss")]
        });
}

module.exports = {
    outputDir: path.resolve(process.cwd(), "dist/components"),
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
    filenameHashing: false,
    configureWebpack: config => {
        config.resolve.alias["components"] = path.resolve(process.cwd(), `src/components`);
        config.resolve.alias["shared"] = path.resolve(process.cwd(), `src/shared`);
        config.resolve.alias["types"] = path.resolve(process.cwd(), `src/types`);
        config.resolve.alias["swiper$"] = "swiper/swiper-bundle.min.js";
    }
};