## 安装

```
npm i maishu-chitu-scaffold
```

## 使用

创建项目目录

**MVC 项目**

```
.
├── static
|   └── modules
├── nws-config.js
└── package.json
```

```
node-mvc <website path>
```

**Static 项目**

```
.
├── modules
├── nws-config.js
└── package.json
```

```
node-mvc <website path>
```

1. nws-config.js 文件
    
    ```js
    const { getVirtualPaths } = require("../index");
    let fileVirtualPaths = getVirtualPaths("static");
    module.exports = {
        "port": 5262,
        virtualPaths: fileVirtualPaths,
    }
    ```


