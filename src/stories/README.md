---
title: 城间小事
icon: map
sidebar: false
---

# 城间小事

<CityStories
  :mapName="'china'"
  :linkBase="'/stories/'"
  :cities='[
    { "name": "上海", "coord": [121.47, 31.23], "count": 2 },
    { "name": "北京", "coord": [116.40, 39.90], "count": 1 },
    { "name": "深圳", "coord": [114.05, 22.55], "count": 2 },
    { "name": "杭州", "coord": [120.16, 30.25], "count": 1 },
    { "name": "成都", "coord": [104.07, 30.67], "count": 2 }
  ]'
  :stories='[
    { "id": "s1", "title": "魔都的清晨",   "city": "上海", "date": "2025-11-01", "cover": "/images/d1.jpg", "excerpt": "清晨的外滩，薄雾渐散。", "link": "/stories/shanghai/2025-11-01-morning.html" },
    { "id": "s6", "title": "书店里的雨",   "city": "上海", "date": "2025-11-06", "cover": "/images/d1.jpg", "excerpt": "雨声做 BGM 的午后。", "link": "/stories/shanghai/2025-11-06-book-rain.html" },
    { "id": "s2", "title": "胡同里的猫",   "city": "北京", "date": "2025-11-02", "cover": "/images/d1.jpg", "excerpt": "老胡同里的慵懒午后。", "link": "/stories/beijing/2025-11-02-hutong-cat.html" },
    { "id": "s3", "title": "码头的风",     "city": "深圳", "date": "2025-11-03", "cover": "/images/d1.jpg", "excerpt": "海风里有咸味与热闹。", "link": "/stories/shenzhen/2025-11-03-dock-wind.html" },
    { "id": "s7", "title": "地铁与霓虹",   "city": "深圳", "date": "2025-11-07", "cover": "/images/d1.jpg", "excerpt": "城市的节奏与光影。", "link": "/stories/shenzhen/2025-11-07-metro-neon.html" },
    { "id": "s4", "title": "西湖边的晚霞", "city": "杭州", "date": "2025-11-04", "cover": "/images/d1.jpg", "excerpt": "层云尽染，秋水共长天。", "link": "/stories/hangzhou/2025-11-04-sunset.html" },
    { "id": "s5", "title": "巷口小面馆",   "city": "成都", "date": "2025-11-05", "cover": "/images/d1.jpg", "excerpt": "热气与椒香，是家的味道。", "link": "/stories/chengdu/2025-11-05-noodle-shop.html" },
    { "id": "s8", "title": "茶馆里的棋局", "city": "成都", "date": "2025-11-08", "cover": "/images/d1.jpg", "excerpt": "落子有声，茶香袅袅。", "link": "/stories/chengdu/2025-11-08-teahouse-chess.html" }
  ]'
/>

