##### 获取打包参数的方法

```
// 获取参数列表
module.exports = function getArgList() {
  let argvs;
  let res = {};
  try {
    argvs = JSON.parse(process.env.npm_config_argv).original;
  } catch (ex) {
    argvs = process.argv;
  }
  let argv = argvs.slice(2);
  for (let i in argv) {
    let key = argv[i].match(/--(\S*)=/)[1];
    let value = argv[i].split('=')[1];
    res[key] = value;
  }

  return res;
};
```

##### 客户配置文件

```
{
  "dev": {
    "name": "开发环境",
    "styleDir": "TEST",
    "imgDir": "TEST",
    "routerDir": "TEST",
    "setting": {
      "hasTalk": 0,
      "isBWrules": 1,
      "isNormalBanner": 0,
      "app_id": "8bag"
    },
  "TGSC": {
    "name": "集团",
    "styleDir": "JT",
    "imgDir": "JT",
    "routerDir": "JT",
    "setting": {
      "hasTalk": 0,
      "isBWrules": 1,
      "isNormalBanner": 0,
      "app_id": "8demo"
    }
  }
  }
```

##### 支持客户配置

```javascript
const fs = require("fs");
const fsExt = require("fs-extra");
const path = require("path");
const rm = require("rimraf");

const allConfig = require("./config.json");
const argList = require("../build/getArgList")();
const client = argList.client || "dev";
const config = allConfig[client];
const isUAT = argList.requrl || "";
const isApp_id = argList.app_id || "";
const node_id = argList.node_id || "";
const im_url = argList.im_url || "192.168.51.34";

console.log(argList,'---')

module.exports = {
  setAll: function() {
    this.setStyle();
    this.setSelfImg();
    this.setIcon();
    this.setSetting();
    this.setRouter();
  },
  setStyle: function() {
    // console.log(`* 开始配置styleDir:${config.styleDir}`);
    // console.log(path.resolve(__dirname, '../src/assets/style/variable.less'));;
    if (config.styleDir) {
      fs.writeFileSync(
        path.resolve(__dirname, "../src/assets/style/variable.less"),
        "@import url('../self/" +
          config.styleDir +
          "/style/" +
          config.styleDir +
          ".less');"
      );
      // fs.writeFileSync(path.resolve(__dirname, '../src/assets/style/variable.styl'), "@import '../self/" + config.styleDir + '/style/' + config.styleDir + ".styl';");
    } else {
      console.log(`styleDir未配置`);
    }
  },
  setSelfImg: function() {
    // console.log(`* 开始配置self图片资源:${config.imgDir}`);
    // console.log(
    //   path.resolve(__dirname, '../src/assets/self/' + config.imgDir + '/img')
    // );
    // console.log('--> ' + path.resolve(__dirname, '../src/assets/img/self'));
    if (config.imgDir) {
      // 删除img/self文件夹，用客户/img替换
      rm.sync(path.resolve(__dirname, "../src/assets/img/self"));
      fsExt.copySync(
        path.resolve(__dirname, "../src/assets/self/" + config.imgDir + "/img"),
        path.resolve(__dirname, "../src/assets/img/self")
      );
    } else {
      console.log(`图片资源未配置`);
    }
  },
  setIcon: function() {
    // console.log(`* 开始配置icon`);
    // console.log(
    //   path.resolve(
    //     __dirname,
    //     '../src/assets/self/' + config.imgDir + '/img/favicon.ico'
    //   )
    // );
    // console.log('--> ' + path.resolve(__dirname, '../static/favicon.ico'));
    // console.log('--> ' + path.resolve(__dirname, '../static/loginLogo.png'));
    rm.sync(path.resolve(__dirname, "../static/favicon.ico"));
    fsExt.copySync(
      path.resolve(
        __dirname,
        "../src/assets/self/" + config.imgDir + "/img/favicon.ico"
      ),
      path.resolve(__dirname, "../static/favicon.ico")
    );
    fsExt.copySync(
      path.resolve(
        __dirname,
        "../src/assets/self/" + config.imgDir + "/img/loginLogo.png"
      ),
      path.resolve(__dirname, "../static/loginLogo.png")
    );
  },
  setSetting: function() {
    // console.log(`* 开始设置配置文件setting.js`);
    // let domain_url = isUAT ? allConfig[client].setting.domain_url.uat : allConfig[client].setting.domain_url.online;
    let domain_url = isUAT ? argList.requrl : "";
    let app_id = isApp_id ? isApp_id : config.setting.app_id;
    let obj = {
      name: config.name,
      hasTalk: config.setting.hasTalk,
      app_id: app_id,
      isNormalBanner: config.setting.isNormalBanner,
      isBWrules: config.setting.isBWrules,
      domain_url: domain_url,
      client: client,
      node_id: node_id,
      im_url: im_url,
      notToPc: config.setting.notToPc ? true : false,
      updateDate: new Date().toISOString()
    };
    fs.writeFileSync(
      path.resolve(__dirname, "../static/setting.js"),
      "var setting = " + JSON.stringify(obj)
    );
  },
  /**
   * 路由配置
   */
  setRouter() {
    // rm.sync(path.resolve(__dirname, '../src/assets/script/router.js'));
    if (config.routerDir) {
      fsExt.copySync(
        path.resolve(
          __dirname,
          "../src/assets/self/" + config.routerDir + "/script/router.js"
        ),
        path.resolve(__dirname, "../src/assets/script/router.js")
      );
    }else {
      fs.writeFileSync(
        path.resolve(__dirname, "../src/assets/script/router.js"),
        `export default [
          {
            path: "/",
            name: "Index",
            component: resolve => require(["../../../views/Index"], resolve)
          }
        ];`
      );
    }
  }
};

```

##### webpack.base.conf.js 引入客户配置

```
const clientConfig = require('../client');
// 根据client设置选择资源
clientConfig.setAll();
```

##### fetch的封装

