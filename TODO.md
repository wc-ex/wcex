

## 为 package.json 增加 runtime-dependencies 字段
    此字段指示当前组件库运行和打包时使用的外部文件列表，cli 支持在打包时解析HTML模板文件的<meta module> 获取相关依赖包信息和附加文件. 
    CLI 发布整体打包时仅包含最小化的软件包内容。
    - <meta module> 对引入文件增加通配符模式用于打包发布，运行时不解析。

