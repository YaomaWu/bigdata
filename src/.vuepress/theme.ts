import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",

  author: {
    name: "妖码",
    url: "https://mister-hope.com",
  },

  logo: "/assets/images/page/d2.jpg",

  repo: "https://github.com/YaomaWu/bigdata.git",
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
  footer: "默认页脚",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "一个大数据开发者",
    // intro 页面已移除
    medias: {
      Zhihu: "https://www.zhihu.com/people/your-id",
      Juejin: {
        icon: "simple-icons:juejin",
        link: "https://juejin.cn/user/your-id",
      },
      CSDN: {
        icon: "https://g.csdnimg.cn/static/logo/favicon32.ico",
        link: "https://blog.csdn.net/your-id",
      },
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234",
      },
    },
  },

  // 多语言配置（避免出现 undefined: 日期 的情况）
  metaLocales: {
    author: "作者",
    date: "写作日期",
    origin: "原创",
    views: "访问量",
    category: "分类",
    tag: "标签",
    readingTime: "阅读时间",
    words: "字数",
    toc: "此页内容",
    prev: "上一页",
    next: "下一页",
    contributors: "贡献者",
    editLink: "编辑此页",
    print: "打印",
  },

  // 仅保留常用 Markdown 扩展
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
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    // 目录插件配置
    catalog: {
      level: 3,
      index: false,
    },

    // 启用之前需安装 @waline/client
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },

    // 如需 PWA，请手动开启并配置 @vuepress/plugin-pwa
  },
});
