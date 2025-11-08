import { sidebar } from "vuepress-theme-hope";

// 使用基于目录结构的自动侧边栏，无需手动配置新目录/页面
export default sidebar({
  "/posts/": "structure",
  "/hot/": "structure",
  "/graduate/": "structure",
});
