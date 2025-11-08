import { defineClientConfig } from "vuepress/client";
import { createApp } from "vue";
import PvBadge from "./components/PvBadge.vue";

export default defineClientConfig({
  setup() {
    if (typeof window === "undefined") return;

    const findNavbarEnd = () =>
      document.querySelector(".vp-navbar-end") ||
      document.querySelector(".vp-navbar .vp-navbar-end");

    const mount = () => {
      const navbarEnd = findNavbarEnd();
      if (!navbarEnd) return false;

      if (document.getElementById("pv-badge-mount")) return true;

      const container = document.createElement("div");
      container.id = "pv-badge-mount";
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.marginRight = "0.5rem";

      // 优先放在 Repo 链接左侧
      const repo = navbarEnd.querySelector(".repo-link");
      if (repo && repo.parentElement) repo.parentElement.insertBefore(container, repo);
      else navbarEnd.prepend(container);

      const app = createApp(PvBadge);
      app.mount(container);
      return true;
    };

    const tryMount = () => {
      if (mount()) return;
      const obs = new MutationObserver(() => {
        if (mount()) obs.disconnect();
      });
      obs.observe(document.body, { childList: true, subtree: true });
      // 兜底多次尝试
      let tries = 0;
      const timer = setInterval(() => {
        tries++;
        if (mount() || tries > 20) clearInterval(timer);
      }, 200);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", tryMount, { once: true });
    } else {
      tryMount();
    }
  },
});
