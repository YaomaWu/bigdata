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

  // 椤堕儴瀵艰埅涓庝晶杈规爮
  navbar,
  sidebar,

  // 椤堕儴鏍忓竷灞€锛氬乏鍝佺墝锛屼腑閾炬帴锛屽彸浠撳簱/涓婚鍒囨崲/鎼滅储
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Repo", "Outlook", "Search"],
  },

  // 澶滈棿/鐧藉ぉ涓婚鍒囨崲
  darkmode: "switch",

  // 椤佃剼
  footer: "妖码 · 大数据"涓€涓墠绔紑鍙戣€?,
    intro: "/intro.html",
    medias: {
      VuePressThemeHope: {
        icon: "https://theme-hope-assets.vuejs.press/logo.svg",
        link: "https://theme-hope.vuejs.press",
      },
    },
  },

  // 鍔犲瘑閰嶇疆
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234",
      },
    },
  },

  // 澶氳瑷€閰嶇疆
  metaLocales: {
    editLink: "鍦?GitHub 涓婄紪杈戞椤?,
  },

  // 濡傛灉鎯宠瀹炴椂鏌ョ湅浠讳綍鏀瑰彉锛屽惎鐢ㄥ畠銆傛敞: 杩欏鏇存柊鎬ц兘鏈夊緢澶ц礋闈㈠奖鍝?  // hotReload: true,

  // 姝ゅ寮€鍚簡寰堝鍔熻兘鐢ㄤ簬婕旂ず锛屼綘搴斾粎淇濈暀鐢ㄥ埌鐨勫姛鑳?  markdown: {
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

    // 鍙栨秷娉ㄩ噴瀹冧滑濡傛灉浣犻渶瑕?TeX 鏀寔
    // math: {
    //   // 鍚敤鍓嶅畨瑁?katex
    //   type: "katex",
    //   // 鎴栬€呭畨瑁?@mathjax/src
    //   type: "mathjax",
    // },

    // 濡傛灉浣犻渶瑕佸够鐏墖锛屽畨瑁?@vuepress/plugin-revealjs 骞跺彇娑堜笅鏂规敞閲?    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 鍦ㄥ惎鐢ㄤ箣鍓嶅畨瑁?chart.js
    // chartjs: true,

    // 鍦ㄥ惎鐢ㄤ箣鍓嶅畨瑁?echarts
    // echarts: true,

    // 鍦ㄥ惎鐢ㄤ箣鍓嶅畨瑁?flowchart.ts
    // flowchart: true,

    // 鍦ㄥ惎鐢ㄤ箣鍓嶅畨瑁?mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 鍦ㄥ惎鐢ㄤ箣鍓嶅畨瑁?@vue/repl
    // vuePlayground: true,

    // 鍦ㄥ惎鐢ㄤ箣鍓嶅畨瑁?sandpack-vue3
    // sandpack: true,
  },

  // 鍦ㄨ繖閲岄厤缃富棰樻彁渚涚殑鎻掍欢
  plugins: {
    blog: true,
    // 鐩綍鎻掍欢閰嶇疆锛屼氦鐢变富棰樻敞鍐?    catalog: {
      level: 3,
      index: true,
    },

    // 鍚敤涔嬪墠闇€瀹夎 @waline/client
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

    // 濡傛灉浣犻渶瑕?PWA銆傚畨瑁?@vuepress/plugin-pwa 骞跺彇娑堜笅鏂规敞閲?    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});



