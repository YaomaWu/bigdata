import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "文章", link: "/posts/" },
  { text: "热点分享", link: "/hot/" },
  { text: "应届职位", link: "/graduate/" },
  { text: "城间小事", link: "/stories/" },
]);
