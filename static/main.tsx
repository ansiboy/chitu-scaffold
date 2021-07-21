/// <reference path="./declare.d.ts" />

let node_modules = `/node_modules`;
var developmentRequirejsConfig = {
    "paths": {
        "css": `${node_modules}/maishu-requirejs-plugins/src/css`,
        "text": `${node_modules}/maishu-requirejs-plugins/lib/text`,
        "json": `${node_modules}/maishu-requirejs-plugins/src/json`,

        "react": `${node_modules}/react/umd/react.development.min`,
        "react-dom": `${node_modules}/react-dom/umd/react-dom.development.min`,
        "maishu-chitu": `${node_modules}/maishu-chitu/dist/index`,
        "maishu-chitu-react": `${node_modules}/maishu-chitu-react/dist/index.min`,
        "maishu-chitu-service": `${node_modules}/maishu-chitu-service/dist/index.min`,
        "maishu-dilu": `${node_modules}/maishu-dilu/dist/index.min`,
        "maishu-dilu-react": `${node_modules}/maishu-dilu-react/dist/index`,
        "maishu-image-components": `${node_modules}/maishu-image-components/dist/index`,
        "maishu-router": `${node_modules}/maishu-router/dist/index`,
        "maishu-toolkit": `${node_modules}/maishu-toolkit/dist/index.min`,
        "maishu-ui-toolkit": `${node_modules}/maishu-ui-toolkit/dist/index.min`,
        "maishu-wuzhui": `${node_modules}/maishu-wuzhui/dist/index.min`,
        "maishu-wuzhui-helper": `${node_modules}/maishu-wuzhui-helper/dist/index.min`,
    }
}

var productionRequirejsConfig = {
    "paths": {
        "css": `${node_modules}/maishu-requirejs-plugins/src/css`,
        "text": `${node_modules}/maishu-requirejs-plugins/lib/text`,
        "json": `${node_modules}/maishu-requirejs-plugins/src/json`,

        "react": `${node_modules}/react/umd/react.production.min`,
        "react-dom": `${node_modules}/react-dom/umd/react-dom.production.min`,
        "maishu-chitu": `${node_modules}/maishu-chitu/dist/index`,
        "maishu-chitu-react": `${node_modules}/maishu-chitu-react/dist/index.min`,
        "maishu-chitu-service": `${node_modules}/maishu-chitu-service/dist/index.min`,
        "maishu-dilu": `${node_modules}/maishu-dilu/dist/index.min`,
        "maishu-dilu-react": `${node_modules}/maishu-dilu-react/dist/index.min`,
        "maishu-image-components": `${node_modules}/maishu-image-components/dist/index.min`,
        "maishu-router": `${node_modules}/maishu-router/dist/index`,
        "maishu-toolkit": `${node_modules}/maishu-toolkit/dist/index.min`,
        "maishu-ui-toolkit": `${node_modules}/maishu-ui-toolkit/dist/index.min`,
        "maishu-wuzhui": `${node_modules}/maishu-wuzhui/dist/index.min`,
        "maishu-wuzhui-helper": `${node_modules}/maishu-wuzhui-helper/dist/index.min`,
    }
}

requirejs(["website-config"], function (mod: any) {
    let config = mod.default || mod;
    loadApplication(config);
})

function loadApplication(config: import("./website-config").WebsiteConfig) {

    config.mode = config.mode || "development";
    var requirejsConfig = config.mode == "development" ? developmentRequirejsConfig : productionRequirejsConfig;

    config.requirejs = config.requirejs || {};
    config.requirejs.paths = Object.assign(config.requirejs.paths || {}, requirejsConfig.paths);

    let req = requirejs.config(config.requirejs || {});

    let init = function () {
        req(["./application.js", "./init.js"], function (mod, initModule) {
            let app = mod.run(config, req);
            let func = initModule.default || initModule;
            if (typeof func != "function") {
                console.log("Export of init module is not a function.");
            }
            else {
                let p = func(app);
                if (p != null && p.then != null) {
                    p.then(() => {
                        app.run();
                    })
                }
                else {
                    app.run();
                }
            }
        });
    }

    if (config.mode == "production") {
        req(["./pre-required.js", "react", "react-dom"], function (prerequired) {
            let keys = Object.getOwnPropertyNames(prerequired);
            for (let i = 0; i < keys.length; i++) {
                define(keys[i], function () {
                    return prerequired[keys[i]];
                })
            }
            init();
        });
    }
    else {
        init();
    }
}
