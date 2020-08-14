// nodejs服务器
const express = require("express");
const fs = require('fs')

// 创建express实例和vue实例
const app = express();
// 创建渲染器
const {createBundleRenderer} = require("vue-server-renderer");
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync('../public/index.template.html', 'utf-8'), // 宿主模板文件
    clientManifest,
    //取消预加载
    shouldPreload: (file, type) => {
      return false;
    },
    shouldPrefetch: (file, type) => {
      return false;
    },
})

// 中间件处理静态文件请求
app.use(express.static('../dist/client', {index: false}))

// 路由处理交给vue
app.get("*", async (req, res) => {
  const context = {
      url: req.url
  }

  await renderer.renderToString(context, (err, html) => {
    if (err){
      res.status(500).send("服务器内部错误");
      return;
    }


    //添加描述信息
    if(typeof(context.meta) != undefined){
      const { title, meta } = context.meta.inject();
      html = html.replace(/<title.*?<\/title>/g,title.text())
                .replace(/<meta.*name="description".*>/,meta.text());
    }

    res.send(html);
    return;
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("渲染服务器启动成功");
});
