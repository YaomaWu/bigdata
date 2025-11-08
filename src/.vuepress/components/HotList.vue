<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoutes, withBase } from '@vuepress/client'
const props = defineProps<{ lines?: number }>()

type HotItem = {
  title: string
  path: string
  date?: string
  desc?: string
}

function parseDate(input: any): number {
  if (!input) return 0
  const t = new Date(input).getTime()
  return isNaN(t) ? 0 : t
}

const routes = useRoutes()

const items = ref<HotItem[]>([])

function stripHtml(html = ''): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function snippet(text = '', len = 20): string {
  const t = text.trim()
  if (t.length <= len) return t
  return t.slice(0, len) + '...'
}

async function refresh() {
  const routeRecord: any = routes.value || {}
  const entries = Object.keys(routeRecord).map((path) => ({
    path,
    meta: routeRecord[path]?.meta || {},
    loader: routeRecord[path]?.loader,
  }))

  const candidates = entries
    .filter(({ path, meta }) => {
      const fm = (meta.frontmatter || {}) as any
      const category = fm.category || []
      const hasHotCategory = Array.isArray(category)
        ? category.includes('热点分享')
        : category === '热点分享'
      const isHotDir = typeof path === 'string' && path.startsWith('/hot/')
      const isHotFlag = fm.hot === true
      return hasHotCategory || isHotDir || isHotFlag
    })
    .map(({ path, meta, loader }) => {
      const fm = (meta.frontmatter || {}) as any
      return {
        title: (meta as any).title || fm.title || '未命名',
        path,
        date: fm.date as string | undefined,
        fm,
        loader,
      }
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 3)

  const loaded = await Promise.all(
    candidates.map(async (c) => {
      try {
        if (typeof c.loader === 'function') {
          const mod: any = await c.loader()
          const data = mod?.data || {}
          const excerpt = stripHtml(data.excerpt || '')
          const desc = excerpt || (c.fm?.description as string) || ''
          return {
            title: c.title,
            path: c.path,
            date: c.date,
            desc: snippet(desc, 20),
          } as HotItem
        }
      } catch (e) {
        // ignore single failure
      }
      const fallbackDesc = snippet((c.fm?.description as string) || '', 20)
      return { title: c.title, path: c.path, date: c.date, desc: fallbackDesc } as HotItem
    })
  )

  items.value = loaded
}

watch(routes, () => {
  refresh()
}, { immediate: true, deep: true })

const toBase = (p: string) => withBase(p)

function formatDate(input?: string): string | undefined {
  if (!input) return undefined
  const t = new Date(input)
  const ts = t.getTime()
  if (isNaN(ts)) return input
  const yyyy = String(t.getFullYear())
  const mm = String(t.getMonth() + 1).padStart(2, '0')
  const dd = String(t.getDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}

const clamp = computed(() => Math.max(1, props.lines ?? 3))
</script>

<template>
  <div class="hot-list">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="hot-card"
    >
      <div class="hot-title">
        <a :href="toBase(item.path)">{{ item.title }}</a>
      </div>
      <div class="hot-meta" v-if="item.date">{{ formatDate(item.date) }}</div>
      <div class="hot-desc" v-if="item.desc" :style="{ '--hot-lines': String(clamp) }">{{ item.desc }}</div>
      
    </div>
  </div>
  <div v-if="items.length === 0" class="hot-empty">暂无热点分享</div>
  
</template>

<style scoped>
.hot-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}
.hot-card {
  background: var(--vp-c-bg, var(--c-bg));
  border: 1px solid var(--vp-c-divider, #eee);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
}
.hot-title {
  font-weight: 700;
  margin-bottom: 6px;
}
.hot-title a { color: inherit; text-decoration: none; }
.hot-title a:hover { color: var(--vp-c-brand); }
.hot-meta {
  font-size: 12px;
  color: var(--vp-c-text-mute, #888);
  margin-bottom: 8px;
}
.hot-desc {
  font-size: 14px;
  color: var(--vp-c-text, #444);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: var(--hot-lines, 3);
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hot-more { margin-top: 10px; }
.hot-more a { font-size: 13px; color: var(--vp-c-brand); text-decoration: none; }
.hot-empty { color: var(--vp-c-text-mute, #888); }
</style>
