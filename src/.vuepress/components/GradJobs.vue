<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useRoutes, RouteLink } from '@vuepress/client'

type JobItem = {
  year: number
  count: number
  title: string
  path: string
  desc?: string
}

const routes = useRoutes()
const items = ref<JobItem[]>([])
const loading = ref(true)
let chart: any = null

function parseIntSafe(s: any): number | undefined {
  const n = parseInt(String(s), 10)
  return isNaN(n) ? undefined : n
}

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

async function loadEcharts(): Promise<any> {
  if (typeof window === 'undefined') return null
  const w = window as any
  if (w.echarts) return w.echarts
  const cdns = [
    'https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js',
    'https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js',
    'https://unpkg.com/echarts@5/dist/echarts.min.js',
  ]
  for (const src of cdns) {
    try {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('echarts load failed'))
        document.head.appendChild(s)
      })
      if ((window as any).echarts) return (window as any).echarts
    } catch {
      // try next cdn
    }
  }
  return null
}

async function refresh() {
  const record: any = routes.value || {}
  const entries = Object.keys(record)
    .filter((p) => p.startsWith('/graduate/') && p !== '/graduate/')
    .map((path) => ({ path, meta: record[path]?.meta || {}, loader: record[path]?.loader }))

  // load details to get excerpt
  const loaded = await Promise.all(
    entries.map(async ({ path, meta, loader }) => {
      const fm = (meta.frontmatter || {}) as any
      try {
        const mod: any = typeof loader === 'function' ? await loader() : null
        const data = mod?.data || {}
        const excerpt = stripHtml(data.excerpt || '')
        return {
          path,
          title: (meta as any).title || fm.title || path,
          year: parseIntSafe(fm.year) ?? parseIntSafe((fm.title || '').replace(/[^\d]/g, '')) ?? 0,
          count: parseIntSafe(fm.count) ?? 0,
          desc: excerpt || (fm.description as string) || '',
        } as JobItem
      } catch {
        return {
          path,
          title: (meta as any).title || fm.title || path,
          year: parseIntSafe(fm.year) ?? 0,
          count: parseIntSafe(fm.count) ?? 0,
          desc: (fm.description as string) || '',
        } as JobItem
      }
    })
  )

  let valid = loaded.filter((i) => i.year > 0)
  // 如果目录为空，使用内置示例数据
  if (valid.length === 0) {
    valid = [
      { year: 2018, count: 16, title: '2018年', path: '/graduate/2018.html' },
      { year: 2019, count: 22, title: '2019年', path: '/graduate/2019.html' },
      { year: 2020, count: 14, title: '2020年', path: '/graduate/2020.html' },
      { year: 2021, count: 24, title: '2021年', path: '/graduate/2021.html' },
      { year: 2022, count: 21, title: '2022年', path: '/graduate/2022.html' },
      { year: 2023, count: 19, title: '2023年', path: '/graduate/2023.html' },
      { year: 2024, count: 26, title: '2024年', path: '/graduate/2024.html' },
      { year: 2025, count: 28, title: '2025年', path: '/graduate/2025.html' },
      { year: 2026, count: 30, title: '2026年', path: '/graduate/2026.html' },
    ] as any
  }
  valid.sort((a, b) => a.year - b.year)
  items.value = valid
  loading.value = false
  await renderChart()
}

async function renderChart() {
  if (typeof window === 'undefined') return
  const echarts = await loadEcharts()
  if (!echarts) return
  const el = document.getElementById('grad-line') as HTMLDivElement | null
  if (!el) return
  if (chart) chart.dispose()
  chart = echarts.init(el)
  const years = items.value.map((i) => i.year)
  const counts = items.value.map((i) => i.count)
  chart.setOption({
    title: {
      text: '校园招聘统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const p = Array.isArray(params) ? params[0] : params
        return `${p.axisValueLabel}<br/>公司数量：${p.data} 家`
      },
    },
    grid: { left: 56, right: 24, top: 56, bottom: 28, containLabel: true },
    xAxis: { type: 'category', data: years, name: '年份' },
    yAxis: {
      type: 'value',
      name: '公司数量（家）',
      nameGap: 20,
      axisLabel: { formatter: '{value}', margin: 10 },
    },
    series: [
      {
        name: '公司统计数量',
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.1 },
        data: counts,
      },
    ],
  })
}

onMounted(() => {
  refresh()
})

watch(routes, () => refresh(), { deep: true })

const toBase = (p: string) => withBase(p)
const topHeight = computed(() => '33vh')
</script>

<template>
  <div class="grad-wrap">
    <div class="chart" :style="{ height: topHeight }">
      <div id="grad-line" class="chart-canvas"></div>
    </div>

    <div class="list">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="cards">
        <RouteLink v-for="it in items" :key="it.path" class="card" :to="it.path">
          <div class="year">{{ it.title }}</div>
          <div class="meta">公司统计：{{ it.count }}</div>
          <div class="desc" v-if="it.desc">{{ it.desc.slice(0, 60) }}{{ it.desc.length > 60 ? '...' : '' }}</div>
        </RouteLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grad-wrap { display: flex; flex-direction: column; gap: 16px; }
.chart { width: 100%; position: relative; z-index: 0; }
.chart-canvas { width: 100%; height: 100%; min-height: 260px; border-radius: 12px; border: 1px solid var(--vp-c-divider, #eee); }
.list { width: 100%; }
.loading { color: var(--vp-c-text-mute, #888); }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; position: relative; z-index: 1; }
.card { display: block; padding: 12px 14px; border: 1px solid var(--vp-c-divider, #eee); border-radius: 12px; background: var(--vp-c-bg, var(--c-bg)); text-decoration: none; color: inherit; box-shadow: 0 6px 24px rgba(0,0,0,0.06); cursor: pointer; }
.card:hover { border-color: var(--vp-c-brand, #3eaf7c); transform: translateY(-1px); transition: all .2s ease; }
.year { font-weight: 700; margin-bottom: 6px; }
.meta { font-size: 12px; color: var(--vp-c-text-mute, #666); margin-bottom: 6px; }
.desc { font-size: 14px; color: var(--vp-c-text, #444); line-height: 1.5; }
</style>
