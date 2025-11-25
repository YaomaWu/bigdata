import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://yaomawu.github.io",

  author: {
    name: "妖码",
    url: "https://github.com/YaomaWu",
  },

  logo: "/assets/images/page/d2.jpg",

  repo: "https://github.com/YaomaWu/bigdata",
  repoLabel: "GitHub",

  docsDir: "src",

  // 顶部导航与侧边栏
  navbar,
  sidebar,

  // 顶部栏布局：左品牌，中链接，右仓库/主题切换/搜索
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Repo", "Outlook", "Search"],
  },

  // 夜间/白天主题切换
  darkmode: "switch",

  // 页脚
  footer: "妖码 · 大数据",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "一个大数据开发者",
    // 不需要 intro 页，留空
    medias: {},
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // Markdown 功能（保留常用项）
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
    math: {
      type: "mathjax",
    },
  },

  // 主题插件
  plugins: {
    blog: true,
    catalog: {
      level: 3,
      index: false,
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },
  },
});
