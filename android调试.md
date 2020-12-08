清理包 /android

gradlew clean





根目录加文件.babelrc

```
{
  "presets": ["stage-2", "react-native-stage-0/decorator-support"]
}
```





npm install --save prop-types

npm install --save-dev babel-preset-stage-2



D:\louxun\code\louxun-anchang-reactnative22\node_modules\jshare-react-native\android\src\main\java\cn\jiguang\share\reactnative\JSharePackage.java

```
注释这个方法
//@Override
    // public List<Class<? extends JavaScriptModule>> createJSModules() {
    //     return Collections.emptyList();
    // }
```



D:\louxun\code\louxun-anchang-reactnative22\node_modules\jshare-react-native\android\src\main\java\cn\jiguang\share\reactnative\JShareModule.java

getGenter 改为 getGender