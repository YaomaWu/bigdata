# 妖码 · 大数据知识库 / BigData Docs

一个面向大数据工程与流处理的知识库与博客，内容涵盖 Flink、Kafka、数据仓库、数据治理、数据工程实践与面试题整理等。站点基于 VuePress v2 + vuepress-theme-hope 构建，并集成像素风 UI（Pixelium Design）。

- 在线预览: https://yaomawu.github.io/bigdata/
- 仓库地址: https://github.com/YaomaWu/bigdata.git

## 特性

- 内容聚焦：大数据/流处理/数据平台/数据工程/面试指南
- 像素风 UI：集成 @pixelium/web-vue，复古像素风视觉统一
- Markdown 增强：代码块、对齐、任务清单、图表、PlantUML 等按需扩展
- SEO 支持：sitemap、robots、重定向等由主题插件托管

## 本地开发

要求 Node.js 18+。

```bash
npm i
npm run docs:dev
```

打开浏览器访问 dev server 提示的地址即可预览。

## 构建与部署

```bash
npm run docs:build
```

构建产物会生成到 `src/.vuepress/dist`。

仓库已包含 GitHub Actions（`.github/workflows/deploy-docs.yml`）用于自动部署到 GitHub Pages。主分支更新后会触发构建与发布。

## 目录结构

- `src/` 文档根目录
  - `posts/` 文章内容（Flink / Kafka 等）
  - `.vuepress/` 站点配置（主题、导航、组件、样式）
    - `theme.ts` 主题与导航侧边栏、插件配置
    - `client.js` 客户端增强与自定义组件注册
    - `styles/index.scss` 全局像素风样式覆盖
    - `components/` 自定义组件（如热点卡片、PV 徽标等）

## 自定义样式（像素风）

项目已集成 Pixelium Design：

```ts
// src/.vuepress/client.js
import PixeliumVue from '@pixelium/web-vue'
import '@pixelium/web-vue/dist/pixelium-vue.css'
import '@pixelium/web-vue/dist/font.css'

export default defineClientConfig({
  enhance({ app }) {
    app.use(PixeliumVue)
  }
})
```

全局像素化样式见 `src/.vuepress/styles/index.scss`。

## 贡献

欢迎 Issue / PR：

- 修改/补充文章内容
- 提交错别字/链接修复
- 新增实践案例与指南

## 许可

MIT
