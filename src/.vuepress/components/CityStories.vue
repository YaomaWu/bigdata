<template>
  <section class="city-stories">
    <div class="city-stories__map">
      <div ref="mapRef" class="map-canvas" />
    </div>

    <div class="city-stories__grid">
      <article
        v-for="story in visibleStories"
        :key="story.id"
        class="story-card pixel-border"
      >
        <a :href="withBase(story.link)" class="story-link">
          <div class="story-cover" v-if="story.cover">
            <img :src="withBase(story.cover)" :alt="story.title" />
          </div>
          <header class="story-header">
            <h3 class="story-title">{{ story.title }}</h3>
            <p class="story-meta">
              <span class="story-city">{{ story.city }}</span>
              <span class="story-date">{{ story.date }}</span>
            </p>
          </header>
          <p class="story-excerpt" v-if="story.excerpt">{{ story.excerpt }}</p>
        </a>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick, computed } from 'vue'
import { withBase } from 'vuepress/client'

// Lazy import ECharts; map json is imported from npm for offline usage
import chinaGeoJSON from 'china-geojson/src/geojson/china.json'
let echarts

const props = defineProps({
  // Example: [{ name: 'Shanghai', coord: [121.47, 31.23], count: 12 }]
  cities: {
    type: Array,
    default: () => [],
  },
  // Example: [{ id:'s1', title:'故事A', city:'上海', date:'2025-11-09', cover:'/img/a.jpg', excerpt:'...', link:'/stories/a.html' }]
  stories: {
    type: Array,
    default: () => [],
  },
  mapName: {
    type: String,
    default: 'china',
  },
  // Base link for routing on city click
  linkBase: {
    type: String,
    default: '/stories/',
  },
})

const mapRef = ref(null)
let chart = null
let resizeHandler = null
const cityFilter = ref('')

// Map json is loaded at runtime from CDN to avoid bundler loaders

const normalizeCities = (items) => {
  return (items || [])
    .filter((it) => Array.isArray(it.coord) && it.coord.length === 2 && Number.isFinite(it.count))
    .map((it) => ({ name: it.name, value: [it.coord[0], it.coord[1], it.count] }))
}

const renderChart = async () => {
  if (typeof window === 'undefined') return
  if (!mapRef.value) return
  const el = mapRef.value
  if (!echarts) {
    const mod = await import('echarts')
    echarts = mod?.default || mod
  }
  // fetch geojson at runtime depending on mapName
  const mapKey = props.mapName === 'china' ? 'china' : 'world'
  if (mapKey === 'china') {
    echarts.registerMap('china', chinaGeoJSON)
  }

  // init or reuse
  if (!chart) chart = echarts.init(el)

  const data = normalizeCities(props.cities)
  const visualMax = Math.max(1, ...data.map((d) => d.value?.[2] ?? 0))

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (p) => {
        const v = p.value?.[2] ?? 0
        return `${p.name}: ${v}`
      },
    },
    geo: {
      map: props.mapName === 'china' ? 'china' : 'world',
      roam: true,
      center: props.mapName === 'china' ? [104, 35] : undefined,
      zoom: props.mapName === 'china' ? 1.2 : undefined,
      itemStyle: {
        areaColor: 'rgba(120, 120, 120, 0.15)',
        borderColor: 'var(--px-primary-7, #666)',
      },
      emphasis: {
        itemStyle: { areaColor: 'rgba(120, 120, 120, 0.25)' },
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: visualMax,
      inRange: { color: ['#8bd3dd', '#3b82f6', '#1e3a8a'] },
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        rippleEffect: { brushType: 'stroke' },
        symbolSize: (val) => Math.max(8, Math.min(28, (val?.[2] ?? 1) * 3)),
        itemStyle: { color: 'var(--px-primary-6, #3b82f6)' },
        data,
      },
    ],
  })

  // click -> navigate to city page (same page with query)
  chart.off('click')
  chart.on('click', (params) => {
    const name = params?.name
    if (!name) return
    const base = props.linkBase || '/stories/'
    const slugMap = {
      '上海': 'shanghai',
      '北京': 'beijing',
      '深圳': 'shenzhen',
      '杭州': 'hangzhou',
      '成都': 'chengdu',
    }
    const slug = slugMap[name] || encodeURIComponent(name.toLowerCase())
    const next = withBase(`${base}${slug}/`)
    window.location.href = next
  })
}

onMounted(async () => {
  await nextTick()
  await renderChart()
  resizeHandler = () => chart && chart.resize()
  window.addEventListener('resize', resizeHandler)

  // read filter from query
  try {
    const url = new URL(window.location.href)
    const c = url.searchParams.get('city')
    cityFilter.value = c || ''
  } catch {}
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler || (() => {}))
  if (chart) {
    chart.dispose()
    chart = null
  }
})

watch(() => [props.mapName, props.cities], () => renderChart(), { deep: true })

const visibleStories = computed(() => {
  if (!cityFilter.value) return props.stories
  return (props.stories || []).filter((s) => s.city === cityFilter.value)
})
</script>

<style scoped>
.city-stories {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.city-stories__map {
  width: 100%;
  height: 420px;
  border: var(--px-bit, 2px) solid var(--px-primary-7, #333);
  box-shadow:
    calc(var(--px-bit, 2px) * 2) 0 0 0 var(--px-primary-9, #000),
    0 calc(var(--px-bit, 2px) * 2) 0 0 var(--px-primary-9, #000),
    calc(var(--px-bit, 2px) * -2) 0 0 0 var(--px-primary-9, #000),
    0 calc(var(--px-bit, 2px) * -2) 0 0 var(--px-primary-9, #000);
}

.map-canvas {
  width: 100%;
  height: 100%;
}

.city-stories__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1280px) {
  .city-stories__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 960px) {
  .city-stories__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .city-stories__grid {
    grid-template-columns: 1fr;
  }
}

.story-card {
  background: rgba(255, 255, 255, 0.02);
  transition: transform 0.2s ease, filter 0.2s ease;
}
.story-card:hover {
  transform: translateY(-2px);
  filter: contrast(110%);
}

.story-link {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 0.75rem;
}

.story-cover img {
  display: block;
  width: 100%;
  height: 140px;
  object-fit: cover;
  image-rendering: pixelated;
}

.story-header {
  margin-top: 0.5rem;
}
.story-title {
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0 0 0.25rem 0;
}
.story-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  opacity: 0.85;
}
.story-excerpt {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>
