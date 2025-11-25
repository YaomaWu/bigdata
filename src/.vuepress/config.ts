import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/bigdata/",

  lang: "zh-CN",
  title: "妖码大数据",
  description: "「大数据学习 + 面试指南」涵盖 大数据 程序员需要掌握的核心知识",
  head: [
    [
      "script",
      {
        src: "/bigdata/mathjax-config.js",
      },
    ],
    [
      "script",
      {
        id: "MathJax-script",
        async: "true",
        src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
      },
    ],
  ],

  
  theme,

  // 仅包含所需文档，排除示例/演示板块
  pagePatterns: [
    "**/*.md",
    "!.vuepress",
    "!node_modules",
    "!demo/**", // 去掉主要功能与配置演示板块
  ],

  // 插件由主题托管，无需在这里再次注册

  // 与 PWA 一起启用时可关闭
  // shouldPrefetch: false,
});
