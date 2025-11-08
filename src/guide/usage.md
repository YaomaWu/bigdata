---
title: 写作指南：新增栏目与文档
icon: fa6-solid:pen-to-square
order: 1
---

本页说明如何在站点中新增「栏目」与「文章」，以及它们如何自动生成页面、侧边栏与目录，无需手动配置路由。

## 一句话结论

- 新建栏目：在 `src/posts/` 下新建文件夹，例如 `src/posts/flink/`，并在其中放一个 `README.md` 作为栏目首页。
- 新增文章：把 Markdown 放进对应栏目文件夹即可，例如 `src/posts/flink/getting-started.md`。
- 路由与侧边栏：全部自动生成，无需配置；全站目录索引见 `/catalog/`。

---

## 目录结构约定

推荐继续使用当前结构：

```
src/
  posts/
    flink/
      README.md           # 栏目首页（访问 /posts/flink/）
      getting-started.md  # 文章（访问 /posts/flink/getting-started.html）
    kafka/
      README.md
      basics.md
```

当然你也可以使用顶层栏目（更短路径）：

```
src/
  flink/
    README.md       # 访问 /flink/
    getting-started.md  # 访问 /flink/getting-started.html
```

二选一即可，当前仓库已在 `posts/` 下有示例，沿用即可。

---

## 新建栏目（文件夹）

1) 在 `src/posts/` 下创建新目录，例如 `src/posts/spark/`。

2) 在该目录下创建 `README.md`（可选，但强烈推荐），作为该栏目的“目录首页”。示例：

```md
---
title: Spark 专题
icon: fa6-solid:fire
order: 1
---

这里是 Spark 专题索引与导读（可写简介、导航等）。
```

3) 保存后，侧边栏会自动出现该栏目；访问路径为：

- `/posts/spark/`（如果你按当前结构放在 `posts/` 下）
- 或 `/spark/`（如果你采用顶层目录）

---

## 新增文章（Markdown）

在对应栏目目录直接新增 `.md` 文件即可，例如：

```
src/posts/spark/rdd-basics.md  →  /posts/spark/rdd-basics.html
```

建议为每篇文章加上 Frontmatter：

```md
---
title: RDD 基础
order: 2        # 控制同目录下排序（数字越小越靠前）
icon: fa6-solid:book-open  # 可选，主题图标
---

正文内容……
```

常用字段说明：

- `title`：侧边栏与目录显示名称。
- `order`：排序；不填时按标题（自然排序）。
- `icon`：主题支持的图标名（例如 `fa6-solid:bolt`）。

---

## 路由与侧边栏如何生成

- 侧边栏：已在 `src/.vuepress/sidebar.ts` 启用 `sidebar("structure")`，会按文件夹结构自动生成层级与条目。
- 目录页：已启用官方 `@vuepress/plugin-catalog`（由主题托管），每个目录会生成结构化目录；全站总览页位于 `/catalog/`。
- 首页：`src/README.md` 使用主题主页布局，提供“开始阅读”“快速入口”等。

你无需手动配置任何路由；只要把 Markdown 放在 `src/` 的对应目录中即可。

路径规则举例：

- `src/posts/flink/README.md` → `/posts/flink/`
- `src/posts/flink/getting-started.md` → `/posts/flink/getting-started.html`
- `src/flink/README.md` → `/flink/`（若使用顶层目录）

> 站点 `base` 为 `/bigdata/`，部署后完整 URL 会是 `https://<你的域名>/bigdata/<路径>`。

---

## 静态资源（图片等）

- 放到 `src/.vuepress/public/` 下，例如：
  - `src/.vuepress/public/assets/images/xxx.png` → 页面里用 `/assets/images/xxx.png` 引用。

---

## 可选：顶部导航

默认为最简导航（首页 + 目录）。如需在顶部导航加入栏目入口，编辑 `src/.vuepress/navbar.ts`：

```ts
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "目录", link: "/catalog/" },
  { text: "Flink", link: "/posts/flink/" },
  { text: "Kafka", link: "/posts/kafka/" },
]);
```

---

## 本地开发与构建

- 本地预览：`npm run docs:dev`（默认访问 `http://localhost:8080/bigdata/`）
- 构建静态站点：`npm run docs:build`（产物在 `src/.vuepress/dist/`）

---

## 常见问题

1) 新文章不显示？

- 确认文件后缀为 `.md`，且放在 `src/` 目录树内。
- 目录名/文件名建议使用小写短横线风格避免路径异常。
- 重启 `docs:dev` 或刷新页面尝试。

2) 排序不对？

- 在同一目录下用 `order` 控制排序；数字越小越靠前。

3) 链接 404？

- 注意部署 `base: "/bigdata/"`，绝对路径应包含 `/bigdata/` 前缀；文档内部链接建议使用相对路径（如 `./getting-started.md`）。

---

## 模板复制

栏目首页模板：

```md
---
title: <你的栏目名>
icon: fa6-solid:folder-tree
order: 1
---

这里写该栏目介绍与索引说明。
```

文章模板：

```md
---
title: <文章标题>
icon: fa6-solid:file-lines
order: 1
---

这里写正文。
```

